import { Service, ServiceType } from './types';

export const SERVICE_PRICES = {
  'motion-graphics': 10000,
  'ugc-video': 10000,
  'static-graphic': 5000,
  'voiceover': 4000,
  'script-writing': 2000
} as const;

export const SERVICE_NAMES = {
  'motion-graphics': 'Motion Graphics',
  'ugc-video': 'UGC Video',
  'static-graphic': 'Static Graphic',
  'voiceover': 'Voiceover',
  'script-writing': 'Script Writing'
} as const;

export const SERVICES: Service[] = [
  {
    id: 'motion-graphics',
    name: 'Motion Graphics',
    basePrice: 10000,
    description: 'Animated graphics and visual effects (≤15s)',
    icon: '🎬'
  },
  {
    id: 'ugc-video',
    name: 'UGC Video',
    basePrice: 10000,
    description: 'User-generated content style videos (20s standard)',
    icon: '📱'
  },
  {
    id: 'static-graphic',
    name: 'Static Graphic',
    basePrice: 5000,
    description: 'Static designs for social media and web',
    icon: '🎨'
  },
  {
    id: 'voiceover',
    name: 'Voiceover',
    basePrice: 4000,
    description: 'Professional voice recordings (≤30s)',
    icon: '🎤'
  },
  {
    id: 'script-writing',
    name: 'Script Writing',
    basePrice: 2000,
    description: 'Professional copywriting (per 15s block)',
    icon: '✍️'
  }
];