import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFormContext } from '../FormContext';
import { SERVICES, SERVICE_NAMES } from '../constants';
import { ServiceType } from '../types';
import { CheckCircle, Upload, FileText, Video, Image, Mic } from 'lucide-react';

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

  const handleFileUpload = (serviceId: ServiceType, fileType: string, files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    const config = getServiceConfig(serviceId);
    
    updateServiceConfig(serviceId, {
      ...config,
      [fileType]: [...(config[fileType] || []), ...fileArray]
    });
  };

  const removeFile = (serviceId: ServiceType, fileType: string, index: number) => {
    const config = getServiceConfig(serviceId);
    const updatedFiles = (config[fileType] || []).filter((_: any, i: number) => i !== index);
    
    updateServiceConfig(serviceId, {
      ...config,
      [fileType]: updatedFiles
    });
  };

  const getServiceConfig = (serviceId: ServiceType) => {
    return formData.serviceConfigs[serviceId] || {};
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Choose & Configure Your Content Services</h2>
        <p className="text-muted-foreground">
          Select the services you need and customize them to match your specific requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICES.map(service => {
          const isSelected = formData.selectedServices.includes(service.id);
          
          return (
            <div key={service.id} className="space-y-4">
              <Card 
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

              {/* Configuration Section - Shows when service is selected */}
              {isSelected && (
                <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="text-xl">{service.icon}</span>
                      Configure {service.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    {service.id === 'motion-graphics' && (
                      <MotionGraphicsConfig 
                        config={getServiceConfig(service.id)}
                        updateConfig={(config) => updateServiceConfig(service.id, config)}
                        serviceId={service.id}
                        onFileUpload={(fileType, files) => handleFileUpload(service.id, fileType, files)}
                        onRemoveFile={(fileType, index) => removeFile(service.id, fileType, index)}
                      />
                    )}

                    {service.id === 'ugc-video' && (
                      <UGCVideoConfig 
                        config={getServiceConfig(service.id)}
                        updateConfig={(config) => updateServiceConfig(service.id, config)}
                        serviceId={service.id}
                        onFileUpload={(fileType, files) => handleFileUpload(service.id, fileType, files)}
                        onRemoveFile={(fileType, index) => removeFile(service.id, fileType, index)}
                      />
                    )}

                    {service.id === 'static-graphic' && (
                      <StaticGraphicConfig 
                        config={getServiceConfig(service.id)}
                        updateConfig={(config) => updateServiceConfig(service.id, config)}
                        serviceId={service.id}
                        onFileUpload={(fileType, files) => handleFileUpload(service.id, fileType, files)}
                        onRemoveFile={(fileType, index) => removeFile(service.id, fileType, index)}
                      />
                    )}

                    {service.id === 'voiceover' && (
                      <VoiceoverConfig 
                        config={getServiceConfig(service.id)}
                        updateConfig={(config) => updateServiceConfig(service.id, config)}
                        serviceId={service.id}
                        onFileUpload={(fileType, files) => handleFileUpload(service.id, fileType, files)}
                        onRemoveFile={(fileType, index) => removeFile(service.id, fileType, index)}
                      />
                    )}

                    {service.id === 'script-writing' && (
                      <ScriptWritingConfig 
                        config={getServiceConfig(service.id)}
                        updateConfig={(config) => updateServiceConfig(service.id, config)}
                        serviceId={service.id}
                        onFileUpload={(fileType, files) => handleFileUpload(service.id, fileType, files)}
                        onRemoveFile={(fileType, index) => removeFile(service.id, fileType, index)}
                      />
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
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

// Individual service configuration components
const MotionGraphicsConfig: React.FC<{
  config: any;
  updateConfig: (config: any) => void;
  serviceId: ServiceType;
  onFileUpload: (fileType: string, files: FileList | null) => void;
  onRemoveFile: (fileType: string, index: number) => void;
}> = ({ config, updateConfig, serviceId, onFileUpload, onRemoveFile }) => (
  <div className="space-y-6">
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
          <div className="ml-6 space-y-3">
            <Label className="text-sm text-muted-foreground">
              Provide your script:
            </Label>
            <Textarea 
              placeholder="Paste your script here..."
              className="min-h-[100px]"
              value={config.providedScript || ''}
              onChange={(e) => updateConfig({ providedScript: e.target.value })}
            />
            
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Or upload script file:</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => onFileUpload('scriptFiles', e.target.files)}
                  className="hidden"
                  id={`script-upload-${serviceId}`}
                />
                <Label htmlFor={`script-upload-${serviceId}`} className="cursor-pointer">
                  <FileText className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm">Upload script file</p>
                  <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, TXT</p>
                </Label>
              </div>
              
              {config.scriptFiles && config.scriptFiles.length > 0 && (
                <div className="space-y-2">
                  {config.scriptFiles.map((file: File, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveFile('scriptFiles', index)}
                        className="text-destructive hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
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

    <div className="space-y-3">
      <Label className="text-sm font-medium">Brand Assets & References</Label>
      <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.gif,.pdf,.ai,.psd"
          onChange={(e) => onFileUpload('brandAssets', e.target.files)}
          className="hidden"
          id={`brand-assets-${serviceId}`}
        />
        <Label htmlFor={`brand-assets-${serviceId}`} className="cursor-pointer">
          <Image className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm">Upload logos, brand guidelines, references</p>
          <p className="text-xs text-muted-foreground">JPG, PNG, PDF, AI, PSD</p>
        </Label>
      </div>
      
      {config.brandAssets && config.brandAssets.length > 0 && (
        <div className="space-y-2">
          {config.brandAssets.map((file: File, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span className="text-sm">{file.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFile('brandAssets', index)}
                className="text-destructive hover:text-destructive"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const UGCVideoConfig: React.FC<{
  config: any;
  updateConfig: (config: any) => void;
  serviceId: ServiceType;
  onFileUpload: (fileType: string, files: FileList | null) => void;
  onRemoveFile: (fileType: string, index: number) => void;
}> = ({ config, updateConfig, serviceId, onFileUpload, onRemoveFile }) => (
  <div className="space-y-6">
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
      
      {!config.needsScript && (
        <div className="ml-6 space-y-3">
          <Label className="text-sm text-muted-foreground">Or provide your script:</Label>
          <Textarea 
            placeholder="Paste your UGC script here..."
            className="min-h-[80px]"
            value={config.providedScript || ''}
            onChange={(e) => updateConfig({ providedScript: e.target.value })}
          />
        </div>
      )}
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

    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="overlay-animation"
          checked={config.overlayAnimation || false}
          onCheckedChange={(checked) => updateConfig({ overlayAnimation: checked })}
        />
        <Label htmlFor="overlay-animation" className="text-sm">
          Add branded animation overlay (+₦5,000)
        </Label>
      </div>
    </div>

    <div className="space-y-3">
      <Label className="text-sm font-medium">Reference Videos & Brand Assets</Label>
      <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
        <input
          type="file"
          multiple
          accept=".mp4,.mov,.avi,.jpg,.jpeg,.png,.pdf"
          onChange={(e) => onFileUpload('referenceFiles', e.target.files)}
          className="hidden"
          id={`reference-files-${serviceId}`}
        />
        <Label htmlFor={`reference-files-${serviceId}`} className="cursor-pointer">
          <Video className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm">Upload reference videos, logos, brand assets</p>
          <p className="text-xs text-muted-foreground">MP4, MOV, JPG, PNG, PDF</p>
        </Label>
      </div>
      
      {config.referenceFiles && config.referenceFiles.length > 0 && (
        <div className="space-y-2">
          {config.referenceFiles.map((file: File, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span className="text-sm">{file.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFile('referenceFiles', index)}
                className="text-destructive hover:text-destructive"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const StaticGraphicConfig: React.FC<{
  config: any;
  updateConfig: (config: any) => void;
  serviceId: ServiceType;
  onFileUpload: (fileType: string, files: FileList | null) => void;
  onRemoveFile: (fileType: string, index: number) => void;
}> = ({ config, updateConfig, serviceId, onFileUpload, onRemoveFile }) => (
  <div className="space-y-6">
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
        <div className="mt-2">
          <Label className="text-sm text-muted-foreground">Custom dimensions:</Label>
          <Input 
            placeholder="e.g., 1200x628 px"
            value={config.customDimensions || ''}
            onChange={(e) => updateConfig({ customDimensions: e.target.value })}
            className="mt-1"
          />
        </div>
      )}
    </div>

    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="extra-variations"
          checked={config.extraVariations || false}
          onCheckedChange={(checked) => updateConfig({ extraVariations: checked })}
        />
        <Label htmlFor="extra-variations" className="text-sm">
          Add extra variations (+₦2,000 each)
        </Label>
      </div>
      
      {config.extraVariations && (
        <div className="ml-6">
          <Label className="text-sm text-muted-foreground">Number of variations:</Label>
          <Select 
            value={config.variationCount || '1'} 
            onValueChange={(value) => updateConfig({ variationCount: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 variation (+₦2,000)</SelectItem>
              <SelectItem value="2">2 variations (+₦4,000)</SelectItem>
              <SelectItem value="3">3 variations (+₦6,000)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>

    <div className="space-y-3">
      <Label className="text-sm font-medium">Brand Assets & References</Label>
      <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.gif,.pdf,.ai,.psd"
          onChange={(e) => onFileUpload('designAssets', e.target.files)}
          className="hidden"
          id={`design-assets-${serviceId}`}
        />
        <Label htmlFor={`design-assets-${serviceId}`} className="cursor-pointer">
          <Image className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm">Upload logos, brand guidelines, reference designs</p>
          <p className="text-xs text-muted-foreground">JPG, PNG, PDF, AI, PSD</p>
        </Label>
      </div>
      
      {config.designAssets && config.designAssets.length > 0 && (
        <div className="space-y-2">
          {config.designAssets.map((file: File, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span className="text-sm">{file.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFile('designAssets', index)}
                className="text-destructive hover:text-destructive"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const VoiceoverConfig: React.FC<{
  config: any;
  updateConfig: (config: any) => void;
  serviceId: ServiceType;
  onFileUpload: (fileType: string, files: FileList | null) => void;
  onRemoveFile: (fileType: string, index: number) => void;
}> = ({ config, updateConfig, serviceId, onFileUpload, onRemoveFile }) => (
  <div className="space-y-6">
    <div className="space-y-3">
      <Label className="text-sm font-medium">Duration</Label>
      <RadioGroup 
        value={config.duration || '30s'} 
        onValueChange={(value) => updateConfig({ duration: value })}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="30s" id="vo-30s" />
          <Label htmlFor="vo-30s">30 seconds (₦4,000)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="60s" id="vo-60s" />
          <Label htmlFor="vo-60s">60 seconds (₦8,000)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="90s" id="vo-90s" />
          <Label htmlFor="vo-90s">90 seconds (₦12,000)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="vo-custom" />
          <Label htmlFor="vo-custom">Custom duration</Label>
        </div>
      </RadioGroup>
      
      {config.duration === 'custom' && (
        <div className="ml-6">
          <Label className="text-sm text-muted-foreground">Specify duration:</Label>
          <Input 
            placeholder="e.g., 2 minutes"
            value={config.customDuration || ''}
            onChange={(e) => updateConfig({ customDuration: e.target.value })}
            className="mt-1"
          />
        </div>
      )}
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
          <SelectItem value="male-professional">Male - Professional</SelectItem>
          <SelectItem value="female-professional">Female - Professional</SelectItem>
          <SelectItem value="male-youthful">Male - Youthful</SelectItem>
          <SelectItem value="female-youthful">Female - Youthful</SelectItem>
          <SelectItem value="male-warm">Male - Warm & Friendly</SelectItem>
          <SelectItem value="female-warm">Female - Warm & Friendly</SelectItem>
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
          Add subtitles burned into video (+₦3,000)
        </Label>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="vo-needs-script"
          checked={config.needsScript || false}
          onCheckedChange={(checked) => updateConfig({ needsScript: checked })}
        />
        <Label htmlFor="vo-needs-script" className="text-sm">
          Write me a script (+₦2,000)
        </Label>
      </div>
      
      {!config.needsScript && (
        <div className="ml-6 space-y-3">
          <Label className="text-sm text-muted-foreground">Provide your script:</Label>
          <Textarea 
            placeholder="Paste the script for voiceover here..."
            className="min-h-[80px]"
            value={config.providedScript || ''}
            onChange={(e) => updateConfig({ providedScript: e.target.value })}
          />
        </div>
      )}
    </div>

    <div className="space-y-3">
      <Label className="text-sm font-medium">Video to Voice Over (Optional)</Label>
      <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
        <input
          type="file"
          accept=".mp4,.mov,.avi"
          onChange={(e) => onFileUpload('videoFiles', e.target.files)}
          className="hidden"
          id={`video-upload-${serviceId}`}
        />
        <Label htmlFor={`video-upload-${serviceId}`} className="cursor-pointer">
          <Video className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm">Upload video that needs voiceover</p>
          <p className="text-xs text-muted-foreground">MP4, MOV, AVI</p>
        </Label>
      </div>
      
      {config.videoFiles && config.videoFiles.length > 0 && (
        <div className="space-y-2">
          {config.videoFiles.map((file: File, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span className="text-sm">{file.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFile('videoFiles', index)}
                className="text-destructive hover:text-destructive"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const ScriptWritingConfig: React.FC<{
  config: any;
  updateConfig: (config: any) => void;
  serviceId: ServiceType;
  onFileUpload: (fileType: string, files: FileList | null) => void;
  onRemoveFile: (fileType: string, index: number) => void;
}> = ({ config, updateConfig, serviceId, onFileUpload, onRemoveFile }) => (
  <div className="space-y-6">
    <div className="space-y-3">
      <Label className="text-sm font-medium">Script Type</Label>
      <Select 
        value={config.scriptType || ''} 
        onValueChange={(value) => updateConfig({ scriptType: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="What is this script for?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ugc-video">UGC Video</SelectItem>
          <SelectItem value="motion-graphic">Motion Graphics</SelectItem>
          <SelectItem value="voiceover">Voiceover</SelectItem>
          <SelectItem value="general">General Content</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-3">
      <Label className="text-sm font-medium">Target Duration</Label>
      <RadioGroup 
        value={config.targetDuration || '15s'} 
        onValueChange={(value) => updateConfig({ targetDuration: value })}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="15s" id="script-15s" />
          <Label htmlFor="script-15s">15 seconds (₦2,000)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="30s" id="script-30s" />
          <Label htmlFor="script-30s">30 seconds (₦4,000)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="60s" id="script-60s" />
          <Label htmlFor="script-60s">60 seconds (₦8,000)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="script-custom" />
          <Label htmlFor="script-custom">Custom duration</Label>
        </div>
      </RadioGroup>
      
      {config.targetDuration === 'custom' && (
        <div className="ml-6">
          <Label className="text-sm text-muted-foreground">Specify duration:</Label>
          <Input 
            placeholder="e.g., 2 minutes"
            value={config.customTargetDuration || ''}
            onChange={(e) => updateConfig({ customTargetDuration: e.target.value })}
            className="mt-1"
          />
        </div>
      )}
    </div>

    <div className="space-y-3">
      <Label className="text-sm font-medium">Brief & Requirements</Label>
      <Textarea 
        placeholder="Describe what the script should cover, the tone, key messages, call-to-action, etc..."
        className="min-h-[100px]"
        value={config.scriptBrief || ''}
        onChange={(e) => updateConfig({ scriptBrief: e.target.value })}
      />
    </div>

    <div className="space-y-3">
      <Label className="text-sm font-medium">Reference Materials (Optional)</Label>
      <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          onChange={(e) => onFileUpload('referenceFiles', e.target.files)}
          className="hidden"
          id={`script-references-${serviceId}`}
        />
        <Label htmlFor={`script-references-${serviceId}`} className="cursor-pointer">
          <FileText className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm">Upload reference materials, brand guidelines</p>
          <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, TXT, JPG, PNG</p>
        </Label>
      </div>
      
      {config.referenceFiles && config.referenceFiles.length > 0 && (
        <div className="space-y-2">
          {config.referenceFiles.map((file: File, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm">{file.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFile('referenceFiles', index)}
                className="text-destructive hover:text-destructive"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);