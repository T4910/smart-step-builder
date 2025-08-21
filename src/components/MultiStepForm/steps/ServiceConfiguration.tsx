import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useFormContext } from '../FormContext';
import { SERVICE_NAMES } from '../constants';
import { ServiceType } from '../types';
import { Upload, FileText, Video, Image } from 'lucide-react';

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
                serviceId={serviceId}
                onFileUpload={(fileType, files) => handleFileUpload(serviceId, fileType, files)}
                onRemoveFile={(fileType, index) => removeFile(serviceId, fileType, index)}
              />
            )}

            {/* UGC Video Configuration */}
            {serviceId === 'ugc-video' && (
              <UGCVideoConfig 
                config={getServiceConfig(serviceId)}
                updateConfig={(config) => updateServiceConfig(serviceId, config)}
                serviceId={serviceId}
                onFileUpload={(fileType, files) => handleFileUpload(serviceId, fileType, files)}
                onRemoveFile={(fileType, index) => removeFile(serviceId, fileType, index)}
              />
            )}

            {/* Static Graphic Configuration */}
            {serviceId === 'static-graphic' && (
              <StaticGraphicConfig 
                config={getServiceConfig(serviceId)}
                updateConfig={(config) => updateServiceConfig(serviceId, config)}
                serviceId={serviceId}
                onFileUpload={(fileType, files) => handleFileUpload(serviceId, fileType, files)}
                onRemoveFile={(fileType, index) => removeFile(serviceId, fileType, index)}
              />
            )}

            {/* Voiceover Configuration */}
            {serviceId === 'voiceover' && (
              <VoiceoverConfig 
                config={getServiceConfig(serviceId)}
                updateConfig={(config) => updateServiceConfig(serviceId, config)}
                serviceId={serviceId}
                onFileUpload={(fileType, files) => handleFileUpload(serviceId, fileType, files)}
                onRemoveFile={(fileType, index) => removeFile(serviceId, fileType, index)}
              />
            )}

            {/* Script Writing Configuration */}
            {serviceId === 'script-writing' && (
              <ScriptWritingConfig 
                config={getServiceConfig(serviceId)}
                updateConfig={(config) => updateServiceConfig(serviceId, config)}
                serviceId={serviceId}
                onFileUpload={(fileType, files) => handleFileUpload(serviceId, fileType, files)}
                onRemoveFile={(fileType, index) => removeFile(serviceId, fileType, index)}
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

    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="animate-graphic"
          checked={config.animateGraphic || false}
          onCheckedChange={(checked) => updateConfig({ animateGraphic: checked })}
        />
        <Label htmlFor="animate-graphic" className="text-sm">
          Add simple animation (+₦5,000)
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
          onChange={(e) => onFileUpload('designAssets', e.target.files)}
          className="hidden"
          id={`design-assets-${serviceId}`}
        />
        <Label htmlFor={`design-assets-${serviceId}`} className="cursor-pointer">
          <Image className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm">Upload logos, brand guidelines, reference images</p>
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

    <div className="space-y-3">
      <Label className="text-sm font-medium">Video to Voice Over</Label>
      <p className="text-xs text-muted-foreground mb-3">
        Upload the video that needs voiceover, or provide a script if this is audio-only.
      </p>
      
      <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
        <input
          type="file"
          accept=".mp4,.mov,.avi"
          onChange={(e) => onFileUpload('videoFile', e.target.files)}
          className="hidden"
          id={`video-upload-${serviceId}`}
        />
        <Label htmlFor={`video-upload-${serviceId}`} className="cursor-pointer">
          <Video className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm">Upload video file</p>
          <p className="text-xs text-muted-foreground">MP4, MOV, AVI</p>
        </Label>
      </div>
      
      {config.videoFile && config.videoFile.length > 0 && (
        <div className="space-y-2">
          {config.videoFile.map((file: File, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span className="text-sm">{file.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFile('videoFile', index)}
                className="text-destructive hover:text-destructive"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="space-y-3">
      <Label className="text-sm font-medium">Script (if no video uploaded)</Label>
      <Textarea 
        placeholder="Paste the script for voiceover here..."
        className="min-h-[100px]"
        value={config.script || ''}
        onChange={(e) => updateConfig({ script: e.target.value })}
      />
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

    <div className="space-y-3">
      <Label className="text-sm font-medium">Reference Materials</Label>
      <p className="text-xs text-muted-foreground mb-3">
        Upload any reference materials, brand guidelines, or existing content that should inform the script.
      </p>
      
      <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov"
          onChange={(e) => onFileUpload('referenceFiles', e.target.files)}
          className="hidden"
          id={`script-reference-${serviceId}`}
        />
        <Label htmlFor={`script-reference-${serviceId}`} className="cursor-pointer">
          <FileText className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm">Upload reference materials</p>
          <p className="text-xs text-muted-foreground">PDF, DOC, JPG, PNG, MP4, MOV</p>
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