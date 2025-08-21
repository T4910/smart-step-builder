import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFormContext } from './FormContext';

const steps = [
  { id: 1, title: 'Select Services', description: 'Choose your content needs' },
  { id: 2, title: 'Configure Services', description: 'Customize your selections' },
  { id: 3, title: 'Add-ons & Upsells', description: 'Enhance your order' },
  { id: 4, title: 'Project Details', description: 'Final information' },
  { id: 5, title: 'Review & Submit', description: 'Confirm your order' }
];

export const FormStepper: React.FC = () => {
  const { currentStep } = useFormContext();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                  currentStep > index
                    ? "bg-primary border-primary text-primary-foreground shadow-glow"
                    : currentStep === index
                    ? "border-primary bg-primary/10 text-primary shadow-glow"
                    : "border-muted bg-background text-muted-foreground"
                )}
              >
                {currentStep > index ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              <div className="ml-3 hidden md:block">
                <p className={cn(
                  "text-sm font-medium transition-colors",
                  currentStep >= index ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-colors",
                  currentStep > index ? "text-primary" : "text-muted-foreground"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};