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

    </div>
  );
};