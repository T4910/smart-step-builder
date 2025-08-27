import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormData, FormStep } from './types';
import { ProjectDetailsStep } from './steps/ProjectDetailsStep';
import { ServiceSelectionStep } from './steps/ServiceSelectionStep';
import { ReviewSubmitStep } from './steps/ReviewSubmitStep';
import { PricingPreview } from './PricingPreview';
import { cn } from '@/lib/utils';
import { Check, ChevronDown, AlertTriangle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const initialFormData: FormData = {
  projectDetails: {
    projectName: '',
    description: '',
    deadline: '',
    attachments: []
  },
  services: {
    selectedServices: [],
    serviceConfigs: {}
  }
};

export const SCRFForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [pendingStep, setPendingStep] = useState<number | null>(null);

  const form = useForm({
    defaultValues: initialFormData,
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value);
      // Here you would handle the form submission
      alert('Form submitted successfully! Check console for details.');
    }
  });

  const steps: FormStep[] = [
    {
      id: 'project-details',
      title: 'Project Details',
      description: 'Tell us about your project',
      icon: '📋',
      isCompleted: currentStep > 0,
      isLocked: false
    },
    {
      id: 'service-selection',
      title: 'Select & Configure Services',
      description: 'Choose and customize your content',
      icon: '🎯',
      isCompleted: currentStep > 1,
      isLocked: currentStep < 1
    },
    {
      id: 'review-submit',
      title: 'Review & Submit',
      description: 'Confirm your order',
      icon: '🚀',
      isCompleted: false,
      isLocked: currentStep < 2
    }
  ];

  const canGoNext = (stepIndex: number) => {
    const formData = form.state.values;
    switch (stepIndex) {
      case 0:
        return formData.projectDetails.projectName.trim() !== '' && 
               formData.projectDetails.description.trim() !== '';
      case 1:
        return formData.services.selectedServices.length > 0;
      case 2:
        return false; // Final step
      default:
        return false;
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      // Going to a previous step - show confirmation
      setPendingStep(stepIndex);
      setShowResetDialog(true);
    } else if (stepIndex === currentStep) {
      // Current step - allow toggle
      return;
    } else if (stepIndex === currentStep + 1 && canGoNext(currentStep)) {
      // Next step if current is complete
      setCurrentStep(stepIndex);
    }
  };

  const handleConfirmReset = () => {
    if (pendingStep !== null) {
      setCurrentStep(pendingStep);
      setPendingStep(null);
    }
    setShowResetDialog(false);
  };

  const handleNext = (stepIndex: number) => {
    if (canGoNext(stepIndex) && stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const renderStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <ProjectDetailsStep form={form} />;
      case 1:
        return <ServiceSelectionStep form={form} />;
      case 2:
        return <ReviewSubmitStep form={form} />;
      default:
        return null;
    }
  };

  // Calculate if next 5 days should be disabled for deadline
  const getDisabledDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
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

            {/* Form Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <Card key={index} className="bg-background/60 backdrop-blur-sm shadow-medium border">
                  <Collapsible 
                    open={currentStep === index} 
                    onOpenChange={() => handleStepClick(index)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className={cn(
                        "cursor-pointer transition-all duration-200 hover:bg-muted/50",
                        currentStep === index && "bg-primary/5",
                        step.isCompleted && "bg-success/5",
                        step.isLocked && "opacity-50 cursor-not-allowed"
                      )}>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                                step.isCompleted
                                  ? "bg-success border-success text-success-foreground"
                                  : currentStep === index
                                  ? "border-primary bg-primary/10 text-primary"
                                  : step.isLocked
                                  ? "border-muted bg-muted text-muted-foreground"
                                  : "border-muted bg-background text-muted-foreground"
                              )}
                            >
                              {step.isCompleted ? (
                                <Check className="h-5 w-5" />
                              ) : (
                                <span className="text-lg">{step.icon}</span>
                              )}
                            </div>
                            <div>
                              <h3 className={cn(
                                "font-semibold transition-colors",
                                (currentStep === index || step.isCompleted) && !step.isLocked 
                                  ? "text-foreground" 
                                  : "text-muted-foreground"
                              )}>
                                {step.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                          </div>
                          <ChevronDown className={cn(
                            "h-5 w-5 transition-transform duration-200",
                            currentStep === index ? "rotate-180" : "",
                            step.isLocked && "opacity-50"
                          )} />
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className={cn("pt-0", step.isLocked && "opacity-50")}>
                        {step.isLocked ? (
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              Complete the previous steps to unlock this section.
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <>
                            {renderStepContent(index)}
                            
                            {/* Step Navigation */}
                            <div className="flex justify-between mt-6 pt-4 border-t">
                              <Button
                                variant="outline"
                                onClick={() => setCurrentStep(Math.max(0, index - 1))}
                                disabled={index === 0}
                                className="flex items-center gap-2"
                              >
                                ← Back
                              </Button>

                              {index < steps.length - 1 && (
                                <Button
                                  onClick={() => handleNext(index)}
                                  disabled={!canGoNext(index)}
                                  className="flex items-center gap-2 bg-gradient-primary hover:opacity-90 transition-opacity"
                                >
                                  Continue →
                                </Button>
                              )}

                              {index === steps.length - 1 && (
                                <Button
                                  onClick={form.handleSubmit}
                                  className="flex items-center gap-2 bg-gradient-primary hover:opacity-90 transition-opacity"
                                >
                                  Submit Order
                                </Button>
                              )}
                            </div>
                          </>
                        )}
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Preview Sidebar */}
          <div className="lg:col-span-1">
            <PricingPreview form={form} />
          </div>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Step Change</AlertDialogTitle>
            <AlertDialogDescription>
              Going back to a previous step will reset your progress from that point forward. 
              Any information you've entered in later steps will be lost. Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowResetDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmReset}>
              Continue & Reset Progress
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};