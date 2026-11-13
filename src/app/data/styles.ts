// Tattoo styles offered at the studio. Each one gets a landing page in English
// (/<slug>-tattoo-berlin) and German (/de/<slug>-tattoo-berlin). Which artists
// appear on a page is derived from data/artists.ts — add a style to an artist
// there and they show up here automatically.

export type StyleSlug =
  | 'fineline'
  | 'blackwork'
  | 'ornamental'
  | 'black-and-grey'
  | 'micro-realism'
  | 'botanical'
  | 'illustrative'
  | 'dark-illustrative'
  | 'etching'
  | 'neo-traditional'
  | 'traditional'
  | 'neo-tribal'
  | 'minimalist'
  | 'abstract'
  | 'lettering'
  | 'brushstroke';

export interface StyleData {
  slug: StyleSlug;
  name: { en: string; de: string };
  /** Two short paragraphs per language: what the style is, what to expect. */
  intro: { en: string[]; de: string[] };
}

export const STYLES: StyleData[] = [
  {
    slug: 'fineline',
    name: { en: 'Fineline', de: 'Fineline' },
    intro: {
      en: [
        'Fineline tattoos are made with very thin needle groupings, which gives delicate lines, small lettering and soft detail that bolder styles cannot reach. They suit flowers, script, small symbols and pieces that follow the natural lines of the body.',
        'Because the lines are so fine, placement and size matter: our artists will advise you on where a design will hold its detail best as it heals and ages.',
      ],
      de: [
        'Fineline-Tattoos werden mit sehr feinen Nadelgruppierungen gestochen. So entstehen zarte Linien, kleine Schriften und weiche Details, die mit kräftigeren Stilen nicht möglich sind – ideal für Blumen, Schriftzüge, kleine Symbole und Motive, die den natürlichen Linien des Körpers folgen.',
        'Weil die Linien so fein sind, kommt es auf Platzierung und Größe an: Unsere Artists beraten dich, wo ein Motiv seine Details auch nach dem Abheilen und über die Jahre am besten behält.',
      ],
    },
  },
  {
    slug: 'blackwork',
    name: { en: 'Blackwork', de: 'Blackwork' },
    intro: {
      en: [
        'Blackwork uses solid black ink only – bold lines, filled areas and strong contrast instead of colour. It covers everything from graphic patterns and large ornamental pieces to dark illustrative motifs and cover-ups.',
        'Saturated black reads clearly from a distance and stays crisp over time, which makes blackwork a strong choice for larger pieces such as sleeves, back pieces and chest work.',
      ],
      de: [
        'Blackwork arbeitet ausschließlich mit schwarzer Farbe – kräftige Linien, gefüllte Flächen und starke Kontraste statt Farbe. Das reicht von grafischen Mustern und großen Ornamenten bis zu düsteren illustrativen Motiven und Cover-ups.',
        'Sattes Schwarz wirkt auch aus der Distanz klar und bleibt über die Jahre präzise. Deshalb eignet sich Blackwork besonders für größere Arbeiten wie Sleeves, Rücken- und Brust-Tattoos.',
      ],
    },
  },
  {
    slug: 'ornamental',
    name: { en: 'Ornamental', de: 'Ornamental' },
    intro: {
      en: [
        'Ornamental tattoos are built from patterns: mandalas, lace, filigree, symmetric motifs and decorative linework, often inspired by architecture, textiles and jewellery.',
        'They are designed around the body – along the spine, across the back, on hands or sternum – so the piece frames the anatomy instead of sitting on top of it.',
      ],
      de: [
        'Ornamentale Tattoos bestehen aus Mustern: Mandalas, Spitze, Filigranes, symmetrische Motive und dekoratives Linework – oft inspiriert von Architektur, Textilien und Schmuck.',
        'Sie werden für den Körper entworfen – entlang der Wirbelsäule, über den Rücken, auf Händen oder Brustbein –, sodass das Tattoo die Anatomie betont, statt einfach darauf zu sitzen.',
      ],
    },
  },
  {
    slug: 'black-and-grey',
    name: { en: 'Black & Grey Realism', de: 'Black & Grey Realismus' },
    intro: {
      en: [
        'Black & grey tattoos use black ink diluted into many shades of grey to build soft gradients, depth and lifelike texture – ideal for portraits, religious imagery, statues and realistic objects.',
        'Smooth shading takes time and a good reference. Bring photos or ideas to your consultation and the artist will help you choose a size that leaves enough room for detail.',
      ],
      de: [
        'Bei Black-&-Grey-Tattoos wird schwarze Farbe in viele Grautöne verdünnt. So entstehen weiche Verläufe, Tiefe und realistische Texturen – ideal für Porträts, religiöse Motive, Statuen und realistische Objekte.',
        'Weiches Shading braucht Zeit und eine gute Vorlage. Bring Fotos oder Ideen zur Beratung mit – der Artist hilft dir, eine Größe zu wählen, die genug Raum für Details lässt.',
      ],
    },
  },
  {
    slug: 'micro-realism',
    name: { en: 'Micro Realism', de: 'Micro Realism' },
    intro: {
      en: [
        'Micro realism brings realistic detail to small tattoos: pet portraits, animals, flowers and tiny objects with soft shading, usually only a few centimetres in size.',
        'At this scale every millimetre counts, so the artist will help you pick a size and placement where the detail stays readable over the years.',
      ],
      de: [
        'Micro Realism bringt realistische Details in kleine Tattoos: Haustierporträts, Tiere, Blumen und kleine Objekte mit weichem Shading, meist nur wenige Zentimeter groß.',
        'In dieser Größe zählt jeder Millimeter. Der Artist hilft dir, Größe und Platzierung so zu wählen, dass die Details auch nach Jahren gut erkennbar bleiben.',
      ],
    },
  },
  {
    slug: 'botanical',
    name: { en: 'Botanical', de: 'Botanical' },
    intro: {
      en: [
        'Botanical tattoos focus on flowers, leaves, branches and plants – from a single stem on the wrist to large floral compositions across the back, shoulder or ribs.',
        'Plants flow naturally with the body, so botanical pieces are often drawn freehand or adapted to your placement, in fine line or with soft shading.',
      ],
      de: [
        'Botanical Tattoos zeigen Blumen, Blätter, Zweige und Pflanzen – vom einzelnen Stiel am Handgelenk bis zu großen floralen Kompositionen über Rücken, Schulter oder Rippen.',
        'Pflanzen fließen natürlich mit dem Körper. Deshalb werden botanische Motive oft freihand gezeichnet oder an deine Platzierung angepasst – in Fineline oder mit weichem Shading.',
      ],
    },
  },
  {
    slug: 'illustrative',
    name: { en: 'Illustrative', de: 'Illustrative' },
    intro: {
      en: [
        'Illustrative tattoos look like drawings or prints on skin: clear outlines combined with dotwork, hatching or soft shading, telling a small story or capturing a character.',
        'The style is flexible – from nature motifs and insects to graphic, comic-like pieces – and each artist brings their own drawing hand to it.',
      ],
      de: [
        'Illustrative Tattoos wirken wie Zeichnungen oder Drucke auf der Haut: klare Outlines kombiniert mit Dotwork, Schraffuren oder weichem Shading, die eine kleine Geschichte erzählen oder einen Charakter einfangen.',
        'Der Stil ist vielseitig – von Naturmotiven und Insekten bis zu grafischen, comicartigen Arbeiten – und jeder Artist bringt seinen eigenen Zeichenstil mit.',
      ],
    },
  },
  {
    slug: 'dark-illustrative',
    name: { en: 'Dark Illustrative', de: 'Dark Illustrative' },
    intro: {
      en: [
        'Dark illustrative tattoos draw on horror, fantasy and occult imagery – creatures, skulls, insects and surreal scenes – rendered in heavy black with dramatic contrast.',
        'Pieces are usually medium to large so the detail and shading have room to read clearly.',
      ],
      de: [
        'Dark Illustrative Tattoos greifen Horror-, Fantasy- und okkulte Motive auf – Kreaturen, Schädel, Insekten und surreale Szenen –, umgesetzt in kräftigem Schwarz mit dramatischen Kontrasten.',
        'Die Motive sind meist mittelgroß bis groß, damit Details und Shading klar zur Geltung kommen.',
      ],
    },
  },
  {
    slug: 'etching',
    name: { en: 'Etching', de: 'Etching' },
    intro: {
      en: [
        'Etching-style tattoos imitate old engravings and woodcuts: fine parallel lines and cross-hatching build up shadow instead of smooth grey shading.',
        'The result has a vintage, printed look that works well for creatures, anatomy, objects and dark illustrative themes.',
      ],
      de: [
        'Tattoos im Etching-Stil imitieren alte Kupferstiche und Holzschnitte: Feine parallele Linien und Kreuzschraffuren erzeugen Schatten statt weicher Grauverläufe.',
        'So entsteht ein klassischer, gedruckter Look, der besonders gut zu Kreaturen, Anatomie, Objekten und düsteren Motiven passt.',
      ],
    },
  },
  {
    slug: 'neo-traditional',
    name: { en: 'Neo-Traditional', de: 'Neo-Traditional' },
    intro: {
      en: [
        'Neo-traditional builds on classic traditional tattooing – bold outlines and solid fills – but adds more detail, depth, line-weight variation and a wider colour palette.',
        'Typical motifs are animals, flowers, portraits and symbolic objects like tarot cards, designed to stay bold and readable for years.',
      ],
      de: [
        'Neo-Traditional baut auf dem klassischen Traditional-Stil auf – kräftige Outlines und satte Flächen –, ergänzt ihn aber um mehr Details, Tiefe, unterschiedliche Linienstärken und eine breitere Farbpalette.',
        'Typische Motive sind Tiere, Blumen, Porträts und symbolische Objekte wie Tarotkarten – gestaltet, damit sie über Jahre kräftig und gut lesbar bleiben.',
      ],
    },
  },
  {
    slug: 'traditional',
    name: { en: 'Traditional', de: 'Traditional' },
    intro: {
      en: [
        'Traditional (old school) tattoos use bold black outlines, simple shading and iconic motifs such as eagles, roses, daggers, skulls and swallows.',
        'The style is made to last: strong lines and clear shapes stay readable for decades, and many traditional pieces are picked from flash designs.',
      ],
      de: [
        'Traditional- bzw. Old-School-Tattoos setzen auf kräftige schwarze Outlines, einfaches Shading und ikonische Motive wie Adler, Rosen, Dolche, Totenköpfe und Schwalben.',
        'Der Stil ist für die Ewigkeit gemacht: Starke Linien und klare Formen bleiben über Jahrzehnte lesbar – und viele Traditional-Tattoos werden direkt aus Flash-Designs ausgewählt.',
      ],
    },
  },
  {
    slug: 'neo-tribal',
    name: { en: 'Neo-Tribal', de: 'Neo-Tribal' },
    intro: {
      en: [
        'Neo-tribal tattoos reinterpret tribal shapes with flowing, sharp black forms that wrap around the body – along the spine, hips, ribs, arms and neck.',
        'The designs are usually drawn directly for your body, so the lines follow its curves and movement.',
      ],
      de: [
        'Neo-Tribal-Tattoos interpretieren Tribal-Formen neu: fließende, spitze schwarze Formen, die sich um den Körper legen – entlang der Wirbelsäule, an Hüfte, Rippen, Armen und Hals.',
        'Die Designs werden meist direkt für deinen Körper gezeichnet, damit die Linien seinen Kurven und Bewegungen folgen.',
      ],
    },
  },
  {
    slug: 'minimalist',
    name: { en: 'Minimalist', de: 'Minimalistisch' },
    intro: {
      en: [
        'Minimalist tattoos reduce a motif to its essentials: clean single lines, simple shapes and plenty of negative space.',
        'They are a popular choice for first tattoos and small placements like the wrist, ankle, finger or behind the ear.',
      ],
      de: [
        'Minimalistische Tattoos reduzieren ein Motiv auf das Wesentliche: klare Single-Lines, einfache Formen und viel Negativraum.',
        'Sie sind beliebt als erstes Tattoo und für kleine Stellen wie Handgelenk, Knöchel, Finger oder hinter dem Ohr.',
      ],
    },
  },
  {
    slug: 'abstract',
    name: { en: 'Abstract', de: 'Abstract' },
    intro: {
      en: [
        'Abstract tattoos work with shape, texture and movement rather than a literal picture – surreal compositions, fragmented forms and painterly marks.',
        'They are usually designed individually, so bring references and ideas and develop the piece together with the artist.',
      ],
      de: [
        'Abstrakte Tattoos arbeiten mit Form, Textur und Bewegung statt mit einem eindeutigen Bild – surreale Kompositionen, fragmentierte Formen und malerische Elemente.',
        'Sie werden meist individuell entworfen. Bring Referenzen und Ideen mit und entwickle das Motiv gemeinsam mit dem Artist.',
      ],
    },
  },
  {
    slug: 'lettering',
    name: { en: 'Lettering', de: 'Lettering' },
    intro: {
      en: [
        'Lettering tattoos put words at the centre: names, dates, quotes and single words in script, serif or hand-drawn type.',
        'Font, size and spacing decide how well the text stays readable, so the artist will lay it out to fit your placement and skin.',
      ],
      de: [
        'Bei Lettering-Tattoos stehen Worte im Mittelpunkt: Namen, Daten, Zitate und einzelne Wörter in Script-, Serifen- oder handgezeichneter Schrift.',
        'Schriftart, Größe und Abstände entscheiden, wie gut der Text lesbar bleibt – deshalb passt der Artist das Layout an deine Platzierung an.',
      ],
    },
  },
  {
    slug: 'brushstroke',
    name: { en: 'Brushstroke', de: 'Brushstroke' },
    intro: {
      en: [
        'Brushstroke tattoos imitate the look of ink or paint applied with a brush: loose, expressive strokes with texture and movement instead of hard outlines.',
        'They are often combined with abstract or neo-tribal shapes and drawn to flow with the body.',
      ],
      de: [
        'Brushstroke-Tattoos imitieren den Look von Tusche oder Farbe, die mit dem Pinsel aufgetragen wurde: lockere, ausdrucksstarke Striche mit Textur und Bewegung statt harter Outlines.',
        'Sie werden oft mit abstrakten oder Neo-Tribal-Formen kombiniert und so gezeichnet, dass sie mit dem Körper fließen.',
      ],
    },
  },
];

export const styleBySlug = (slug: string) => STYLES.find((s) => s.slug === slug);
