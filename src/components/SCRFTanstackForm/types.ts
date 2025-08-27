export interface FormData {
  projectDetails: {
    projectName: string;
    description: string;
    deadline: string;
    attachments: File[];
  };
  services: {
    selectedServices: ServiceType[];
    serviceConfigs: Record<string, any>;
  };
}

export type ServiceType = 'motion-graphics' | 'ugc-video' | 'static-graphic' | 'voiceover' | 'script-writing';

export interface Service {
  id: ServiceType;
  name: string;
  basePrice: number;
  description: string;
  icon: string;
  configs?: ServiceConfig[];
}

export interface ServiceConfig {
  id: string;
  label: string;
  type: 'select' | 'number' | 'checkbox';
  options?: string[];
  defaultValue?: any;
  priceModifier?: number;
}

export interface FormStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  isCompleted: boolean;
  isLocked: boolean;
}

export interface PriceCalculation {
  basePrice: number;
  configPrices: Array<{
    name: string;
    price: number;
  }>;
  total: number;
}