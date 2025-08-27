import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, Calendar, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectDetailsStepProps {
  form: any;
}

export const ProjectDetailsStep: React.FC<ProjectDetailsStepProps> = ({ form }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const currentFiles = form.getFieldValue('projectDetails.attachments') || [];
    form.setFieldValue('projectDetails.attachments', [...currentFiles, ...files]);
  };

  const removeFile = (index: number) => {
    const currentFiles = form.getFieldValue('projectDetails.attachments') || [];
    const updatedFiles = currentFiles.filter((_: File, i: number) => i !== index);
    form.setFieldValue('projectDetails.attachments', updatedFiles);
  };

  // Get disabled dates (next 5 days including weekends)
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 6); // 5 days + 1 to start from 6th day
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Project Details
        </h2>
        <p className="text-muted-foreground">
          Provide details about your project to ensure we deliver exactly what you need.
        </p>
      </div>

      <div className="space-y-6">
        <form.Field
          name="projectDetails.projectName"
          children={(field: any) => (
            <div className="space-y-2">
              <Label htmlFor="project-name" className="text-sm font-medium">
                Project Name *
              </Label>
              <Input
                id="project-name"
                placeholder="Give your project a memorable name"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full"
              />
            </div>
          )}
        />

        <form.Field
          name="projectDetails.description"
          children={(field: any) => (
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Project Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your project goals, target audience, key messages, brand guidelines, and any specific requirements..."
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                rows={6}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Include details about your brand, target audience, style preferences, and any specific requirements.
              </p>
            </div>
          )}
        />

        <form.Field
          name="projectDetails.deadline"
          children={(field: any) => (
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-sm font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Preferred Deadline
              </Label>
              <Input
                id="deadline"
                type="date"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                min={getMinDate()}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Standard delivery is 3-5 business days. Next 5 days are disabled for proper planning.
              </p>
            </div>
          )}
        />

        <form.Field
          name="projectDetails.attachments"
          children={(field: any) => (
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Upload className="h-4 w-4" />
                Reference Materials (Optional)
              </Label>
              
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, PDF, DOC up to 10MB each
                  </p>
                </label>
              </div>

              {field.state.value && field.state.value.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Uploaded Files:</Label>
                  <div className="space-y-2">
                    {field.state.value.map((file: File, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <span className="text-sm truncate">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};