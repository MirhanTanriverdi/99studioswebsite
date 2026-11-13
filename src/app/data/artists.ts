// Single source of truth for the artist roster. The home page cards, the
// artist pages and the style pages all read from here.
import type { StyleSlug } from './styles';

export interface ArtistStyle {
  /** Text shown on cards/pages, e.g. "Black & Grey Realism". */
  label: string;
  /** Style page it links to. */
  slug: StyleSlug;
}

export interface ArtistData {
  /** Kept stable: old in-app links and the gallery dropdown use these ids. */
  id: number;
  /** URL segment: /artists/<slug>. */
  slug: string;
  name: string;
  styles: ArtistStyle[];
  bio: { en: string; de: string };
  instagram: string;
  /** Portrait for the home page card (smaller file). */
  image: string;
  /** Portrait for the artist page header. */
  photo: string;
  isGuest?: boolean;
}

export const ARTISTS: ArtistData[] = [
  {
    id: 1,
    slug: 'mike',
    name: 'MIKE',
    styles: [
      { label: 'Fineline', slug: 'fineline' },
      { label: 'Ornamental', slug: 'ornamental' },
      { label: 'Black & Grey', slug: 'black-and-grey' },
    ],
    bio: {
      en: 'Flowing fine-line and ornamental pieces that follow the body, from delicate hip and spine work to detailed black & grey symbolism.',
      de: 'Fließende Fineline- und Ornamental-Tattoos, die dem Körper folgen – von zarten Hüft- und Wirbelsäulen-Motiven bis zu detaillierter Black-&-Grey-Symbolik.',
    },
    instagram: '@mikeluxentattoo',
    image: 'https://i.imgur.com/HPYSKTm.jpeg',
    photo: 'https://i.imgur.com/HPYSKTm.jpeg',
  },
  {
    id: 7,
    slug: 'jelena',
    name: 'JELENA',
    styles: [
      { label: 'Black & Grey Realism', slug: 'black-and-grey' },
      { label: 'Fineline', slug: 'fineline' },
      { label: 'Lettering', slug: 'lettering' },
    ],
    bio: {
      en: 'Soft black & grey realism with fine-line detail, from portraits and religious imagery to classic motifs paired with clean lettering.',
      de: 'Weicher Black-&-Grey-Realismus mit Fineline-Details – von Porträts und religiösen Motiven bis zu Klassikern mit klarem Lettering.',
    },
    instagram: '@vais____ink',
    image: 'https://i.imgur.com/65vqbxU.jpeg',
    photo: 'https://i.imgur.com/65vqbxU.jpeg',
  },
  {
    id: 8,
    slug: 'osvi',
    name: 'OSVI',
    styles: [
      { label: 'Fineline', slug: 'fineline' },
      { label: 'Botanical', slug: 'botanical' },
      { label: 'Illustrative', slug: 'illustrative' },
    ],
    bio: {
      en: 'Airy botanical pieces with soft shading that flow along the back and arms, alongside illustrative work with a graphic edge.',
      de: 'Leichte botanische Motive mit weichem Shading, die sich über Rücken und Arme ziehen, dazu illustrative Arbeiten mit grafischer Note.',
    },
    instagram: '@osvi.ink',
    image: '/artists/osvi-card.webp',
    photo: '/artists/osvi.webp',
  },
  {
    id: 20,
    slug: 'arturo',
    name: 'ARTURO',
    styles: [
      { label: 'Blackwork', slug: 'blackwork' },
      { label: 'Ornamental', slug: 'ornamental' },
      { label: 'Neo-Tribal', slug: 'neo-tribal' },
    ],
    bio: {
      en: 'Bold blackwork and ornamental patterns made for large areas, from mandala sleeves to sweeping neo-tribal body pieces.',
      de: 'Kräftiges Blackwork und ornamentale Muster für große Flächen – von Mandala-Sleeves bis zu großzügigen Neo-Tribal-Körperstücken.',
    },
    instagram: '@arturoalbuerne.ttt',
    image: '/artists/arturo-card.webp',
    photo: '/artists/arturo.webp',
    isGuest: true,
  },
  {
    id: 9,
    slug: 'javiera',
    name: 'JAVIERA',
    styles: [
      { label: 'Fineline', slug: 'fineline' },
      { label: 'Micro Realism', slug: 'micro-realism' },
      { label: 'Minimalist', slug: 'minimalist' },
    ],
    bio: {
      en: 'Small, delicate tattoos, from soft micro-realistic animals to minimalist flowers and playful single-line motifs.',
      de: 'Kleine, filigrane Tattoos – von weichen mikrorealistischen Tieren bis zu minimalistischen Blumen und verspielten Single-Line-Motiven.',
    },
    instagram: '@nomeolvides.ttt',
    image: '/artists/javiera-card.webp',
    photo: '/artists/javiera.webp',
  },
  {
    id: 22,
    slug: 'ricardo',
    name: 'RICARDO',
    styles: [
      { label: 'Blackwork', slug: 'blackwork' },
      { label: 'Dark Illustrative', slug: 'dark-illustrative' },
      { label: 'Etching', slug: 'etching' },
    ],
    bio: {
      en: 'Heavy blackwork and dark illustrative pieces built on creatures, skulls and sci-fi horror, with etching-style shading.',
      de: 'Schweres Blackwork und düstere illustrative Motive rund um Kreaturen, Schädel und Sci-Fi-Horror, mit Shading im Radierstil.',
    },
    instagram: '@rick.dark.ink',
    image: '/artists/ricardo-card.webp',
    photo: '/artists/ricardo.webp',
    isGuest: true,
  },
  {
    id: 24,
    slug: 'artur',
    name: 'ARTUR',
    styles: [
      { label: 'Traditional', slug: 'traditional' },
      { label: 'Blackwork', slug: 'blackwork' },
      { label: 'Minimalist', slug: 'minimalist' },
    ],
    bio: {
      en: 'Black traditional flash with bold lines, alongside clean minimalist linework. Guest from Warsaw.',
      de: 'Black-Traditional-Flash mit kräftigen Linien, dazu klares, minimalistisches Linework. Gast aus Warschau.',
    },
    instagram: '@arturtattoo.47',
    image: '/artists/artur-card.webp',
    photo: '/artists/artur.webp',
    isGuest: true,
  },
  {
    id: 25,
    slug: 'kim',
    name: 'KIM',
    styles: [
      { label: 'Neo-Traditional', slug: 'neo-traditional' },
      { label: 'Illustrative', slug: 'illustrative' },
      { label: 'Ornamental', slug: 'ornamental' },
    ],
    bio: {
      en: 'Bold neo-traditional colour pieces, illustrative dotwork creatures and ornamental linework, from tarot-inspired cards to sea life.',
      de: 'Kräftige Neo-Traditional-Tattoos in Farbe, illustrative Dotwork-Kreaturen und ornamentales Linework – von Tarot-Karten bis zu Meeresmotiven.',
    },
    instagram: '@gemini.tattoo.030',
    image: '/artists/kim-card.webp',
    photo: '/artists/kim.webp',
    isGuest: true,
  },
  {
    id: 27,
    slug: 'barbara',
    name: 'BARBARA',
    styles: [
      { label: 'Ornamental', slug: 'ornamental' },
      { label: 'Blackwork', slug: 'blackwork' },
      { label: 'Traditional', slug: 'traditional' },
    ],
    bio: {
      en: 'Ornamental linework and bold blackwork, from full-back mandala pieces to graphic hand designs and traditional flash.',
      de: 'Ornamentales Linework und kräftiges Blackwork – von Mandala-Rückenstücken bis zu grafischen Hand-Designs und Traditional-Flash.',
    },
    instagram: '@elefanteconmolotov',
    image: '/artists/barbara-card.webp',
    photo: '/artists/barbara.webp',
  },
  {
    id: 28,
    slug: 'daryna',
    name: 'DARYNA',
    styles: [
      { label: 'Fineline', slug: 'fineline' },
      { label: 'Botanical', slug: 'botanical' },
      { label: 'Abstract', slug: 'abstract' },
    ],
    bio: {
      en: 'Fine-line florals with soft shading, mixed with abstract and surreal designs and embroidery-inspired ornamental pieces.',
      de: 'Fineline-Blumen mit weichem Shading, kombiniert mit abstrakten und surrealen Designs sowie von Stickerei inspirierten Ornamenten.',
    },
    instagram: '@silxxskin',
    image: '/artists/daryna-card.webp',
    photo: '/artists/daryna.webp',
  },
  {
    id: 29,
    slug: 'duda',
    name: 'DUDA',
    styles: [
      { label: 'Fineline', slug: 'fineline' },
      { label: 'Micro Realism', slug: 'micro-realism' },
      { label: 'Botanical', slug: 'botanical' },
    ],
    bio: {
      en: 'Fine-line botanicals and micro-realistic pet portraits and animals, with delicate detail at small and medium scale.',
      de: 'Fineline-Botanik sowie mikrorealistische Haustierporträts und Tiere, mit feinen Details in kleiner und mittlerer Größe.',
    },
    instagram: '@dudaramoos',
    image: '/artists/duda-card.webp',
    photo: '/artists/duda.webp',
  },
  {
    id: 30,
    slug: 'james',
    name: 'JAMES',
    styles: [
      { label: 'Neo-Tribal', slug: 'neo-tribal' },
      { label: 'Abstract', slug: 'abstract' },
      { label: 'Brushstroke', slug: 'brushstroke' },
    ],
    bio: {
      en: 'Free-flowing neo-tribal and brushstroke-style shapes drawn to follow the curves of the body.',
      de: 'Frei fließende Neo-Tribal- und Brushstroke-Formen, die den Linien des Körpers folgen.',
    },
    instagram: '@notasong.ink',
    image: '/artists/james-card.webp',
    photo: '/artists/james.webp',
  },
  {
    id: 31,
    slug: 'nina',
    name: 'NINA',
    styles: [
      { label: 'Fineline', slug: 'fineline' },
      { label: 'Botanical', slug: 'botanical' },
      { label: 'Illustrative', slug: 'illustrative' },
    ],
    bio: {
      en: 'Fine-line botanicals, insects and nature motifs with soft stipple shading.',
      de: 'Fineline-Botanik, Insekten und Naturmotive mit weichem Dotwork-Shading.',
    },
    instagram: '@nk.ninatattoo',
    image: '/artists/nina-card.webp',
    photo: '/artists/nina.webp',
  },
];

export const artistBySlug = (slug: string) => ARTISTS.find((a) => a.slug === slug);
export const artistById = (id: number) => ARTISTS.find((a) => a.id === id);
export const styleLine = (a: ArtistData) => a.styles.map((s) => s.label).join(' / ');
export const instagramUrl = (handle: string) => `https://www.instagram.com/${handle.replace(/^@/, '')}/`;
