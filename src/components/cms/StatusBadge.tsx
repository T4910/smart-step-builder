import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types/cms";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig = {
  'not-started': {
    label: 'Not Started',
    className: 'bg-status-not-started text-white'
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-status-in-progress text-white'
  },
  'awaiting-review': {
    label: 'Awaiting Review',
    className: 'bg-status-awaiting-review text-white'
  },
  'in-review': {
    label: 'In Review',
    className: 'bg-status-in-review text-white'
  },
  'completed': {
    label: 'Completed',
    className: 'bg-status-completed text-white'
  },
  'delivered': {
    label: 'Delivered',
    className: 'bg-status-delivered text-white'
  },
  'redo-requested': {
    label: 'Redo Requested',
    className: 'bg-status-redo text-white'
  }
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <Badge 
      className={cn(config.className, className)}
      variant="secondary"
    >
      {config.label}
    </Badge>
  );
};