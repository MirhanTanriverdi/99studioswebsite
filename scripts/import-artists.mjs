/**
 * Imports artist portraits into public/artists/ as WebP.
 *
 *   node scripts/import-artists.mjs [sourceDir]
 *
 * Expects a folder of per-artist subfolders, each holding a file whose name
 * contains "artist" and "photo" (the convention used in the studio's Drive):
 *
 *   Team/
 *     Osvi/Artist-photo.jpg
 *     Nina/Artist-photo.JPG
 *
 * Mirrors scripts/import-photos.mjs:
 * - applies EXIF orientation before stripping metadata (phone portraits are
 *   often flagged orientation=6; sharp drops the flag, publishing them sideways)
 * - converts to greyscale so the grid reads as one set
 * - strips all metadata, including GPS
 * - lowercase slugs, since the deploy host is case-sensitive
 *
 * Aspect ratio is preserved rather than cropped to 3:4 — the card crops with
 * object-cover anchored near the top, and a blind centre-crop here would cut
 * heads off. The report flags any landscape source so it can be re-shot.
 */
import sharp from 'sharp';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = process.argv[2] || path.join(process.env.HOME, 'Downloads', 'Team');
const OUT = 'public/artists';
const WIDTH = 1000;

const slug = s => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const run = async () => {
  await mkdir(OUT, { recursive: true });
  const entries = await readdir(SRC, { withFileTypes: true });
  const manifest = [];
  const skipped = [];

  for (const dir of entries) {
    if (!dir.isDirectory()) continue;
    if (/archieve|archive/i.test(dir.name)) { skipped.push(`${dir.name} (archive)`); continue; }

    const files = await readdir(path.join(SRC, dir.name));
    const hit = files.find(f => /artist[-_ ]?photo/i.test(f) && !f.startsWith('._'));
    if (!hit) { skipped.push(`${dir.name} (no Artist-photo)`); continue; }

    const src = path.join(SRC, dir.name, hit);
    const meta = await sharp(src).metadata();
    const name = slug(dir.name);

    const info = await sharp(src)
      .rotate()                                   // apply EXIF orientation
      .grayscale()                                // the roster is shot in B&W;
                                                  // a colour portrait breaks the
                                                  // grid. No-op if already grey.
      .resize({ width: WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(OUT, `${name}.webp`));

    const landscape = info.width > info.height;
    manifest.push({ name: dir.name.trim(), slug: name, width: info.width, height: info.height });
    console.log(
      `${name.padEnd(12)} orient=${meta.orientation ?? 1}  ` +
      `${meta.width}x${meta.height} -> ${info.width}x${info.height}  ` +
      `${(info.size / 1024).toFixed(0)}KB${landscape ? '   <-- LANDSCAPE, card will crop sides' : ''}`
    );
  }

  await writeFile('src/app/data/artistPhotos.json', JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\n${manifest.length} portraits -> ${OUT}/`);
  if (skipped.length) console.log(`skipped: ${skipped.join(', ')}`);
};

run().catch(e => { console.error(e); process.exit(1); });
