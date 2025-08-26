import { Asset } from "@/types/cms";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText, Image, Video, Mic } from "lucide-react";


interface AssetPreviewProps {
  asset: Asset;
  showActions?: boolean;
  watermarked?: boolean;
}

const getAssetIcon = (type: Asset['type']) => {
  switch (type) {
    case 'image':
      return Image;
    case 'video':
      return Video;
    case 'audio':
      return Mic;
    case 'document':
    case 'script':
      return FileText;
    default:
      return FileText;
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const AssetPreview = ({ asset, showActions = true, watermarked = false }: AssetPreviewProps) => {
  const Icon = getAssetIcon(asset.type);

  const renderPreview = () => {
    if (asset.type === 'image') {
      return (
        <div className="relative">
          <img 
            src={asset.url} 
            alt={asset.filename}
            className="w-full h-32 object-cover rounded-md"
          />
          {(watermarked || asset.isWatermarked) && (
            <div className="absolute inset-0 bg-black/10 rounded-md flex items-center justify-center">
              <div className="bg-black/50 text-white px-2 py-1 rounded text-xs font-medium">
                PREVIEW
              </div>
            </div>
          )}
        </div>
      );
    }

    if (asset.type === 'video') {
      return (
        <div className="relative">
          <video 
            src={asset.url}
            className="w-full h-32 object-cover rounded-md"
            controls={false}
            poster="/api/placeholder/300/150"
          />
          {(watermarked || asset.isWatermarked) && (
            <div className="absolute inset-0 bg-black/10 rounded-md flex items-center justify-center">
              <div className="bg-black/50 text-white px-2 py-1 rounded text-xs font-medium">
                WATERMARKED
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="h-32 bg-muted rounded-md flex items-center justify-center">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        {renderPreview()}
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm truncate" title={asset.filename}>
              {asset.filename}
            </h4>
            <Badge variant="outline" className="text-xs">
              v{asset.version}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{formatFileSize(asset.size)}</span>
            <span>•</span>
            <span>{asset.type}</span>
          </div>
          
          {showActions && (
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="w-3 h-3 mr-1" />
                View
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Download className="w-3 h-3 mr-1" />
                Download
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};