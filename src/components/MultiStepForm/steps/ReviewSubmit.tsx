import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useFormContext } from '../FormContext';
import { SERVICE_NAMES } from '../constants';
import { CheckCircle, FileText, Calendar, Upload, Zap, CreditCard, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ReviewSubmit: React.FC = () => {
  const { formData, priceBreakdown } = useFormContext();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleSubmit = () => {
    // Here you would typically send the form data to your backend
    console.log('Form Data:', formData);
    console.log('Price Breakdown:', priceBreakdown);
    
    toast({
      title: "Order Submitted Successfully!",
      description: "We'll review your request and get back to you within 2 hours.",
    });
  };

  const isFormValid = () => {
    return (
      formData.selectedServices.length > 0 &&
      formData.finalDetails.projectName.trim() !== '' &&
      formData.finalDetails.description.trim() !== ''
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <CheckCircle className="h-6 w-6 text-success" />
          Review Your Order
        </h2>
        <p className="text-muted-foreground">
          Please review all details before submitting your content request.
        </p>
      </div>

      {/* Services Summary */}
      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Selected Services ({formData.selectedServices.length})
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {formData.selectedServices.map(serviceId => {
            const config = formData.serviceConfigs[serviceId] || {};
            
            return (
              <div key={serviceId} className="border rounded-lg p-4 bg-background/50">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-lg">
                    {serviceId === 'motion-graphics' && '🎬'}
                    {serviceId === 'ugc-video' && '📱'}
                    {serviceId === 'static-graphic' && '🎨'}
                    {serviceId === 'voiceover' && '🎤'}
                    {serviceId === 'script-writing' && '✍️'}
                  </span>
                  {SERVICE_NAMES[serviceId]}
                </h4>
                
                <div className="space-y-2 text-sm">
                  {/* Motion Graphics Config */}
                  {serviceId === 'motion-graphics' && (
                    <>
                      {config.needsScript && <Badge variant="outline">Script Writing Included</Badge>}
                      {config.needsVoiceover && <Badge variant="outline">Voiceover Included</Badge>}
                      {config.addThumbnails && <Badge variant="outline">Thumbnails Included</Badge>}
                      {!config.needsScript && config.providedScript && (
                        <p className="text-muted-foreground">Custom script provided</p>
                      )}
                    </>
                  )}
                  
                  {/* UGC Video Config */}
                  {serviceId === 'ugc-video' && (
                    <>
                      <Badge variant="outline">Duration: {config.duration || '20s'}</Badge>
                      {config.needsScript && <Badge variant="outline">Script Writing Included</Badge>}
                      {config.needsVoiceover && <Badge variant="outline">Voiceover Included</Badge>}
                    </>
                  )}
                  
                  {/* Static Graphic Config */}
                  {serviceId === 'static-graphic' && (
                    <>
                      {config.format && <Badge variant="outline">Format: {config.format}</Badge>}
                      {config.extraVariations > 0 && (
                        <Badge variant="outline">{config.extraVariations} Extra Variations</Badge>
                      )}
                    </>
                  )}
                  
                  {/* Voiceover Config */}
                  {serviceId === 'voiceover' && (
                    <>
                      <Badge variant="outline">Duration: {config.duration || '30s'}</Badge>
                      {config.voiceStyle && <Badge variant="outline">Style: {config.voiceStyle}</Badge>}
                      {config.addSubtitles && <Badge variant="outline">Subtitles Included</Badge>}
                    </>
                  )}
                  
                  {/* Script Writing Config */}
                  {serviceId === 'script-writing' && (
                    <>
                      {config.purpose && <Badge variant="outline">For: {config.purpose}</Badge>}
                      {config.targetDuration && <Badge variant="outline">Duration: {config.targetDuration}</Badge>}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Project Details Summary */}
      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Project Details
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-1">Project Name</h4>
            <p className="text-muted-foreground">{formData.finalDetails.projectName || 'Not specified'}</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-1">Description</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {formData.finalDetails.description || 'No description provided'}
            </p>
          </div>
          
          {formData.finalDetails.deadline && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Preferred Deadline: {new Date(formData.finalDetails.deadline).toLocaleDateString()}
              </span>
            </div>
          )}
          
          {formData.finalDetails.attachments.length > 0 && (
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {formData.finalDetails.attachments.length} file(s) uploaded
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Price Summary */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-large border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Order Total
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="opacity-90">Base Services</span>
              <span className="font-semibold">{formatPrice(priceBreakdown.basePrice)}</span>
            </div>
            
            {priceBreakdown.addOns.map((addon, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="opacity-75">{addon.name}</span>
                <span>+{formatPrice(addon.price)}</span>
              </div>
            ))}
          </div>
          
          <Separator className="bg-primary-foreground/20" />
          
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(priceBreakdown.total)}</span>
          </div>
          
          <p className="text-xs opacity-75 text-center">
            Final pricing will be confirmed after project review
          </p>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex flex-col gap-4">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid()}
          size="lg"
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
        >
          <Send className="h-5 w-5 mr-2" />
          Submit Content Request
        </Button>
        
        {!isFormValid() && (
          <p className="text-sm text-destructive text-center">
            Please fill in all required fields before submitting.
          </p>
        )}
        
        <p className="text-xs text-muted-foreground text-center">
          By submitting this request, you agree to our terms of service and understand that 
          final pricing may be adjusted based on project complexity.
        </p>
      </div>
    </div>
  );
};