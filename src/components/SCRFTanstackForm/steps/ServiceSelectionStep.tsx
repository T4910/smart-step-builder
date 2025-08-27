import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { SERVICES, getServiceById } from '../constants';
import { ServiceType } from '../types';
import { cn } from '@/lib/utils';

interface ServiceSelectionStepProps {
  form: any;
}

export const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({ form }) => {
  const selectedServices = form.getFieldValue('services.selectedServices') || [];
  const serviceConfigs = form.getFieldValue('services.serviceConfigs') || {};

  const toggleService = (serviceId: ServiceType) => {
    const current = selectedServices;
    const isSelected = current.includes(serviceId);
    
    if (isSelected) {
      // Remove service and its config
      const newSelected = current.filter((id: ServiceType) => id !== serviceId);
      const newConfigs = { ...serviceConfigs };
      delete newConfigs[serviceId];
      
      form.setFieldValue('services.selectedServices', newSelected);
      form.setFieldValue('services.serviceConfigs', newConfigs);
    } else {
      // Add service
      form.setFieldValue('services.selectedServices', [...current, serviceId]);
    }
  };

  const updateServiceConfig = (serviceId: ServiceType, configId: string, value: any) => {
    const newConfigs = {
      ...serviceConfigs,
      [serviceId]: {
        ...serviceConfigs[serviceId],
        [configId]: value
      }
    };
    form.setFieldValue('services.serviceConfigs', newConfigs);
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Select & Configure Services</h2>
        <p className="text-muted-foreground">
          Choose the content services you need and customize them to your requirements.
        </p>
      </div>

      {/* Service Selection - Single Column Layout */}
      <div className="space-y-4">
        {SERVICES.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          
          return (
            <Card key={service.id} className={cn(
              "transition-all duration-200 cursor-pointer hover:shadow-medium",
              isSelected ? "border-primary bg-primary/5 shadow-medium" : "hover:border-primary/50"
            )}>
              <CardHeader 
                className="pb-4"
                onClick={() => toggleService(service.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{service.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={isSelected ? "default" : "outline"}>
                      {formatPrice(service.basePrice)}
                    </Badge>
                    <Checkbox 
                      checked={isSelected}
                      onChange={() => toggleService(service.id)}
                    />
                  </div>
                </div>
              </CardHeader>

              {/* Configuration Options */}
              {isSelected && service.configs && (
                <CardContent className="pt-0 border-t bg-background/50">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Configuration Options</h4>
                    <div className="grid gap-4">
                      {service.configs.map((config) => (
                        <div key={config.id} className="space-y-2">
                          <Label className="text-sm font-medium">{config.label}</Label>
                          {config.type === 'select' && (
                            <Select
                              value={serviceConfigs[service.id]?.[config.id] || config.defaultValue}
                              onValueChange={(value) => updateServiceConfig(service.id, config.id, value)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={`Select ${config.label.toLowerCase()}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {config.options?.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {selectedServices.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Select at least one service to continue</p>
        </div>
      )}
    </div>
  );
};