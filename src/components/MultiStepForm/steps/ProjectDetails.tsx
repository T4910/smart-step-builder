import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useFormContext } from '../FormContext';
import { Upload, Calendar, FileText, AlertCircle } from 'lucide-react';

export const ProjectDetails: React.FC = () => {
  const { formData, updateFormData } = useFormContext();

  const updateFinalDetails = (details: Partial<typeof formData.finalDetails>) => {
    updateFormData({
      finalDetails: {
        ...formData.finalDetails,
        ...details
      }
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    updateFinalDetails({
      attachments: [...formData.finalDetails.attachments, ...files]
    });
  };

  const removeFile = (index: number) => {
    const updatedFiles = formData.finalDetails.attachments.filter((_, i) => i !== index);
    updateFinalDetails({ attachments: updatedFiles });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Project Details
        </h2>
        <p className="text-muted-foreground">
          Provide final details about your project to ensure we deliver exactly what you need.
        </p>
      </div>

      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="project-name" className="text-sm font-medium">
              Project Name *
            </Label>
            <Input
              id="project-name"
              placeholder="Give your project a memorable name"
              value={formData.finalDetails.projectName}
              onChange={(e) => updateFinalDetails({ projectName: e.target.value })}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Project Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your project goals, target audience, key messages, brand guidelines, and any specific requirements..."
              value={formData.finalDetails.description}
              onChange={(e) => updateFinalDetails({ description: e.target.value })}
              rows={6}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Include details about your brand, target audience, style preferences, and any specific requirements.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-sm font-medium flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Preferred Deadline
            </Label>
            <Input
              id="deadline"
              type="date"
              value={formData.finalDetails.deadline}
              onChange={(e) => updateFinalDetails({ deadline: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Standard delivery is 3-5 business days. Rush delivery available for additional cost.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Supporting Materials
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">
                Upload Files (Optional)
              </Label>
              <p className="text-xs text-muted-foreground mb-3">
                Upload brand assets, reference materials, logos, scripts, or any other supporting files.
              </p>
              
              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.mov,.ai,.psd"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Click to upload files</p>
                  <p className="text-xs text-muted-foreground">
                    Supports: PDF, DOC, JPG, PNG, MP4, AI, PSD (Max 50MB each)
                  </p>
                </Label>
              </div>
            </div>

            {formData.finalDetails.attachments.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Uploaded Files</Label>
                <div className="space-y-2">
                  {formData.finalDetails.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(file.size / 1024 / 1024).toFixed(1)}MB)
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-muted/30 rounded-lg p-4 border border-warning/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm mb-1">Important Notes</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• All uploaded materials should be high-quality and final versions</li>
                  <li>• Scripts should be provided if you selected "I'll provide one" in service configuration</li>
                  <li>• Brand guidelines help us maintain consistency across all deliverables</li>
                  <li>• Reference materials help us understand your vision and style preferences</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};