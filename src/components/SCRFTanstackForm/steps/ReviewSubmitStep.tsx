import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getServiceById } from '../constants';
import { ServiceType } from '../types';
import { FileText, Calendar, Package, CheckCircle } from 'lucide-react';

interface ReviewSubmitStepProps {
  form: any;
}

export const ReviewSubmitStep: React.FC<ReviewSubmitStepProps> = ({ form }) => {
  const formData = form.state.values;
  const selectedServices = formData.services.selectedServices || [];
  const serviceConfigs = formData.services.serviceConfigs || {};

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total: number, serviceId: ServiceType) => {
      const service = getServiceById(serviceId);
      return total + (service?.basePrice || 0);
    }, 0);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <CheckCircle className="h-6 w-6 text-primary" />
          Review & Submit
        </h2>
        <p className="text-muted-foreground">
          Review your order details and submit your content request.
        </p>
      </div>

      {/* Project Details Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Project Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Project Name</p>
            <p className="text-base">{formData.projectDetails.projectName || 'Not specified'}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground">Description</p>
            <p className="text-base">{formData.projectDetails.description || 'Not specified'}</p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Preferred Deadline</p>
              <p className="text-base">{formatDate(formData.projectDetails.deadline)}</p>
            </div>
          </div>

          {formData.projectDetails.attachments && formData.projectDetails.attachments.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Attachments</p>
              <div className="space-y-1">
                {formData.projectDetails.attachments.map((file: File, index: number) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    📎 {file.name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Selected Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedServices.length === 0 ? (
            <p className="text-muted-foreground">No services selected</p>
          ) : (
            <div className="space-y-4">
              {selectedServices.map((serviceId: ServiceType) => {
                const service = getServiceById(serviceId);
                const config = serviceConfigs[serviceId] || {};
                
                if (!service) return null;

                return (
                  <div key={serviceId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{service.icon}</span>
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {formatPrice(service.basePrice)}
                      </Badge>
                    </div>

                    {Object.keys(config).length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Configuration:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {Object.entries(config).map(([key, value]) => {
                            const configOption = service.configs?.find(c => c.id === key);
                            return (
                              <div key={key} className="text-sm">
                                <span className="font-medium">{configOption?.label || key}:</span>{' '}
                                <span className="text-muted-foreground">{value as string}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedServices.map((serviceId: ServiceType) => {
            const service = getServiceById(serviceId);
            if (!service) return null;

            return (
              <div key={serviceId} className="flex justify-between items-center">
                <span>{service.name}</span>
                <span>{formatPrice(service.basePrice)}</span>
              </div>
            );
          })}
          
          <Separator />
          
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">{formatPrice(calculateTotal())}</span>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              🎉 <strong>What happens next?</strong>
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• Our team will review your request within 2 hours</li>
              <li>• You'll receive a detailed project timeline and team assignment</li>
              <li>• We'll start working on your content immediately</li>
              <li>• Track progress in real-time through your dashboard</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};