import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getServiceById } from './constants';
import { ServiceType } from './types';
import { ShoppingCart, Star } from 'lucide-react';

interface PricingPreviewProps {
  form: any;
}

export const PricingPreview: React.FC<PricingPreviewProps> = ({ form }) => {
  const formData = form.state.values;
  const selectedServices = formData.services?.selectedServices || [];

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total: number, serviceId: ServiceType) => {
      const service = getServiceById(serviceId);
      return total + (service?.basePrice || 0);
    }, 0);
  };

  const total = calculateTotal();

  return (
    <div className="space-y-6 sticky top-6">
      {/* Order Summary */}
      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Order Summary
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {selectedServices.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No services selected yet</p>
              <p className="text-xs">Choose services to see pricing</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {selectedServices.map((serviceId: ServiceType) => {
                  const service = getServiceById(serviceId);
                  if (!service) return null;

                  return (
                    <div key={serviceId} className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{service.icon}</span>
                        <div>
                          <p className="font-medium text-sm">{service.name}</p>
                          <p className="text-xs text-muted-foreground">Base service</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="font-medium">
                        {formatPrice(service.basePrice)}
                      </Badge>
                    </div>
                  );
                })}
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="font-semibold">Subtotal</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
              
              <div className="bg-primary/10 p-3 rounded-lg">
                <p className="text-xs text-primary font-medium">
                  ✨ Fast Track Available
                </p>
                <p className="text-xs text-muted-foreground">
                  Rush delivery in 24-48 hours (+50%)
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Value Proposition */}
      {selectedServices.length > 0 && (
        <Card className="bg-gradient-secondary shadow-medium border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-secondary-foreground">
              <Star className="h-5 w-5" />
              Included Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-secondary-foreground">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span>Professional quality guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span>Unlimited revisions until perfect</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span>Dedicated project manager</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span>Real-time progress tracking</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span>All source files included</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <p className="text-sm font-medium mb-2">Need help choosing?</p>
          <p className="text-xs text-muted-foreground mb-3">
            Our experts can recommend the perfect content mix for your goals.
          </p>
          <button className="text-xs text-primary hover:underline">
            Chat with our team →
          </button>
        </CardContent>
      </Card>
    </div>
  );
};