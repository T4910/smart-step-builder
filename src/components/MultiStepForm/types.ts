export interface FormData {
  selectedServices: ServiceType[];
  serviceConfigs: Record<string, any>;
  additionalServices: string[];
  finalDetails: {
    projectName: string;
    description: string;
    deadline: string;
    attachments: File[];
  };
}

export type ServiceType = 'motion-graphics' | 'ugc-video' | 'static-graphic' | 'voiceover' | 'script-writing';

export interface Service {
  id: ServiceType;
  name: string;
  basePrice: number;
  description: string;
  icon: string;
}

export interface PriceCalculation {
  basePrice: number;
  addOns: Array<{
    name: string;
    price: number;
  }>;
  total: number;
}

export interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalPrice: number;
  priceBreakdown: PriceCalculation;
}