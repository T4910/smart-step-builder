// Mock Data for CMS Platform Development
import { User, Order, Campaign, Asset, Comment, TimelineEvent, Review, Notification, DashboardStats } from '@/types/cms';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'lead-1',
    name: 'Sarah Johnson',
    email: 'sarah@contentfactory.com',
    role: 'content-lead',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150',
    isActive: true,
    joinedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 'worker-1',
    name: 'Mike Chen',
    email: 'mike@contentfactory.com',
    role: 'worker',
    specialty: 'designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    isActive: true,
    joinedAt: '2024-02-01T08:00:00Z'
  },
  {
    id: 'worker-2',
    name: 'Emma Rodriguez',
    email: 'emma@contentfactory.com',
    role: 'worker',
    specialty: 'animator',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    isActive: true,
    joinedAt: '2024-02-05T08:00:00Z'
  },
  {
    id: 'worker-3',
    name: 'David Kim',
    email: 'david@contentfactory.com',
    role: 'worker',
    specialty: 'voice-actor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    isActive: true,
    joinedAt: '2024-02-10T08:00:00Z'
  },
  {
    id: 'reviewer-1',
    name: 'Alex Thompson',
    email: 'alex@contentfactory.com',
    role: 'reviewer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    isActive: true,
    joinedAt: '2024-01-20T08:00:00Z'
  },
  {
    id: 'client-1',
    name: 'Jennifer Walsh',
    email: 'jen@techstartup.com',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
    isActive: true,
    joinedAt: '2024-03-01T08:00:00Z'
  },
  {
    id: 'client-2',
    name: 'Robert Martinez',
    email: 'robert@brandcorp.com',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150',
    isActive: true,
    joinedAt: '2024-02-20T08:00:00Z'
  }
];

// Mock Assets
export const mockAssets: Asset[] = [
  {
    id: 'asset-1',
    filename: 'brand-guidelines.pdf',
    type: 'document',
    url: '/mock-assets/brand-guidelines.pdf',
    size: 2048000,
    uploadedBy: 'client-1',
    uploadedAt: '2024-03-15T10:00:00Z',
    version: 1
  },
  {
    id: 'asset-2',
    filename: 'logo-variations.png',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400',
    size: 512000,
    uploadedBy: 'client-1',
    uploadedAt: '2024-03-15T10:15:00Z',
    version: 1
  },
  {
    id: 'asset-3',
    filename: 'motion-graphics-v1.mp4',
    type: 'video',
    url: '/mock-assets/motion-graphics-v1.mp4',
    size: 10240000,
    uploadedBy: 'worker-2',
    uploadedAt: '2024-03-18T14:30:00Z',
    version: 1,
    isWatermarked: true
  },
  {
    id: 'asset-4',
    filename: 'voiceover-script.docx',
    type: 'script',
    url: '/mock-assets/voiceover-script.docx',
    size: 128000,
    uploadedBy: 'worker-3',
    uploadedAt: '2024-03-17T11:20:00Z',
    version: 2
  }
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    orderId: 'order-1',
    userId: 'lead-1',
    content: 'Great work on the initial concept! @worker-2 can you adjust the color scheme to match the brand guidelines more closely?',
    mentions: ['worker-2'],
    createdAt: '2024-03-18T15:00:00Z'
  },
  {
    id: 'comment-2',
    orderId: 'order-1',
    userId: 'worker-2',
    content: 'Absolutely! I\'ll update the color palette and have a new version ready by tomorrow.',
    mentions: [],
    createdAt: '2024-03-18T15:15:00Z'
  },
  {
    id: 'comment-3',
    orderId: 'order-1',
    userId: 'client-1',
    content: 'This looks amazing! One small request - can we make the logo 20% larger in the final frame?',
    mentions: [],
    createdAt: '2024-03-19T09:30:00Z'
  }
];

