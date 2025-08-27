import { Service, ServiceType } from './types';

export const SERVICE_PRICES = {
  'motion-graphics': 10000,
  'ugc-video': 10000,
  'static-graphic': 5000,
  'voiceover': 4000,
  'script-writing': 2000
} as const;

export const SERVICES: Service[] = [
  {
    id: 'motion-graphics',
    name: 'Motion Graphics',
    basePrice: 10000,
    description: 'Animated graphics and visual effects (≤15s)',
    icon: '🎬',
    configs: [
      {
        id: 'duration',
        label: 'Duration',
        type: 'select',
        options: ['5 seconds', '10 seconds', '15 seconds'],
        defaultValue: '10 seconds',
        priceModifier: 0
      },
      {
        id: 'style',
        label: 'Animation Style',
        type: 'select',
        options: ['2D Animation', '3D Animation', 'Kinetic Typography'],
        defaultValue: '2D Animation',
        priceModifier: 0
      },
      {
        id: 'revisions',
        label: 'Included Revisions',
        type: 'select',
        options: ['2 revisions', '3 revisions', '5 revisions'],
        defaultValue: '2 revisions',
        priceModifier: 0
      }
    ]
  },
  {
    id: 'ugc-video',
    name: 'UGC Video',
    basePrice: 10000,
    description: 'User-generated content style videos (20s standard)',
    icon: '📱',
    configs: [
      {
        id: 'platform',
        label: 'Target Platform',
        type: 'select',
        options: ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'Multi-platform'],
        defaultValue: 'Instagram Reels',
        priceModifier: 0
      },
      {
        id: 'talent',
        label: 'Talent Type',
        type: 'select',
        options: ['Female Creator', 'Male Creator', 'Diverse Cast'],
        defaultValue: 'Female Creator',
        priceModifier: 0
      },
      {
        id: 'hooks',
        label: 'Number of Hooks',
        type: 'select',
        options: ['1 hook', '2 hooks', '3 hooks'],
        defaultValue: '2 hooks',
        priceModifier: 0
      }
    ]
  },
  {
    id: 'static-graphic',
    name: 'Static Graphic',
    basePrice: 5000,
    description: 'Static designs for social media and web',
    icon: '🎨',
    configs: [
      {
        id: 'format',
        label: 'Format',
        type: 'select',
        options: ['Square (1:1)', 'Portrait (4:5)', 'Story (9:16)', 'Landscape (16:9)'],
        defaultValue: 'Square (1:1)',
        priceModifier: 0
      },
      {
        id: 'variations',
        label: 'Variations',
        type: 'select',
        options: ['1 design', '2 variations', '3 variations'],
        defaultValue: '1 design',
        priceModifier: 0
      }
    ]
  },
  {
    id: 'voiceover',
    name: 'Voiceover',
    basePrice: 4000,
    description: 'Professional voice recordings (≤30s)',
    icon: '🎤',
    configs: [
      {
        id: 'voice-type',
        label: 'Voice Type',
        type: 'select',
        options: ['Male - Professional', 'Female - Professional', 'Male - Casual', 'Female - Casual'],
        defaultValue: 'Female - Professional',
        priceModifier: 0
      },
      {
        id: 'accent',
        label: 'Accent',
        type: 'select',
        options: ['American', 'British', 'Australian', 'Neutral'],
        defaultValue: 'American',
        priceModifier: 0
      }
    ]
  },
  {
    id: 'script-writing',
    name: 'Script Writing',
    basePrice: 2000,
    description: 'Professional copywriting (per 15s block)',
    icon: '✍️',
    configs: [
      {
        id: 'tone',
        label: 'Tone',
        type: 'select',
        options: ['Professional', 'Casual', 'Playful', 'Urgent'],
        defaultValue: 'Professional',
        priceModifier: 0
      },
      {
        id: 'length',
        label: 'Script Length',
        type: 'select',
        options: ['15 seconds', '30 seconds', '60 seconds'],
        defaultValue: '30 seconds',
        priceModifier: 0
      }
    ]
  }
];

export const getServiceById = (id: ServiceType): Service | undefined => {
  return SERVICES.find(service => service.id === id);
};