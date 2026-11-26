export type TimelineKind = 'EDU' | 'WORK';

export interface TimelineEntry {
  id: string;
  kind: TimelineKind;
  dateRange: string;
  title: string;
  organization: string;
  badge?: string;
  highlight?: boolean;
}

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: 'freelance-eng',
    kind: 'WORK',
    dateRange: 'Present',
    title: 'Freelance Software, IoT & Hardware Engineer',
    organization: 'Independent · Remote & Sri Lanka',
    badge: 'Active',
    highlight: true,
  },
  {
    id: 'sltc-btech',
    kind: 'EDU',
    dateRange: 'Feb 2025 — Jan 2029',
    title: 'Bachelor of Technology - BTech, Electronics',
    organization: 'SLTC',
    badge: 'In progress',
    highlight: true,
  },
  {
    id: 'orel-assoc',
    kind: 'WORK',
    dateRange: 'Dec 2023 — Jun 2024',
    title: 'Associate Software & IoT Developer',
    organization: 'OREL Corporation · Colombo District, Western Province, Sri Lanka',
    badge: '7 mos',
  },
  {
    id: 'orel-intern',
    kind: 'WORK',
    dateRange: 'May 2023 — Nov 2023',
    title: 'Intern - IoT Product Development',
    organization: 'OREL Corporation · Trace City, Maradana',
    badge: '7 mos',
  },
  {
    id: 'nibm-hnd',
    kind: 'EDU',
    dateRange: '2022 — 2023',
    title: 'Higher National Diploma, Software Engineering',
    organization: 'National Institute of Business Management (NIBM - Sri Lanka)',
  },
  {
    id: 'nibm-dip',
    kind: 'EDU',
    dateRange: '2021 — 2022',
    title: 'Diploma, Software Engineering',
    organization: 'National Institute of Business Management (NIBM - Sri Lanka)',
  },
];
