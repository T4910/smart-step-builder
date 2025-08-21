import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { FormData, FormContextType, ServiceType, PriceCalculation } from './types';
import { SERVICE_PRICES } from './constants';

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

const initialFormData: FormData = {
  selectedServices: [],
  serviceConfigs: {},
  additionalServices: [],
  finalDetails: {
    projectName: '',
    description: '',
    deadline: '',
    attachments: []
  }
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const priceBreakdown = useMemo((): PriceCalculation => {
    let basePrice = 0;
    const addOns: Array<{ name: string; price: number }> = [];

    // Calculate base prices for selected services
    formData.selectedServices.forEach(serviceId => {
      basePrice += SERVICE_PRICES[serviceId];
      
      const config = formData.serviceConfigs[serviceId];
      if (!config) return;

      // Motion Graphics pricing logic
      if (serviceId === 'motion-graphics') {
        if (config.needsScript) {
          addOns.push({ name: 'Script Writing', price: 2000 });
        }
        if (config.needsVoiceover) {
          addOns.push({ name: 'Voiceover', price: 4000 });
        }
        if (config.addThumbnails) {
          addOns.push({ name: 'Static Thumbnails', price: 3000 });
        }
        if (config.syncVoiceoverAnimation) {
          addOns.push({ name: 'VO Sync with Animation', price: 2000 });
        }
      }

      // UGC Video pricing logic
      if (serviceId === 'ugc-video') {
        if (config.duration === '40s') {
          addOns.push({ name: 'Extended Duration (40s)', price: 10000 });
        } else if (config.duration === '60s') {
          addOns.push({ name: 'Extended Duration (60s)', price: 20000 });
        } else if (config.duration === '1:20') {
          addOns.push({ name: 'Extended Duration (1:20)', price: 30000 });
        }
        
        if (config.needsScript) {
          const duration = config.duration || '20s';
          const blocks = Math.ceil(parseInt(duration) / 15);
          addOns.push({ name: `Script Writing (${duration})`, price: 2000 * blocks });
        }
        
        if (config.needsVoiceover) {
          const duration = config.duration || '20s';
          const blocks = Math.ceil(parseInt(duration) / 30);
          addOns.push({ name: `Voiceover (${duration})`, price: 4000 * blocks });
        }

        if (config.overlayAnimation) {
          addOns.push({ name: 'Branded Animation Overlay', price: 5000 });
        }
      }

      // Static Graphic pricing logic
      if (serviceId === 'static-graphic') {
        if (config.extraVariations) {
          addOns.push({ 
            name: `Extra Variations (${config.extraVariations})`, 
            price: 2000 * config.extraVariations 
          });
        }
        if (config.animateGraphic) {
          addOns.push({ name: 'Simple Animation', price: 5000 });
        }
      }

      // Voiceover pricing logic
      if (serviceId === 'voiceover') {
        if (config.duration === '60s') {
          addOns.push({ name: 'Extended Duration (60s)', price: 4000 });
        } else if (config.duration === '90s') {
          addOns.push({ name: 'Extended Duration (90s)', price: 8000 });
        }
        
        if (config.addSubtitles) {
          addOns.push({ name: 'Burned-in Subtitles', price: 3000 });
        }
      }
    });

    const total = basePrice + addOns.reduce((sum, addon) => sum + addon.price, 0);

    return {
      basePrice,
      addOns,
      total
    };
  }, [formData]);

  return (
    <FormContext.Provider value={{
      formData,
      updateFormData,
      currentStep,
      setCurrentStep,
      totalPrice: priceBreakdown.total,
      priceBreakdown
    }}>
      {children}
    </FormContext.Provider>
  );
};