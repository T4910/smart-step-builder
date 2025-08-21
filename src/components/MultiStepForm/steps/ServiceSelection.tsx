import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useFormContext } from '../FormContext';
import { SERVICES } from '../constants';
import { ServiceType } from '../types';
import { CheckCircle } from 'lucide-react';

export const ServiceSelection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();

  const handleServiceToggle = (serviceId: ServiceType, checked: boolean) => {
    const updatedServices = checked
      ? [...formData.selectedServices, serviceId]
      : formData.selectedServices.filter(id => id !== serviceId);

    updateFormData({
      selectedServices: updatedServices,
      // Clear configs for deselected services
      serviceConfigs: Object.fromEntries(
        Object.entries(formData.serviceConfigs).filter(([key]) => 
          updatedServices.includes(key as ServiceType)
        )
      )
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Choose Your Content Services</h2>
        <p className="text-muted-foreground">
          Select the services you need. You can customize each service in the next step.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICES.map(service => {
          const isSelected = formData.selectedServices.includes(service.id);
          
          return (
            <Card 
              key={service.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-glow ${
                isSelected 
                  ? 'ring-2 ring-primary bg-gradient-card shadow-glow' 
                  : 'hover:shadow-medium'
              }`}
              onClick={() => handleServiceToggle(service.id, !isSelected)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{service.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                      <Badge variant="outline" className="text-xs mt-1">
                        {formatPrice(service.basePrice)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      checked={isSelected}
                      onChange={() => {}} // Handled by card click
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    {isSelected && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {formData.selectedServices.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-card rounded-lg border">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Selected Services ({formData.selectedServices.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {formData.selectedServices.map(serviceId => {
              const service = SERVICES.find(s => s.id === serviceId);
              return service ? (
                <Badge key={serviceId} variant="secondary" className="text-xs">
                  {service.name}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};