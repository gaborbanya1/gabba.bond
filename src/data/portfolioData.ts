import { ProjectItem } from '../types';

export const BRAND_INFO = {
  name: 'gabba',
  slogan: 'Technology, Bonded.',
  subtitle: 'Software & Digital Products',
  tagline: 'Engineering software. Built for people.',
  description: 'Specialized software engineering studio building fail-safe Android systems and mission-critical applications.',
  email: 'gabba@gabba.bond',
  location: 'Budapest, Hungary (Central European Time / CET)',
  availability: 'Available for Select Projects & Architecture',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'senear',
    title: 'SENEAR',
    subtitle: 'Part of The NEAR Ecosystem — SENEAR for Seniors & JUNEAR for Kids',
    category: 'Flagship Product',
    badge: 'Flagship Android Ecosystem',
    isFlagship: true,
    demoAvailable: true,
    description: 'A distraction-free, fail-safe Android launcher and remote care system for seniors and kids. Built natively in Kotlin with robust Device Owner kiosk protection.',
    problemStatement: 'Modern mobile operating systems overwhelm vulnerable demographics with tiny touch targets, unintended gesture dismissals, silent mode toggles, and complex nested menus, causing anxiety and frequent lockouts.',
    solutionArchitecture: 'Engineered in native Kotlin with Jetpack Compose. Functions as an Android Device Owner (DPC) kiosk, replacing standard system chrome with high-contrast, tactile protection cards, backed by real-time caregiver synchronization.',
    keyHighlights: [
      'Android Device Owner (DPC) kiosk lockdown prevents unintentional system tampering or uninstalls',
      'Single-tap emergency SOS broadcasting real-time GPS coordinates and auto-calling family members',
      'Offline-first state machine: operates seamlessly during cellular or Wi-Fi interruptions',
      'Remote caregiver dashboard for family members to adjust volume, battery alerts, and speed-dial contacts',
      'Dual demographic adaptability: SENEAR for seniors & JUNEAR for children'
    ],
    techStack: [
      'Android SDK',
      'Kotlin',
      'Jetpack Compose',
      'Device Owner / DPC',
      'RoleManager',
      'Room DB (Offline-First)',
      'Firebase Cloud Messaging',
      'Clean Architecture'
    ],
    metrics: [
      { label: 'Accidental Lockouts', value: '0%' },
      { label: 'Touch Target Area', value: '300% Larger' },
      { label: 'Offline Availability', value: '100% Core' },
      { label: 'Battery Overhead', value: '< 2.1% / day' }
    ]
  }
];

export const SENEAR_SIMULATOR_DATA = {
  emergencyContact: { name: 'Emergency Family Caregiver', phone: '+36 30 555 0192', relation: 'Primary Caregiver' },
  speedDials: [
    { id: '1', name: 'Anna', role: 'Daughter', phone: '+36 30 555 0192', color: 'bg-[#C5A880]/20 border-[#C5A880]' },
    { id: '2', name: 'Peter', role: 'Son', phone: '+36 20 555 0831', color: 'bg-[#E8DFD3]/60 border-[#D4AF37]/50' },
    { id: '3', name: 'Family Doctor', role: 'Clinic', phone: '+36 1 456 7890', color: 'bg-[#F5F0EB] border-[#C5A880]/40' }
  ],
  medications: [
    { time: '08:00 AM', name: 'Morning Blood Pressure', status: 'Taken' },
    { time: '01:00 PM', name: 'After-lunch Vitamin D3', status: 'Upcoming' },
    { time: '08:00 PM', name: 'Evening Heart Support', status: 'Upcoming' }
  ]
};

// Backwards-compatible alias
export const NOGOND_SIMULATOR_DATA = SENEAR_SIMULATOR_DATA;
