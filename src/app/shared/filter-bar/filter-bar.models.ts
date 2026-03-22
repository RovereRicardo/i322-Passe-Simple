export interface DateRange {
  from: number;
  to: number;
}

export interface FilterState {
  dateRange: DateRange | null;
  regimes: string[];
  cantons: string[];
}

export const DATE_RANGES: { label: string; value: DateRange }[] = [
  { label: 'Avant 1800', value: { from: 0, to: 1799 } },
  { label: '1800–1824', value: { from: 1800, to: 1824 } },
  { label: '1825–1849', value: { from: 1825, to: 1849 } },
  { label: '1850–1874', value: { from: 1850, to: 1874 } },
  { label: '1875–1899', value: { from: 1875, to: 1899 } },
  { label: '1900–1924', value: { from: 1900, to: 1924 } },
  { label: '1925–1949', value: { from: 1925, to: 1949 } },
  { label: '1950 et après', value: { from: 1950, to: 9999 } },
];

export const REGIMES = ['Végétarien', 'Sans gluten', 'Vegan'];

export const SWISS_CANTONS = [
  'Argovie', 'Berne', 'Fribourg', 'Genève', 'Glaris', 'Grisons',
  'Jura', 'Lucerne', 'Neuchâtel', 'Nidwald', 'Obwald', 'Saint-Gall',
  'Schaffhouse', 'Schwytz', 'Soleure', 'Tessin', 'Thurgovie',
  'Uri', 'Valais', 'Vaud', 'Zoug', 'Zurich',
];
