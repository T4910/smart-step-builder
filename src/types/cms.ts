// CMS Platform Types - Complete data structure for multi-panel system

export type UserRole = 'content-lead' | 'worker' | 'client' | 'reviewer';

export type OrderStatus = 
  | 'not-started' 
  | 'in-progress' 
  | 'awaiting-review' 
  | 'in-review' 
  | 'completed' 
  | 'delivered' 
  | 'redo-requested';

export type ServiceType = 'motion-graphics' | 'ugc-video' | 'static-graphic' | 'voiceover' | 'script-writing';
export type WorkerSpecialty = 'designer' | 'animator' | 'voice-actor' | 'writer' | 'video-editor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  specialty?: WorkerSpecialty; // For workers
  isActive: boolean;
  joinedAt: string;
}

export interface ServiceConfig {
  serviceType: ServiceType;
  duration?: string;
  format?: string;
  variations?: number;
  needsScript?: boolean;
  needsVoiceover?: boolean;
  additionalOptions?: Record<string, any>;
}

export interface Asset {
  id: string;
  filename: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'script';
  url: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  version: number;
  isWatermarked?: boolean;
}

export interface Comment {
  id: string;
  orderId: string;
  userId: string;
  content: string;
  mentions: string[]; // User IDs mentioned
  attachments?: Asset[];
  createdAt: string;
  updatedAt?: string;
  isResolved?: boolean;
}

export interface TimelineEvent {
  id: string;
  orderId: string;
  type: 'status_change' | 'assignment' | 'upload' | 'comment' | 'payment' | 'deadline';
  description: string;
  userId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface Order {
  id: string;
  clientId: string;
  campaignId?: string;
  
  // From SCRF
  projectName: string;
  description: string;
  deadline: string;
  selectedServices: ServiceType[];
  serviceConfigs: Record<ServiceType, ServiceConfig>;
  additionalServices: string[];
  
  // Order Management
  status: OrderStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedCompletion: string;
  actualCompletion?: string;
  
  // Team Assignment
  assignedLead?: string;
  assignedWorkers: Record<WorkerSpecialty, string>; // specialty -> userId
  assignedReviewers: string[];
  
  // Assets & Deliverables
  briefAssets: Asset[]; // Client uploads from SCRF
  workInProgressAssets: Asset[]; // Worker uploads
  finalDeliverables: Asset[]; // Final approved assets
  
  // Financial
  totalPrice: number;
  priceBreakdown: {
    basePrice: number;
    addOns: Array<{ name: string; price: number }>;
  };
  isPaid: boolean;
  paymentMethod?: 'coins' | 'direct';
  
  // Collaboration
  comments: Comment[];
  timeline: TimelineEvent[];
  
  // Tracking
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface Campaign {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  goals: string[];
  targetPlatforms: string[];
  startDate: string;
  endDate: string;
  orders: string[]; // Order IDs
  totalBudget: number;
  status: 'planning' | 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'purchase' | 'refund' | 'withdrawal';
  amount: number;
  description: string;
  orderId?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface ClientWallet {
  id: string;
  clientId: string;
  balance: number; // In platform coins
  transactions: WalletTransaction[];
  updatedAt: string;
}

// Dashboard Filters & Views
export interface OrderFilters {
  status?: OrderStatus[];
  assignedTo?: string;
  client?: string;
  services?: ServiceType[];
  priority?: ('low' | 'medium' | 'high' | 'urgent')[];
  dateRange?: {
    start: string;
    end: string;
  };
  search?: string;
}

export interface DashboardStats {
  totalOrders: number;
  activeOrders: number;
  completedThisMonth: number;
  averageCompletionTime: number; // in days
  revenueThisMonth: number;
  topServices: Array<{
    service: ServiceType;
    count: number;
    revenue: number;
  }>;
}

// Review System
export interface ReviewCriteria {
  id: string;
  serviceType: ServiceType;
  criteria: Array<{
    name: string;
    description: string;
    required: boolean;
  }>;
}

export interface Review {
  id: string;
  orderId: string;
  reviewerId: string;
  serviceType: ServiceType;
  status: 'pass' | 'needs-changes';
  feedback: string;
  annotations?: Array<{
    assetId: string;
    timestamp?: number; // For video/audio
    coordinates?: { x: number; y: number }; // For images
    comment: string;
  }>;
  criteriaChecks: Record<string, boolean>;
  createdAt: string;
}

// Notification System
export interface Notification {
  id: string;
  userId: string;
  type: 'assignment' | 'status_update' | 'comment' | 'deadline' | 'payment' | 'review';
  title: string;
  message: string;
  orderId?: string;
  campaignId?: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}