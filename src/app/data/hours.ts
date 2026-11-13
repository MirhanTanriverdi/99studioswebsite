// Opening hours — keep in sync with the Google Business Profile.
// Sunday: open by appointment only (shown as closed on Google so walk-ins
// don't turn up to a closed door).
export const HOURS: Array<{ en: string; de: string; time: { en: string; de: string } }> = [
  { en: 'Mon – Wed', de: 'Mo – Mi', time: { en: '10:00 – 18:00', de: '10:00 – 18:00' } },
  { en: 'Thursday', de: 'Donnerstag', time: { en: '10:30 – 18:00', de: '10:30 – 18:00' } },
  { en: 'Fri – Sat', de: 'Fr – Sa', time: { en: '10:00 – 18:00', de: '10:00 – 18:00' } },
  { en: 'Sunday', de: 'Sonntag', time: { en: 'By appointment only', de: 'Nur mit Termin' } },
];
