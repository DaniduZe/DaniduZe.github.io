export type ProjectCategory =
  | 'All'
  | 'IoT & Embedded'
  | 'Robotics & Electronics'
  | 'AI'
  | 'Full-Stack';

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ArchitectureStage {
  stage: string;
  nodes: string[];
}

export interface CodeLine {
  tokens: Array<{ text: string; tone?: 'keyword' | 'string' | 'fn' | 'comment' | 'plain' }>;
}

export interface ProjectItem {
  id: string;
  code: string;
  title: string;
  tagLine: string;
  categories: Exclude<ProjectCategory, 'All'>[];
  year: string;
  featured?: boolean;
  summary: string;
  overview: string;
  image?: string;
  drawerImage?: string;
  drawerImageCaption?: string;
  codePreview?: CodeLine[];
  metrics: ProjectMetric[];
  highlights: string[];
  architecture: ArchitectureStage[];
  stack: string[];
  githubUrl: string;
  secondaryLink?: {
    label: string;
    url: string;
  };
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'IoT & Embedded',
  'Robotics & Electronics',
  'AI',
  'Full-Stack',
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'smart-robot',
    code: 'P/01',
    title: 'Autonomous Person-Following Smart Robot',
    tagLine: 'Robotics · AI',
    categories: ['Robotics & Electronics', 'AI'],
    year: '2026',
    featured: true,
    summary:
      'Raspberry Pi robot that fuses MediaPipe pose heading with 360° YDLIDAR depth, tracks its user with a 2D Kalman filter at 10 Hz and holds a 1.0 m follow distance with 360° obstacle avoidance.',
    overview:
      'An autonomous mobile robotic platform built on Raspberry Pi 4, MediaPipe Pose Estimation, and a 360° 2D YDLIDAR laser scanner. Sensor fusion isolates the human target from background clutter, tracks position and velocity through temporary occlusions, and drives smooth DC motor motion with active stiction deadband compensation.',
    image: '/projects/cart.jpg',
    drawerImage: '/projects/cart.jpg',
    drawerImageCaption: 'Raspberry Pi 4, YDLIDAR 360° stack & L298N drive train',
    metrics: [
      { value: '10 Hz', label: 'Kalman tracking' },
      { value: '1.0 m', label: 'follow distance' },
      { value: '360°', label: 'obstacle guard' },
    ],
    highlights: [
      'Fuses USB 1080p MediaPipe pose heading angles over shared-memory IPC with 1D DBSCAN-clustered 360° YDLIDAR scans.',
      '2D Kalman filter tracks (X, Y, Vx, Vy) at 10 Hz with multi-stage fallback coasting when the user turns or is briefly occluded.',
      '360° sector obstacle avoidance combines front soft braking (0.60 m–0.35 m), side wall repulsion, rear collision guard, and user-leg target exclusion.',
      'Custom logical_to_physical PWM mapping compensates for DC motor static friction (0.16 deadband) alongside slew-rate acceleration ramps.',
    ],
    architecture: [
      {
        stage: 'Vision',
        nodes: ['USB 1080p Camera', 'MediaPipe Pose', 'Shared-Memory IPC'],
      },
      {
        stage: 'LiDAR',
        nodes: ['YDLIDAR 360°', 'Range & Chassis Filter', '1D DBSCAN Cluster'],
      },
      {
        stage: 'Tracking',
        nodes: ['Sensor Fusion', '2D Kalman Filter', '360° Obstacle Sectors'],
      },
      {
        stage: 'Actuation',
        nodes: ['Proportional Drive/Turn', 'Deadband & Slew Ramp', 'L298N → DC Motors'],
      },
    ],
    stack: [
      'Python',
      'Raspberry Pi 4',
      'YDLIDAR',
      'MediaPipe',
      'Kalman Filter',
      'DBSCAN',
      'L298N',
      'GPIO PWM',
    ],
    githubUrl: 'https://github.com/DaniduZe/Autonomous-person-following-robot',
  },
  {
    id: 'solar-tracker',
    code: 'P/02',
    title: 'IoT Solar Tracker & Telemetry Studio',
    tagLine: 'IoT · Electronics · Full-Stack',
    categories: ['IoT & Embedded', 'Robotics & Electronics', 'Full-Stack'],
    year: '2026',
    summary:
      'Dual-core ESP32 tracker with dual INA219 power telemetry, rain-wash & night-stow modes, streaming via MQTT to Node/Express + MongoDB time-series and a live React dashboard.',
    overview:
      'An autonomous dual-core ESP32-WROOM-32 solar tracking node with dual INA219 high-side I²C current/voltage monitors, Li-ion battery State-of-Charge & Time-to-Empty modeling, automated precipitation staging, and a real-time full-stack WebSocket telemetry studio with bi-directional MQTT control.',
    image: '/projects/solar.jpg',
    drawerImage: '/projects/solar-dash.jpg',
    drawerImageCaption: 'Physical solar prototype streaming to the live React Telemetry Studio',
    metrics: [
      { value: '2× INA219', label: 'I²C telemetry' },
      { value: 'SoC · TTE', label: 'battery model' },
      { value: 'Wh', label: 'trapezoidal yield' },
    ],
    highlights: [
      'Dual INA219 sensors measure raw Solar Input (Vin, Iin, Pin) and Load/Battery Output (Vout, Iout, Pout) across a TP4056 charger, 3600 mAh dual-18650 bank, and MT3608 boost rail.',
      'Autonomous multi-mode firmware: astronomical hour-to-angle sun tracking (0°–180°), HW-028 rain-wash staging (60°), and flat night stowage (90°).',
      'Node.js/Express backend ingests HiveMQ MQTT telemetry into MongoDB Time-Series collections and computes daily Wh harvest via trapezoidal numerical integration.',
      'React 18 + Recharts dashboard streams live WebSocket updates and dispatches remote MQTT commands (manual servo override, CLEAN, SLEEP, REBOOT).',
    ],
    architecture: [
      {
        stage: 'Hardware',
        nodes: [
          '6V PV + INA219 #1',
          'TP4056 · 2× 18650',
          'MT3608 + INA219 #2',
          'ESP32 dual-core',
          'Rain sensor · Servo',
        ],
      },
      {
        stage: 'Broker',
        nodes: ['HiveMQ MQTT', 'SOLAR_V1 ↑', 'SOLAR_CONTROL ↓'],
      },
      {
        stage: 'Backend',
        nodes: [
          'Node.js / Express',
          'MongoDB time-series',
          'WebSocket stream',
          'REST /api/control',
        ],
      },
      {
        stage: 'Frontend',
        nodes: ['React 18 + Vite', 'Recharts analytics', 'MQTT terminal', 'Servo slider'],
      },
    ],
    stack: [
      'ESP32',
      'C++',
      'INA219',
      'MQTT',
      'Node.js',
      'MongoDB',
      'WebSockets',
      'React',
      'TP4056',
      'MT3608',
      'Recharts',
      'Tailwind',
    ],
    githubUrl: 'https://github.com/DaniduZe/IoT-Solar-Tracking-System',
  },
  {
    id: 'water-tank',
    code: 'P/03',
    title: 'Smart Water Tank Controller',
    tagLine: 'IoT & Embedded',
    categories: ['IoT & Embedded', 'Full-Stack'],
    year: '2026',
    summary:
      'FreeRTOS dual-core ESP32: Core 1 runs ultrasonic sensing with hysteresis and 5-reading debounce, Core 0 handles Wi-Fi/MQTT. Serverless React dashboard over HiveMQ WebSockets.',
    overview:
      'Automated reservoir level sensing and refill controller built on ESP32 FreeRTOS dual-core execution with a waterproof JSN-SR04M-2 ultrasonic transducer, active-LOW 5V relay pump actuation, and a direct browser-to-HiveMQ WebSocket dashboard.',
    image: '/projects/tank.jpg',
    drawerImage: '/projects/tank.jpg',
    drawerImageCaption: 'ESP32 hardware setup with ultrasonic probe, relay pump & live dashboard',
    metrics: [
      { value: '2 Cores', label: 'FreeRTOS + mutex' },
      { value: '5-read', label: 'ripple debounce' },
      { value: 'WSS', label: 'serverless MQTT' },
    ],
    highlights: [
      'Core 1 (Logic) executes ultrasonic pulse timing, noise filtering, auto startup fill, and hysteresis control (ON ≥ 10 cm, OFF ≤ 4 cm) with 5-reading confirmation.',
      'Core 0 (Transport) maintains Wi-Fi auto-reconnection and non-blocking HiveMQ MQTT telemetry synchronized via xSemaphoreCreateMutex.',
      'React + Vite dashboard connects directly over HiveMQ MQTT WebSockets with animated SVG wave levels, Recharts threshold history, and live event alerts.',
    ],
    architecture: [
      {
        stage: 'Core 1 · Logic',
        nodes: ['JSN-SR04M-2 Ping', '5-Read Debounce', '5V Relay Pump'],
      },
      {
        stage: 'Sync',
        nodes: ['FreeRTOS Mutex', 'Shared State Struct'],
      },
      {
        stage: 'Core 0 · Net',
        nodes: ['Wi-Fi Auto-Reconnect', 'PubSubClient MQTT', 'HiveMQ Broker'],
      },
      {
        stage: 'Dashboard',
        nodes: ['MQTT over WSS', 'Animated SVG Tank', 'Recharts + Alerts'],
      },
    ],
    stack: ['ESP32', 'FreeRTOS', 'JSN-SR04M-2', 'HiveMQ', 'React', 'Recharts', 'Tailwind'],
    githubUrl: 'https://github.com/DaniduZe/Smart-Water-Tank',
  },
  {
    id: 'sallimate',
    code: 'P/04',
    title: 'SalliMate — AI Finance Companion',
    tagLine: 'AI · Full-Stack',
    categories: ['AI', 'Full-Stack'],
    year: '2026',
    summary:
      'Expo budgeting app for Sri Lankan students. An LLM agent with function calling logs and queries expenses in plain language against a Supabase Postgres ledger secured by RLS.',
    overview:
      'A privacy-first personal finance & envelope-budgeting mobile app tailored for Sri Lankan university students (LKR / රු.). Combines a Safe-to-Spend daily calculator, gamified budget envelopes, and a conversational AI assistant using strict LLM Function Calling.',
    image: '/projects/salli.jpg',
    drawerImage: '/projects/salli.jpg',
    drawerImageCaption: 'SalliMate Expo mobile dashboard with Safe-to-Spend & LKR ledger',
    metrics: [
      { value: 'Tool Use', label: 'LLM function calling' },
      { value: 'Postgres RLS', label: 'row-level security' },
      { value: 'LKR', label: 'localized UX' },
    ],
    highlights: [
      'Natural-language transaction logging ("I just paid 250 LKR for a bus ticket to Kandy") and multi-month spending queries executed through structured LLM tool calls.',
      'Supabase Edge Functions (Deno/TypeScript) mediate between the mobile app, Gemini/OpenAI/DeepSeek models, and the PostgreSQL ledger.',
      'Direct CRUD operations secured by Supabase Auth (JWT) and PostgreSQL Row-Level Security with zero bank-linking required.',
    ],
    architecture: [
      {
        stage: 'Mobile App',
        nodes: ['React Native + Expo', 'Expo Router Tabs', 'NativeWind UI'],
      },
      {
        stage: 'Auth & CRUD',
        nodes: ['Supabase Auth JWT', 'Direct Ledger CRUD', 'Budget Envelopes'],
      },
      {
        stage: 'AI Edge Layer',
        nodes: ['Deno Edge Function', 'LLM Tool Calling', 'Strict JSON Schemas'],
      },
      {
        stage: 'Database',
        nodes: ['Supabase Postgres', 'Row-Level Security', 'SQL Migrations'],
      },
    ],
    stack: [
      'TypeScript',
      'React Native',
      'Expo',
      'Supabase',
      'Edge Functions',
      'LLM Tool Use',
      'PostgreSQL',
    ],
    githubUrl: 'https://github.com/DaniduZe/SalliMate',
  },
  {
    id: 'smarthome-bulb',
    code: 'P/05',
    title: 'SmartHome Bulb Controller',
    tagLine: 'IoT · Electronics',
    categories: ['IoT & Embedded', 'Robotics & Electronics'],
    year: '2023',
    summary:
      'NodeMCU + relay switching a 230 V AC bulb from a Flutter app via Firebase, with live DHT11 temperature and humidity readings.',
    overview:
      'An integrated smart-lighting and environmental monitoring build linking a NodeMCU (ESP8266) circuit to a cross-platform Flutter app through Firebase Realtime Database for remote 230 V AC bulb switching and live DHT11 climate telemetry.',
    image: '/projects/bulb.jpg',
    drawerImage: '/projects/bulb.jpg',
    drawerImageCaption: 'NodeMCU, 5V-to-230V AC relay switching circuit & DHT11 prototype',
    metrics: [
      { value: '5V → 230V', label: 'relay isolation' },
      { value: 'DHT11', label: 'temp & humidity' },
      { value: 'Flutter', label: 'cross-platform app' },
    ],
    highlights: [
      'Bridges 5V DC NodeMCU GPIO signals to a 230V AC lighting load using a relay module for safe remote actuation.',
      'Streams continuous DHT11 ambient temperature and humidity measurements to Firebase Realtime Database.',
      'Cross-platform Android/iOS Flutter interface lets users toggle lighting and inspect room climate from anywhere.',
    ],
    architecture: [
      {
        stage: 'Hardware',
        nodes: ['NodeMCU ESP8266', 'DHT11 Sensor', '5V → 230V AC Relay'],
      },
      {
        stage: 'Cloud Sync',
        nodes: ['Firebase Realtime DB', 'State & Telemetry Paths'],
      },
      {
        stage: 'Mobile Client',
        nodes: ['Flutter App', 'Bulb Toggle Control', 'Live Climate View'],
      },
    ],
    stack: ['NodeMCU', 'DHT11', 'Relay', 'Firebase', 'Flutter', 'Arduino C++'],
    githubUrl: 'https://github.com/DaniduZe/SmartHome-Bulb-Controller',
  },
  {
    id: 'payhere-rn',
    code: 'P/06',
    title: 'PayHere × React Native',
    tagLine: 'Full-Stack · Mobile',
    categories: ['Full-Stack'],
    year: '2026',
    summary:
      'Reference integration of the PayHere payment gateway in a cross-platform React Native app — published as a step-by-step guide on Medium.',
    overview:
      'A clean, cross-platform TypeScript reference implementation demonstrating Sri Lanka’s PayHere Mobile SDK checkout flow across Android and iOS, paired with a published developer tutorial on Medium.',
    codePreview: [
      {
        tokens: [
          { text: 'import ', tone: 'keyword' },
          { text: 'PayHere ', tone: 'plain' },
          { text: 'from ', tone: 'keyword' },
          { text: "'@payhere/mobilesdk-rn'", tone: 'string' },
          { text: ';', tone: 'plain' },
        ],
      },
      { tokens: [] },
      {
        tokens: [
          { text: 'PayHere.', tone: 'plain' },
          { text: 'startPayment', tone: 'fn' },
          { text: '(paymentObject,', tone: 'plain' },
        ],
      },
      {
        tokens: [
          { text: '  (id) => ', tone: 'plain' },
          { text: 'onSuccess', tone: 'fn' },
          { text: '(id),', tone: 'plain' },
        ],
      },
      {
        tokens: [
          { text: '  (err) => ', tone: 'plain' },
          { text: 'onError', tone: 'fn' },
          { text: '(err),', tone: 'plain' },
        ],
      },
      {
        tokens: [
          { text: '  () => ', tone: 'plain' },
          { text: 'onDismiss', tone: 'fn' },
          { text: '()', tone: 'plain' },
        ],
      },
      { tokens: [{ text: ');', tone: 'plain' }] },
    ],
    metrics: [
      { value: 'iOS · Android', label: 'cross-platform SDK' },
      { value: 'Sandbox', label: 'end-to-end checkout' },
      { value: 'Medium', label: '2025 published guide' },
    ],
    highlights: [
      'Typed React Native integration handling payment initialization, success callbacks, error states, and user dismissal.',
      'Pre-configured sandbox environment for rapid Sri Lankan LKR payment gateway testing.',
      'Accompanied by a comprehensive walkthrough published on Medium (@danidusennath).',
    ],
    architecture: [
      {
        stage: 'App Layer',
        nodes: ['React Native TS', 'Checkout Form', 'Order Payload'],
      },
      {
        stage: 'Native Bridge',
        nodes: ['PayHere Mobile SDK', 'Android Gradle', 'iOS CocoaPods'],
      },
      {
        stage: 'Gateway',
        nodes: ['PayHere Sandbox', 'Payment Callback', 'Status Handler'],
      },
    ],
    stack: ['TypeScript', 'React Native', 'PayHere SDK', 'Android', 'iOS'],
    githubUrl: 'https://github.com/DaniduZe/PayHere-React-Native-',
    secondaryLink: {
      label: 'Read Medium Guide',
      url: 'https://medium.com/@danidusennath/integrate-payhere-into-your-react-native-app-2025-updated-guide-f479aadb8452',
    },
  },
  {
    id: 'autoreach-flyer',
    code: 'P/07',
    title: 'AutoReach — Flyer & Outreach Automation',
    tagLine: 'Full-Stack · Automation',
    categories: ['Full-Stack'],
    year: '2026',
    summary:
      'Scheduler that renders personalised birthday & anniversary flyers with Jimp / HTML-to-Image and emails them daily via node-cron + Nodemailer, managed from a React/Vite admin.',
    overview:
      'Full-stack automated outreach and dynamic visual flyer generator. Combines scheduled cron workers in Asia/Colombo time, programmatic image compositing, JWT-protected REST APIs, and a React + Vite management dashboard.',
    codePreview: [
      {
        tokens: [{ text: '// runs daily at 00:00 Asia/Colombo', tone: 'comment' }],
      },
      {
        tokens: [
          { text: 'cron.', tone: 'plain' },
          { text: 'schedule', tone: 'fn' },
          { text: "('0 0 * * *', ", tone: 'string' },
          { text: 'async ', tone: 'keyword' },
          { text: '() => {', tone: 'plain' },
        ],
      },
      {
        tokens: [
          { text: '  ', tone: 'plain' },
          { text: 'const ', tone: 'keyword' },
          { text: 'today = ', tone: 'plain' },
          { text: 'await ', tone: 'keyword' },
          { text: 'User.', tone: 'plain' },
          { text: 'birthdays', tone: 'fn' },
          { text: '();', tone: 'plain' },
        ],
      },
      {
        tokens: [
          { text: '  ', tone: 'plain' },
          { text: 'for ', tone: 'keyword' },
          { text: '(', tone: 'plain' },
          { text: 'const ', tone: 'keyword' },
          { text: 'u ', tone: 'plain' },
          { text: 'of ', tone: 'keyword' },
          { text: 'today) {', tone: 'plain' },
        ],
      },
      {
        tokens: [
          { text: '    ', tone: 'plain' },
          { text: 'const ', tone: 'keyword' },
          { text: 'img = ', tone: 'plain' },
          { text: 'await ', tone: 'keyword' },
          { text: 'renderFlyer', tone: 'fn' },
          { text: '(u);', tone: 'plain' },
        ],
      },
      {
        tokens: [
          { text: '    ', tone: 'plain' },
          { text: 'await ', tone: 'keyword' },
          { text: 'mailer.', tone: 'plain' },
          { text: 'send', tone: 'fn' },
          { text: '(u, img);', tone: 'plain' },
        ],
      },
      { tokens: [{ text: '  }', tone: 'plain' }] },
      { tokens: [{ text: '});', tone: 'plain' }] },
    ],
    metrics: [
      { value: '00:00', label: 'daily Asia/Colombo cron' },
      { value: 'Jimp · HTML', label: 'dynamic flyer render' },
      { value: 'JWT Auth', label: 'admin CRUD API' },
    ],
    highlights: [
      'Automated midnight cron workers query matching user birthdays and work anniversaries.',
      'Generates personalized high-resolution graphics via Jimp and node-html-to-image, stored and served statically.',
      'Dispatches branded emails via Nodemailer SMTP with React + Vite frontend for user management and template uploads.',
    ],
    architecture: [
      {
        stage: 'Admin UI',
        nodes: ['React + Vite', 'User CRUD', 'Photo Upload (Multer)'],
      },
      {
        stage: 'API & Auth',
        nodes: ['Node.js / Express', 'JWT + bcryptjs', 'MongoDB / Postgres'],
      },
      {
        stage: 'Automation',
        nodes: ['node-cron Jobs', 'Birthday & Anniversary', 'Jimp / HTML-to-Image'],
      },
      {
        stage: 'Delivery',
        nodes: ['Nodemailer SMTP', 'Personalized Flyers'],
      },
    ],
    stack: [
      'Node.js',
      'Express',
      'MongoDB',
      'PostgreSQL',
      'node-cron',
      'Jimp',
      'Nodemailer',
      'React',
    ],
    githubUrl: 'https://github.com/DaniduZe/AutoReach',
    secondaryLink: {
      label: 'Birthday Flyer Repo',
      url: 'https://github.com/DaniduZe/Bitrthday-Flyer-Generator',
    },
  },
  {
    id: 'line-follower',
    code: 'P/08',
    title: 'Obstacle-Avoiding Line Follower',
    tagLine: 'Robotics & Electronics',
    categories: ['Robotics & Electronics'],
    year: '2023',
    summary:
      'Arduino robot combining IR line tracking with ultrasonic obstacle detection on a motor-driver drive train.',
    overview:
      'An embedded robotics build combining infrared reflectance arrays for closed-loop path tracking with forward ultrasonic rangefinding to halt cleanly before obstacles on an Arduino-controlled wheeled chassis.',
    image: '/projects/linebot.jpg',
    drawerImage: '/projects/linebot.jpg',
    drawerImageCaption: 'Assembled Arduino chassis with ultrasonic rangefinder & IR line sensors',
    metrics: [
      { value: 'IR + US', label: 'dual sensor loop' },
      { value: 'Arduino', label: 'C++ control logic' },
      { value: 'H-Bridge', label: 'differential drive' },
    ],
    highlights: [
      'Closed-loop IR reflectance sensors continuously steer differential DC motors along high-contrast tracks.',
      'Forward ultrasonic rangefinder overrides drive commands to prevent collisions with obstacles on the path.',
      'Modular hardware wiring and documented assembly steps for reproducible robotics builds.',
    ],
    architecture: [
      {
        stage: 'Sensing',
        nodes: ['IR Reflectance Array', 'Ultrasonic Rangefinder'],
      },
      {
        stage: 'Controller',
        nodes: ['Arduino MCU', 'Line Tracking Loop', 'Obstacle Override'],
      },
      {
        stage: 'Drive',
        nodes: ['H-Bridge Motor Driver', 'Differential DC Wheels'],
      },
    ],
    stack: ['Arduino', 'C++', 'IR Sensors', 'Ultrasonic', 'Motor Driver'],
    githubUrl: 'https://github.com/DaniduZe/Obstacle-Avoide-Line-Following-Robot',
  },
];
