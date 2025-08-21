import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FormProvider, useFormContext } from './FormContext';
import { PricingPreview } from './PricingPreview';
import { ServiceSelection } from './steps/ServiceSelection';
import { ServiceConfiguration } from './steps/ServiceConfiguration';
import { AdditionalServices } from './steps/AdditionalServices';
import { ProjectDetails } from './steps/ProjectDetails';
import { ReviewSubmit } from './steps/ReviewSubmit';
import { Check, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const FormContent: React.FC = () => {
  const { currentStep, setCurrentStep, formData } = useFormContext();

  const steps = [
    { 
      component: ServiceSelection, 
      title: 'Select Services',
      description: 'Choose your content needs',
      icon: '🎯'
    },
    { 
      component: ServiceConfiguration, 
      title: 'Configure Services',
      description: 'Customize your selections',
      icon: '⚙️'
    },
    { 
      component: AdditionalServices, 
      title: 'Add-ons & Upsells',
      description: 'Enhance your order',
      icon: '✨'
    },
    { 
      component: ProjectDetails, 
      title: 'Project Details',
      description: 'Final information',
      icon: '📋'
    },
    { 
      component: ReviewSubmit, 
      title: 'Review & Submit',
      description: 'Confirm your order',
      icon: '🚀'
    }
  ];

  const canGoNext = (stepIndex: number) => {
    switch (stepIndex) {
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

  const isStepCompleted = (stepIndex: number) => {
    return currentStep > stepIndex;
  };

  const isStepActive = (stepIndex: number) => {
    return currentStep === stepIndex;
  };

  const handleStepClick = (stepIndex: number) => {
    // Only allow going to previous steps or the next step if current is complete
    if (stepIndex < currentStep || (stepIndex === currentStep + 1 && canGoNext(currentStep))) {
      setCurrentStep(stepIndex);
    }
  };

  const handleNext = (stepIndex: number) => {
    if (canGoNext(stepIndex) && stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1);
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

            {/* Vertical Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <Card key={index} className="bg-background/60 backdrop-blur-sm shadow-medium border">
                  <Collapsible open={isStepActive(index)} onOpenChange={() => handleStepClick(index)}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className={cn(
                        "cursor-pointer transition-all duration-200 hover:bg-muted/50",
                        isStepActive(index) && "bg-primary/5",
                        isStepCompleted(index) && "bg-success/5"
                      )}>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                                isStepCompleted(index)
                                  ? "bg-success border-success text-success-foreground"
                                  : isStepActive(index)
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-muted bg-background text-muted-foreground"
                              )}
                            >
                              {isStepCompleted(index) ? (
                                <Check className="h-5 w-5" />
                              ) : (
                                <span className="text-lg">{step.icon}</span>
                              )}
                            </div>
                            <div>
                              <h3 className={cn(
                                "font-semibold transition-colors",
                                isStepActive(index) || isStepCompleted(index) ? "text-foreground" : "text-muted-foreground"
                              )}>
                                {step.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                          </div>
                          <ChevronDown className={cn(
                            "h-5 w-5 transition-transform duration-200",
                            isStepActive(index) ? "rotate-180" : ""
                          )} />
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <step.component />
                        
                        {/* Step Navigation */}
                        <div className="flex justify-between mt-6 pt-4 border-t">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentStep(Math.max(0, index - 1))}
                            disabled={index === 0}
                            className="flex items-center gap-2"
                          >
                            <ChevronRight className="h-4 w-4 rotate-180" />
                            Back
                          </Button>

                          {index < steps.length - 1 && (
                            <Button
                              onClick={() => handleNext(index)}
                              disabled={!canGoNext(index)}
                              className="flex items-center gap-2 bg-gradient-primary hover:opacity-90 transition-opacity"
                            >
                              Continue
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
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