import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useFormContext } from './FormContext';
import { SERVICE_NAMES, SERVICE_PRICES } from './constants';
import { ShoppingCart, Zap, Plus } from 'lucide-react';

export const PricingPreview: React.FC = () => {
  const { formData, priceBreakdown } = useFormContext();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="sticky top-8">
      <Card className="bg-gradient-card shadow-large border-0">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Order Summary
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Selected Services */}
          {formData.selectedServices.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Selected Services
              </h4>
              {formData.selectedServices.map(serviceId => (
                <div key={serviceId} className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {SERVICE_NAMES[serviceId]}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {formatPrice(SERVICE_PRICES[serviceId])}
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {/* Add-ons */}
          {priceBreakdown.addOns.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                  <Plus className="h-3 w-3" />
                  Add-ons & Enhancements
                </h4>
                {priceBreakdown.addOns.map((addon, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {addon.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      +{formatPrice(addon.price)}
                    </Badge>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Total */}
          {priceBreakdown.total > 0 && (
            <>
              <Separator />
              <div className="bg-gradient-primary rounded-lg p-4 text-primary-foreground">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium opacity-90">Total Cost</p>
                    <p className="text-xs opacity-75">Includes all selected services</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {formatPrice(priceBreakdown.total)}
                    </p>
                    <div className="flex items-center gap-1 text-xs opacity-75">
                      <Zap className="h-3 w-3" />
                      <span>Fast delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Empty state */}
          {formData.selectedServices.length === 0 && (
            <div className="text-center py-8">
              <ShoppingCart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Select services to see pricing
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommended additions will appear here based on selections */}
      {formData.selectedServices.length > 0 && (
        <Card className="mt-4 bg-gradient-card shadow-medium border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              <Zap className="h-4 w-4 inline mr-1" />
              Recommended Additions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">
              Complete your campaign with these popular add-ons
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};