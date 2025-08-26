import { TimelineEvent, User } from "@/types/cms";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, User as UserIcon, Upload, MessageSquare, CreditCard, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface OrderTimelineProps {
  events: TimelineEvent[];
  users: User[];
}

const getEventIcon = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'status_change':
      return Clock;
    case 'assignment':
      return UserIcon;
    case 'upload':
      return Upload;
    case 'comment':
      return MessageSquare;
    case 'payment':
      return CreditCard;
    case 'deadline':
      return Calendar;
    default:
      return Clock;
  }
};

const getEventColor = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'status_change':
      return 'text-primary';
    case 'assignment':
      return 'text-success';
    case 'upload':
      return 'text-status-in-progress';
    case 'comment':
      return 'text-status-awaiting-review';
    case 'payment':
      return 'text-status-completed';
    case 'deadline':
      return 'text-warning';
    default:
      return 'text-muted-foreground';
  }
};

export const OrderTimeline = ({ events, users }: OrderTimelineProps) => {
  const getUserById = (id: string) => users.find(user => user.id === id);

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Order Timeline</h3>
        <div className="space-y-4">
          {events.map((event, index) => {
            const user = event.userId ? getUserById(event.userId) : null;
            const Icon = getEventIcon(event.type);
            const iconColor = getEventColor(event.type);
            
            return (
              <div key={event.id} className="flex items-start gap-3">
                <div className={cn("flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center", iconColor)}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {user && (
                      <Avatar className="w-5 h-5">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <span className="text-sm font-medium">{event.description}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}
                  </p>
                </div>
                
                {index !== events.length - 1 && (
                  <div className="absolute left-4 mt-8 w-px h-4 bg-border" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};