// Mock Timeline Events
export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'event-1',
    orderId: 'order-1',
    type: 'status_change',
    description: 'Order created and moved to Not Started',
    userId: 'client-1',
    createdAt: '2024-03-15T08:00:00Z'
  },
  {
    id: 'event-2',
    orderId: 'order-1',
    type: 'assignment',
    description: 'Assigned to Content Lead Sarah Johnson',
    userId: 'lead-1',
    createdAt: '2024-03-15T09:00:00Z'
  },
  {
    id: 'event-3',
    orderId: 'order-1',
    type: 'assignment',
    description: 'Emma Rodriguez assigned as Animator',
    userId: 'lead-1',
    metadata: { assignedWorker: 'worker-2', specialty: 'animator' },
    createdAt: '2024-03-15T09:15:00Z'
  },
  {
    id: 'event-4',
    orderId: 'order-1',
    type: 'status_change',
    description: 'Status changed to In Progress',
    userId: 'lead-1',
    createdAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 'event-5',
    orderId: 'order-1',
    type: 'upload',
    description: 'Brand guidelines uploaded by client',
    userId: 'client-1',
    metadata: { assetId: 'asset-1', filename: 'brand-guidelines.pdf' },
    createdAt: '2024-03-15T10:00:00Z'
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    clientId: 'client-1',
    campaignId: 'campaign-1',
    projectName: 'TechStartup Product Launch Video',
    description: 'Need a compelling motion graphics video to announce our new SaaS product. Should highlight key features: automation, analytics, and team collaboration. Target audience: B2B decision makers, tech-savvy professionals. Style: Modern, clean, professional with tech-forward aesthetic. Brand colors: Blue (#2563EB), Gray (#6B7280), White.',
    deadline: '2024-03-25T23:59:59Z',
    selectedServices: ['motion-graphics', 'voiceover', 'script-writing'],
    serviceConfigs: {
      'motion-graphics': {
        serviceType: 'motion-graphics',
        duration: '15s',
        needsScript: true,
        needsVoiceover: true,
        additionalOptions: { addThumbnails: true }
      },
      'ugc-video': {
        serviceType: 'ugc-video'
      },
      'static-graphic': {
        serviceType: 'static-graphic'
      },
      'voiceover': {
        serviceType: 'voiceover',
        duration: '15s',
        additionalOptions: { voiceStyle: 'professional-female' }
      },
      'script-writing': {
        serviceType: 'script-writing',
        additionalOptions: { purpose: 'motion-graphics' }
      }
    },
    additionalServices: ['thumbnail-creation'],
    status: 'in-progress',
    priority: 'high',
    estimatedCompletion: '2024-03-24T17:00:00Z',
    assignedLead: 'lead-1',
    assignedWorkers: {
      'designer': '',
      'animator': 'worker-2',
      'voice-actor': 'worker-3',
      'writer': 'worker-1',
      'video-editor': ''
    },
    assignedReviewers: ['reviewer-1'],
    briefAssets: [mockAssets[0], mockAssets[1]],
    workInProgressAssets: [mockAssets[2], mockAssets[3]],
    finalDeliverables: [],
    totalPrice: 19000,
    priceBreakdown: {
      basePrice: 16000,
      addOns: [
        { name: 'Static Thumbnails', price: 3000 }
      ]
    },
    isPaid: true,
    paymentMethod: 'coins',
    comments: mockComments,
    timeline: mockTimelineEvents,
    createdAt: '2024-03-15T08:00:00Z',
    updatedAt: '2024-03-19T09:30:00Z',
    version: 3
  },
  {
    id: 'order-2',
    clientId: 'client-2',
    projectName: 'Social Media UGC Campaign',
    description: 'Need 3 UGC-style videos for Instagram and TikTok promoting our new fitness app. Authentic, energetic vibe. Target: fitness enthusiasts, 18-35 years old.',
    deadline: '2024-03-30T23:59:59Z',
    selectedServices: ['ugc-video'],
    serviceConfigs: {
      'motion-graphics': { serviceType: 'motion-graphics' },
      'ugc-video': {
        serviceType: 'ugc-video',
        duration: '30s',
        additionalOptions: { quantity: 3, platform: 'instagram-tiktok' }
      },
      'static-graphic': { serviceType: 'static-graphic' },
      'voiceover': { serviceType: 'voiceover' },
      'script-writing': { serviceType: 'script-writing' }
    },
    additionalServices: [],
    status: 'awaiting-review',
    priority: 'medium',
    estimatedCompletion: '2024-03-28T17:00:00Z',
    assignedLead: 'lead-1',
    assignedWorkers: {
      'designer': '',
      'animator': '',
      'voice-actor': '',
      'writer': '',
      'video-editor': 'worker-1'
    },
    assignedReviewers: ['reviewer-1'],
    briefAssets: [],
    workInProgressAssets: [],
    finalDeliverables: [],
    totalPrice: 25000,
    priceBreakdown: {
      basePrice: 25000,
      addOns: []
    },
    isPaid: false,
    comments: [],
    timeline: [],
    createdAt: '2024-03-12T10:00:00Z',
    updatedAt: '2024-03-19T16:45:00Z',
    version: 1
  },
  {
    id: 'order-3',
    clientId: 'client-1',
    campaignId: 'campaign-1',
    projectName: 'Website Hero Graphics',
    description: 'Static graphics for website hero section. Need 3 variations for A/B testing. Modern, minimalist design.',
    deadline: '2024-03-22T23:59:59Z',
    selectedServices: ['static-graphic'],
    serviceConfigs: {
      'motion-graphics': { serviceType: 'motion-graphics' },
      'ugc-video': { serviceType: 'ugc-video' },
      'static-graphic': {
        serviceType: 'static-graphic',
        format: 'web',
        variations: 3,
        additionalOptions: { dimensions: '1920x1080' }
      },
      'voiceover': { serviceType: 'voiceover' },
      'script-writing': { serviceType: 'script-writing' }
    },
    additionalServices: [],
    status: 'completed',
    priority: 'low',
    estimatedCompletion: '2024-03-20T17:00:00Z',
    actualCompletion: '2024-03-19T14:30:00Z',
    assignedLead: 'lead-1',
    assignedWorkers: {
      'designer': 'worker-1',
      'animator': '',
      'voice-actor': '',
      'writer': '',
      'video-editor': ''
    },
    assignedReviewers: ['reviewer-1'],
    briefAssets: [],
    workInProgressAssets: [],
    finalDeliverables: [],
    totalPrice: 11000,
    priceBreakdown: {
      basePrice: 5000,
      addOns: [
        { name: 'Extra Variations (3)', price: 6000 }
      ]
    },
    isPaid: true,
    paymentMethod: 'direct',
    comments: [],
    timeline: [],
    createdAt: '2024-03-10T08:00:00Z',
    updatedAt: '2024-03-19T14:30:00Z',
    version: 2
  }
];

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-1',
    clientId: 'client-1',
    name: 'Q2 Product Launch Campaign',
    description: 'Complete content package for our major product launch including motion graphics, static assets, and social content.',
    goals: [
      'Increase brand awareness by 40%',
      'Generate 1000+ qualified leads',
      'Achieve 50M+ social impressions'
    ],
    targetPlatforms: ['LinkedIn', 'Twitter', 'Website', 'Email'],
    startDate: '2024-03-15T00:00:00Z',
    endDate: '2024-04-30T23:59:59Z',
    orders: ['order-1', 'order-3'],
    totalBudget: 50000,
    status: 'active',
    createdAt: '2024-03-10T08:00:00Z',
    updatedAt: '2024-03-19T16:00:00Z'
  }
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalOrders: 47,
  activeOrders: 12,
  completedThisMonth: 23,
  averageCompletionTime: 4.2,
  revenueThisMonth: 287000,
  topServices: [
    { service: 'motion-graphics', count: 15, revenue: 150000 },
    { service: 'ugc-video', count: 12, revenue: 120000 },
    { service: 'static-graphic', count: 8, revenue: 40000 },
    { service: 'voiceover', count: 6, revenue: 24000 },
    { service: 'script-writing', count: 6, revenue: 12000 }
  ]
};

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: 'review-1',
    orderId: 'order-1',
    reviewerId: 'reviewer-1',
    serviceType: 'motion-graphics',
    status: 'needs-changes',
    feedback: 'Great concept and execution! Just need to adjust the logo size in the final frame and ensure brand colors are consistent throughout.',
    annotations: [
      {
        assetId: 'asset-3',
        timestamp: 12.5,
        comment: 'Logo appears too small here - needs to be 20% larger'
      },
      {
        assetId: 'asset-3',
        timestamp: 8.2,
        comment: 'This blue shade doesn\'t match brand guidelines exactly'
      }
    ],
    criteriaChecks: {
      'brand-compliance': false,
      'technical-quality': true,
      'messaging-clarity': true,
      'visual-appeal': true
    },
    createdAt: '2024-03-19T11:30:00Z'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'worker-2',
    type: 'comment',
    title: 'New comment on TechStartup Project',
    message: 'Sarah Johnson mentioned you in a comment',
    orderId: 'order-1',
    isRead: false,
    actionUrl: '/worker/orders/order-1',
    createdAt: '2024-03-19T15:00:00Z'
  },
  {
    id: 'notif-2',
    userId: 'lead-1',
    type: 'status_update',
    title: 'Order ready for review',
    message: 'Social Media UGC Campaign is ready for review',
    orderId: 'order-2',
    isRead: true,
    actionUrl: '/lead/orders/order-2',
    createdAt: '2024-03-19T14:30:00Z'
  },
  {
    id: 'notif-3',
    userId: 'client-1',
    type: 'deadline',
    title: 'Deadline reminder',
    message: 'TechStartup Product Launch Video is due in 6 days',
    orderId: 'order-1',
    isRead: false,
    actionUrl: '/client/orders/order-1',
    createdAt: '2024-03-19T08:00:00Z'
  }
];

// Helper functions for mock data manipulation
export const getMockUserById = (id: string): User | undefined => 
  mockUsers.find(user => user.id === id);

export const getMockOrdersByClient = (clientId: string): Order[] =>
  mockOrders.filter(order => order.clientId === clientId);

export const getMockOrdersByWorker = (workerId: string): Order[] =>
  mockOrders.filter(order => 
    Object.values(order.assignedWorkers).includes(workerId)
  );

export const getMockOrdersByLead = (leadId: string): Order[] =>
  mockOrders.filter(order => order.assignedLead === leadId);

export const getMockOrdersByReviewer = (reviewerId: string): Order[] =>
  mockOrders.filter(order => order.assignedReviewers.includes(reviewerId));

export const getMockNotificationsByUser = (userId: string): Notification[] =>
  mockNotifications.filter(notif => notif.userId === userId);