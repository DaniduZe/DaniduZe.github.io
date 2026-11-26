export interface ContactChannel {
  id: 'email' | 'phone' | 'whatsapp' | 'github' | 'linkedin';
  label: string;
  value: string;
  href: string;
  actionLabel: string;
  external?: boolean;
  copyable?: boolean;
}

export interface ProofStat {
  value: string;
  label: string;
  mobileLabel: string;
}

export const PROFILE = {
  name: 'Danidu Sennath',
  fullName: 'Danidu Sennath Kawudupitiya',
  handle: 'danidu.sennath',
  roleSuffix: 'engineer',
  kicker: 'Software & Electronics Engineer — Sri Lanka',
  availability: 'Available for freelance',
  headlineLines: [
    { text: 'Hardware', arrow: true },
    { text: 'Cloud', arrow: true },
    { text: 'AI', dot: true },
  ],
  tagline: "I don't just write code; I bring devices to life.",
  summary:
    'I bridge physical hardware and digital applications — embedded systems, electronics, autonomous robotics, full-stack software, and AI-powered products.',
  location: 'Ginigathhena, Central Province, Sri Lanka',
  timezone: 'GMT+5:30',
  collaborationNote:
    'Available for freelance projects across embedded systems, IoT, robotics, AI, and full-stack software.',
  email: 'danidusennath@gmail.com',
  phoneDisplay: '+94 76 435 7415',
  phoneRaw: '+94764357415',
  whatsappUrl: 'https://wa.me/94764357415',
  githubUrl: 'https://github.com/DaniduZe',
  githubHandle: 'github.com/DaniduZe',
  linkedinUrl: 'https://www.linkedin.com/in/danidu-sennath',
  linkedinHandle: 'in/danidu-sennath',
  mediumUrl: 'https://medium.com/@danidusennath',
  resumeUrl: '/Danidu-Sennath-Resume.pdf',
} as const;

export const HERO_STATS: ProofStat[] = [
  { value: '20', label: 'public repositories', mobileLabel: 'repos' },
  { value: '3y 6m', label: 'engineering experience', mobileLabel: 'experience' },
  { value: 'BTech', label: 'Electronics · SLTC', mobileLabel: 'Electronics' },
];

export const MARQUEE_STACK: string[] = [
  'Embedded Systems',
  'IoT Architecture',
  'Robotics & Control',
  'Electronics & Hardware',
  'AI & LLMs',
  'Full-Stack Engineering',
  'TypeScript',
  'Python',
  'C / C++',
  'React',
  'Node.js',
  'FreeRTOS',
  'MQTT',
  'PostgreSQL',
  'MongoDB',
  'React Native',
  'Flutter',
  'AWS',
];

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'email',
    label: 'Email',
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    actionLabel: 'Copy',
    copyable: true,
  },
  {
    id: 'phone',
    label: 'Call',
    value: PROFILE.phoneDisplay,
    href: `tel:${PROFILE.phoneRaw}`,
    actionLabel: 'Call',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: PROFILE.phoneDisplay,
    href: PROFILE.whatsappUrl,
    actionLabel: 'Chat',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: PROFILE.githubHandle,
    href: PROFILE.githubUrl,
    actionLabel: 'Open',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: PROFILE.linkedinHandle,
    href: PROFILE.linkedinUrl,
    actionLabel: 'Open',
    external: true,
  },
];
