import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from '../FormContext';
import { SERVICE_NAMES } from '../constants';
import { ServiceType } from '../types';

export const ServiceConfiguration: React.FC = () => {
  const { formData, updateFormData } = useFormContext();

  const updateServiceConfig = (serviceId: ServiceType, config: any) => {
    updateFormData({
      serviceConfigs: {
        ...formData.serviceConfigs,
        [serviceId]: {
          ...formData.serviceConfigs[serviceId],
          ...config
        }
      }
    });
  };

  const getServiceConfig = (serviceId: ServiceType) => {
    return formData.serviceConfigs[serviceId] || {};
  };

  if (formData.selectedServices.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Please select services in the previous step to configure them.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Configure Your Services</h2>
        <p className="text-muted-foreground">
          Customize each service to match your specific needs.
        </p>
      </div>

      {formData.selectedServices.map(serviceId => (
        <Card key={serviceId} className="bg-gradient-card shadow-medium border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">
                {serviceId === 'motion-graphics' && '🎬'}
                {serviceId === 'ugc-video' && '📱'}
                {serviceId === 'static-graphic' && '🎨'}
                {serviceId === 'voiceover' && '🎤'}
                {serviceId === 'script-writing' && '✍️'}
              </span>
              {SERVICE_NAMES[serviceId]}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Motion Graphics Configuration */}
            {serviceId === 'motion-graphics' && (
              <MotionGraphicsConfig 
                config={getServiceConfig(serviceId)}
                updateConfig={(config) => updateServiceConfig(serviceId, config)}
              />
            )}

            {/* UGC Video Configuration */}
            {serviceId === 'ugc-video' && (
              <UGCVideoConfig 
                config={getServiceConfig(serviceId)}
                updateConfig={(config) => updateServiceConfig(serviceId, config)}
              />
            )}

            {/* Static Graphic Configuration */}
            {serviceId === 'static-graphic' && (
              <StaticGraphicConfig 
                config={getServiceConfig(serviceId)}
                updateConfig={(config) => updateServiceConfig(serviceId, config)}
              />
            )}

            {/* Voiceover Configuration */}
            {serviceId === 'voiceover' && (
              <VoiceoverConfig 
                config={getServiceConfig(serviceId)}
                updateConfig={(config) => updateServiceConfig(serviceId, config)}
              />
            )}

            {/* Script Writing Configuration */}
            {serviceId === 'script-writing' && (
              <ScriptWritingConfig 
                config={getServiceConfig(serviceId)}
                updateConfig={(config) => updateServiceConfig(serviceId, config)}
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Individual service configuration components
const MotionGraphicsConfig: React.FC<{
  config: any;
  updateConfig: (config: any) => void;
}> = ({ config, updateConfig }) => (
  <div className="space-y-4">
    <div className="space-y-3">
      <Label className="text-sm font-medium">Script Requirements</Label>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="needs-script"
            checked={config.needsScript || false}
            onCheckedChange={(checked) => updateConfig({ needsScript: checked })}
          />
          <Label htmlFor="needs-script" className="text-sm">
            Yes, write me a script (+₦2,000)
          </Label>
        </div>
        
        {!config.needsScript && (
          <div className="ml-6">
            <Label htmlFor="script-upload" className="text-sm text-muted-foreground">
              Upload or paste your script:
            </Label>
            <Textarea 
              id="script-upload"
              placeholder="Paste your script here or upload a file..."
              className="mt-1"
              value={config.providedScript || ''}
              onChange={(e) => updateConfig({ providedScript: e.target.value })}
            />
          </div>
        )}
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="needs-voiceover"
          checked={config.needsVoiceover || false}
          onCheckedChange={(checked) => updateConfig({ needsVoiceover: checked })}
        />
        <Label htmlFor="needs-voiceover" className="text-sm">
          Add voiceover (+₦4,000 for 30s)
        </Label>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="add-thumbnails"
          checked={config.addThumbnails || false}
          onCheckedChange={(checked) => updateConfig({ addThumbnails: checked })}
        />
        <Label htmlFor="add-thumbnails" className="text-sm">
          Add static thumbnails (+₦3,000)
        </Label>
      </div>
    </div>
  </div>
);

const UGCVideoConfig: React.FC<{
  config: any;
  updateConfig: (config: any) => void;
}> = ({ config, updateConfig }) => (
  <div className="space-y-4">
    <div className="space-y-3">
      <Label className="text-sm font-medium">Video Duration</Label>
      <RadioGroup 
        value={config.duration || '20s'} 
        onValueChange={(value) => updateConfig({ duration: value })}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="20s" id="20s" />
          <Label htmlFor="20s">20 seconds (₦10,000)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="40s" id="40s" />
          <Label htmlFor="40s">40 seconds (₦20,000)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="60s" id="60s" />
          <Label htmlFor="60s">60 seconds (₦30,000)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1:20" id="80s" />
          <Label htmlFor="80s">1:20 minutes (₦40,000)</Label>
        </div>
      </RadioGroup>
    </div>

    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="ugc-needs-script"
          checked={config.needsScript || false}
          onCheckedChange={(checked) => updateConfig({ needsScript: checked })}
        />
        <Label htmlFor="ugc-needs-script" className="text-sm">
          Write me a script (+₦2,000 per 15s block)
        </Label>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="ugc-needs-voiceover"
          checked={config.needsVoiceover || false}
          onCheckedChange={(checked) => updateConfig({ needsVoiceover: checked })}
        />
        <Label htmlFor="ugc-needs-voiceover" className="text-sm">
          Add voiceover (+₦4,000 per 30s)
        </Label>
      </div>
    </div>
  </div>
);

const StaticGraphicConfig: React.FC<{
  config: any;
  updateConfig: (config: any) => void;
}> = ({ config, updateConfig }) => (
  <div className="space-y-4">
    <div className="space-y-3">
      <Label className="text-sm font-medium">Format</Label>
      <Select 
        value={config.format || ''} 
        onValueChange={(value) => updateConfig({ format: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="instagram-post">Instagram Post</SelectItem>
          <SelectItem value="instagram-story">Instagram Story</SelectItem>
          <SelectItem value="facebook-ad">Facebook Ad</SelectItem>
          <SelectItem value="banner">Web Banner</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
      
      {config.format === 'custom' && (
        <Input 
          placeholder="Enter custom dimensions (e.g., 1200x800)"
          value={config.customDimensions || ''}
          onChange={(e) => updateConfig({ customDimensions: e.target.value })}
        />
      )}
    </div>

    <div className="space-y-3">
      <Label className="text-sm font-medium">Extra Variations</Label>
      <Input 
        type="number"
        min="0"
        max="10"
        placeholder="Number of variations (+₦2,000 each)"
        value={config.extraVariations || ''}
        onChange={(e) => updateConfig({ extraVariations: parseInt(e.target.value) || 0 })}
      />
    </div>
  </div>
);

const VoiceoverConfig: React.FC<{
  config: any;
  updateConfig: (config: any) => void;
}> = ({ config, updateConfig }) => (
  <div className="space-y-4">
    <div className="space-y-3">
      <Label className="text-sm font-medium">Duration</Label>
      <RadioGroup 
        value={config.duration || '30s'} 
        onValueChange={(value) => updateConfig({ duration: value })}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="30s" id="vo-30s" />
          <Label htmlFor="vo-30s">≤30 seconds (₦4,000)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="60s" id="vo-60s" />
          <Label htmlFor="vo-60s">≤60 seconds (+₦4,000)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="90s" id="vo-90s" />
          <Label htmlFor="vo-90s">≤90 seconds (+₦8,000)</Label>
        </div>
      </RadioGroup>
    </div>

    <div className="space-y-3">
      <Label className="text-sm font-medium">Voice Style</Label>
      <Select 
        value={config.voiceStyle || ''} 
        onValueChange={(value) => updateConfig({ voiceStyle: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select voice style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="youthful">Youthful</SelectItem>
          <SelectItem value="formal">Formal</SelectItem>
          <SelectItem value="fun">Fun</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="add-subtitles"
          checked={config.addSubtitles || false}
          onCheckedChange={(checked) => updateConfig({ addSubtitles: checked })}
        />
        <Label htmlFor="add-subtitles" className="text-sm">
          Burn subtitles into video (+₦3,000)
        </Label>
      </div>
    </div>
  </div>
);

const ScriptWritingConfig: React.FC<{
  config: any;
  updateConfig: (config: any) => void;
}> = ({ config, updateConfig }) => (
  <div className="space-y-4">
    <div className="space-y-3">
      <Label className="text-sm font-medium">Script Purpose</Label>
      <Select 
        value={config.purpose || ''} 
        onValueChange={(value) => updateConfig({ purpose: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="What is this script for?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ugc-video">UGC Video</SelectItem>
          <SelectItem value="motion-graphic">Motion Graphic</SelectItem>
          <SelectItem value="voiceover">Voiceover</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-3">
      <Label className="text-sm font-medium">Target Duration</Label>
      <Input 
        placeholder="e.g., 30s, 1 minute"
        value={config.targetDuration || ''}
        onChange={(e) => updateConfig({ targetDuration: e.target.value })}
      />
    </div>

    <div className="space-y-3">
      <Label className="text-sm font-medium">Additional Requirements</Label>
      <Textarea 
        placeholder="Any specific tone, style, or messaging requirements..."
        value={config.requirements || ''}
        onChange={(e) => updateConfig({ requirements: e.target.value })}
      />
    </div>
  </div>
);