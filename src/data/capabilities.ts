export interface HardwareLayerNode {
  label: string;
  role: string;
  highlight?: boolean;
}

export interface SignalPathStep {
  stage: string;
  layer: string;
  filled?: boolean;
}

export const HARDWARE_LAYER_NODES: HardwareLayerNode[] = [
  { label: 'Power & Regulation', role: 'supply · protection' },
  { label: 'Sensors & Signal Conditioning', role: 'analog · digital', highlight: true },
  { label: 'Microcontrollers & Edge SoCs', role: 'compute · I/O' },
  { label: 'Communication Interfaces', role: 'I²C · SPI · UART', highlight: true },
  { label: 'Power Drivers & Actuation', role: 'PWM · switching' },
];

export const SIGNAL_PATH_STEPS: SignalPathStep[] = [
  { stage: 'Sense', layer: 'Hardware', filled: true },
  { stage: 'Process', layer: 'Firmware' },
  { stage: 'Transmit', layer: 'IoT / Protocols' },
  { stage: 'Store', layer: 'Databases' },
  { stage: 'Visualise', layer: 'Web & Mobile' },
  { stage: 'Infer', layer: 'AI Models', filled: true },
];

export const CAPABILITY_STACKS = {
  hardware: [
    'Circuit Design',
    'Power Electronics',
    'Microcontrollers',
    'Sensors',
    'PCB Prototyping',
    'Actuation',
  ],
  firmware: [
    'C / C++',
    'Microcontrollers',
    'Embedded Linux',
    'IoT Protocols',
    'Real-Time Systems',
    'Edge Telemetry',
  ],
  robotics: ['Python', 'Sensor Fusion', 'State Estimation', 'Control Loops'],
  ai: ['Computer Vision', 'LLM Tool Use', 'AI Agents', 'ML Integration'],
  software: [
    'TypeScript',
    'React',
    'Node.js',
    'REST & WebSockets',
    'PostgreSQL',
    'MongoDB',
    'React Native',
    'Flutter',
    'AWS',
  ],
} as const;
