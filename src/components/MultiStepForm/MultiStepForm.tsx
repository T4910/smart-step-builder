import React from 'react';
import { Button } from '@/components/ui/button';
import { FormProvider, useFormContext } from './FormContext';
import { FormStepper } from './FormStepper';
import { PricingPreview } from './PricingPreview';
import { ServiceSelection } from './steps/ServiceSelection';
import { ServiceConfiguration } from './steps/ServiceConfiguration';
import { AdditionalServices } from './steps/AdditionalServices';
import { ProjectDetails } from './steps/ProjectDetails';
import { ReviewSubmit } from './steps/ReviewSubmit';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FormContent: React.FC = () => {
  const { currentStep, setCurrentStep, formData } = useFormContext();

  const steps = [
    { component: ServiceSelection, title: 'Select Services' },
    { component: ServiceConfiguration, title: 'Configure Services' },
    { component: AdditionalServices, title: 'Add-ons & Upsells' },
    { component: ProjectDetails, title: 'Project Details' },
    { component: ReviewSubmit, title: 'Review & Submit' }
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const canGoNext = () => {
    switch (currentStep) {
      case 0:
        return formData.selectedServices.length > 0;
      case 1:
        return true; // Configuration is optional
      case 2:
        return true; // Add-ons are optional
      case 3:
        return formData.finalDetails.projectName.trim() !== '' && 
               formData.finalDetails.description.trim() !== '';
      case 4:
        return false; // Final step
      default:
        return false;
    }
  };

  const canGoBack = () => {
    return currentStep > 0;
  };

  const handleNext = () => {
    if (canGoNext() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (canGoBack()) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Smart Content Request Form
              </h1>
              <p className="text-muted-foreground mt-2">
                Tell us what you need, and we'll create amazing content for your brand
              </p>
            </div>

            {/* Stepper */}
            <FormStepper />

            {/* Current Step Content */}
            <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6 shadow-large border">
              <CurrentStepComponent />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={!canGoBack()}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>

              {currentStep < steps.length - 1 && (
                <Button
                  onClick={handleNext}
                  disabled={!canGoNext()}
                  className="flex items-center gap-2 bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  Continue
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Pricing Preview Sidebar */}
          <div className="lg:col-span-1">
            <PricingPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export const MultiStepForm: React.FC = () => {
  return (
    <FormProvider>
      <FormContent />
    </FormProvider>
  );
};