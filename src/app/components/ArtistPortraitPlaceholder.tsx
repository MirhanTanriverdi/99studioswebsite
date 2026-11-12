type PlaceholderVariant = 'card' | 'tile' | 'circle';

interface ArtistPortraitPlaceholderProps {
  name: string;
  /** card = 3:4 artist card, tile = square gallery cell, circle = round avatar. */
  variant?: PlaceholderVariant;
  /** Caption under the divider. */
  label?: string;
}

const WATERMARK: Record<PlaceholderVariant, string> = {
  card: 'text-[16rem] sm:text-[20rem]',
  tile: 'text-[8rem] sm:text-[10rem]',
  circle: 'text-[9rem]',
};

const CAPTION: Record<PlaceholderVariant, string> = {
  card: 'text-xs sm:text-sm',
  tile: 'text-[10px] sm:text-xs',
  circle: 'text-[11px]',
};

/**
 * Stands in for artist imagery that hasn't been shot yet. Built from the
 * studio's own motifs — the gold rule/diamond divider used in section headers,
 * Bebas Neue, and the studio black — rather than a generic grey placeholder,
 * so an incomplete roster still looks deliberate.
 */
export function ArtistPortraitPlaceholder({
  name,
  variant = 'card',
  label = 'Portrait Coming Soon',
}: ArtistPortraitPlaceholderProps) {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div
      role="img"
      aria-label={`${label} — ${name}`}
      className="relative w-full h-full bg-[#151515] overflow-hidden flex items-center justify-center"
    >
      {/* Faint initial watermark */}
      <span
        aria-hidden="true"
        className={`absolute font-[Bebas_Neue] text-white/[0.04] leading-none select-none ${WATERMARK[variant]}`}
      >
        {initial}
      </span>

      {/* Soft gold pool, echoing the warm lighting in the studio photos */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(255,157,86,0.07),transparent_70%)]"
      />

      {/* Inset rule — skipped on the circular variant, where a square border
          inside a round frame reads as a mistake. */}
      {variant !== 'circle' && (
        <div aria-hidden="true" className="absolute inset-3 border border-gold/10" />
      )}

      <div className="relative flex flex-col items-center gap-3 px-4 text-center">
        <div className="flex items-center gap-3">
          <div className="h-px w-6 sm:w-8 bg-gold/40" />
          <div className="w-2 h-2 rotate-45 border border-gold/60" />
          <div className="h-px w-6 sm:w-8 bg-gold/40" />
        </div>
        <p
          className={`font-[Bebas_Neue] text-gold/80 tracking-[0.25em] uppercase ${CAPTION[variant]}`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
