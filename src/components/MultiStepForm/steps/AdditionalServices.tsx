import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormContext } from '../FormContext';
import { Zap, Plus, TrendingUp } from 'lucide-react';

interface UpsellOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  popular?: boolean;
}

export const AdditionalServices: React.FC = () => {
  const { formData, updateFormData } = useFormContext();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Generate smart upsells based on selected services
  const getRecommendedUpsells = (): UpsellOption[] => {
    const upsells: UpsellOption[] = [];
    
    // Motion Graphics upsells
    if (formData.selectedServices.includes('motion-graphics')) {
      const mgConfig = formData.serviceConfigs['motion-graphics'] || {};
      
      if (!mgConfig.needsScript) {
        upsells.push({
          id: 'mg-script',
          name: 'Add Script Writing',
          description: 'Professional copywriting for your motion graphics',
          price: 2000,
          icon: '✍️',
          popular: true
        });
      }
      
      if (!mgConfig.needsVoiceover) {
        upsells.push({
          id: 'mg-voiceover',
          name: 'Add Professional Voiceover',
          description: 'Bring your animation to life with voice',
          price: 4000,
          icon: '🎤'
        });
      }

      if (mgConfig.needsVoiceover && !mgConfig.syncVoiceoverAnimation) {
        upsells.push({
          id: 'sync-vo-animation',
          name: 'Sync Voiceover with Animation',
          description: 'Perfect timing between voice and visuals',
          price: 2000,
          icon: '🎵'
        });
      }
    }

    // UGC Video upsells
    if (formData.selectedServices.includes('ugc-video')) {
      const ugcConfig = formData.serviceConfigs['ugc-video'] || {};
      
      if (formData.selectedServices.includes('motion-graphics') && !ugcConfig.overlayAnimation) {
        upsells.push({
          id: 'ugc-overlay',
          name: 'Branded Animation Overlay',
          description: 'Combine UGC with branded animations',
          price: 5000,
          icon: '🎬',
          popular: true
        });
      }

      if (ugcConfig.duration === '20s') {
        upsells.push({
          id: 'extend-ugc',
          name: 'Extend to 40 seconds',
          description: 'More time to tell your story',
          price: 10000,
          icon: '⏱️'
        });
      }
    }

    // Static Graphic upsells
    if (formData.selectedServices.includes('static-graphic')) {
      const sgConfig = formData.serviceConfigs['static-graphic'] || {};
      
      if (!sgConfig.animateGraphic) {
        upsells.push({
          id: 'animate-static',
          name: 'Turn Static into Animation',
          description: 'Simple animation for your static design',
          price: 5000,
          icon: '🎭'
        });
      }

      if (!sgConfig.extraVariations || sgConfig.extraVariations < 3) {
        upsells.push({
          id: 'more-variations',
          name: 'Add 3 More Variations',
          description: 'More options for different platforms',
          price: 6000,
          icon: '🎨'
        });
      }
    }

    // Cross-service upsells
    if (formData.selectedServices.includes('voiceover') && 
        !formData.selectedServices.includes('script-writing')) {
      upsells.push({
        id: 'vo-script',
        name: 'Professional Script for Voiceover',
        description: 'Expert copywriting optimized for voice delivery',
        price: 2000,
        icon: '📝',
        popular: true
      });
    }

    // General upsells
    upsells.push(
      {
        id: 'rush-delivery',
        name: '24-Hour Rush Delivery',
        description: 'Get your content delivered in 24 hours',
        price: 15000,
        icon: '⚡'
      },
      {
        id: 'social-media-pack',
        name: 'Social Media Optimization Pack',
        description: 'Versions optimized for all major platforms',
        price: 8000,
        icon: '📱'
      },
      {
        id: 'brand-guidelines',
        name: 'Brand Guidelines Consultation',
        description: 'Expert advice on brand consistency',
        price: 12000,
        icon: '🎯'
      }
    );

    return upsells;
  };

  const recommendedUpsells = getRecommendedUpsells();

  const handleUpsellToggle = (upsellId: string, checked: boolean) => {
    const updatedUpsells = checked
      ? [...formData.additionalServices, upsellId]
      : formData.additionalServices.filter(id => id !== upsellId);

    updateFormData({ additionalServices: updatedUpsells });
  };

  if (formData.selectedServices.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Please select services in the first step to see recommended additions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          Boost Your Order
        </h2>
        <p className="text-muted-foreground">
          Complete your campaign with these recommended additions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendedUpsells.map(upsell => {
          const isSelected = formData.additionalServices.includes(upsell.id);
          
          return (
            <Card 
              key={upsell.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-glow relative ${
                isSelected 
                  ? 'ring-2 ring-primary bg-gradient-card shadow-glow' 
                  : 'hover:shadow-medium'
              }`}
              onClick={() => handleUpsellToggle(upsell.id, !isSelected)}
            >
              {upsell.popular && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-warning text-warning-foreground shadow-medium">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{upsell.icon}</span>
                    <span>{upsell.name}</span>
                  </div>
                  <Checkbox 
                    checked={isSelected}
                    onChange={() => {}} // Handled by card click
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {upsell.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs font-semibold">
                    +{formatPrice(upsell.price)}
                  </Badge>
                  
                  {isSelected && (
                    <Badge className="bg-success text-success-foreground text-xs">
                      Added
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {formData.additionalServices.length > 0 && (
        <Card className="bg-gradient-card shadow-medium border-0 mt-6">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary" />
              Selected Add-ons ({formData.additionalServices.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {formData.additionalServices.map(upsellId => {
                const upsell = recommendedUpsells.find(u => u.id === upsellId);
                return upsell ? (
                  <Badge key={upsellId} variant="secondary" className="text-xs">
                    {upsell.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};