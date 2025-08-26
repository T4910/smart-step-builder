import { useState } from "react";
import { Comment, User } from "@/types/cms";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, Reply } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface CommentThreadProps {
  comments: Comment[];
  users: User[];
  currentUserId: string;
  onAddComment: (content: string, mentions: string[]) => void;
}

export const CommentThread = ({ comments, users, currentUserId, onAddComment }: CommentThreadProps) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getUserById = (id: string) => users.find(user => user.id === id);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // Extract mentions (@username)
    const mentions = newComment.match(/@(\w+)/g)?.map(mention => 
      users.find(user => user.name.toLowerCase().includes(mention.slice(1).toLowerCase()))?.id
    ).filter(Boolean) || [];

    await onAddComment(newComment, mentions as string[]);
    setNewComment("");
    setIsSubmitting(false);
  };

  const formatCommentContent = (content: string, mentions: string[]) => {
    let formattedContent = content;
    
    mentions.forEach(userId => {
      const user = getUserById(userId);
      if (user) {
        const mentionRegex = new RegExp(`@${user.name.split(' ')[0]}`, 'gi');
        formattedContent = formattedContent.replace(
          mentionRegex, 
          `<span class="text-primary font-medium">@${user.name.split(' ')[0]}</span>`
        );
      }
    });
    
    return formattedContent;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Comments & Discussion</h3>
        
        <div className="space-y-4 mb-6">
          {comments.map((comment) => {
            const user = getUserById(comment.userId);
            if (!user) return null;
            
            return (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <div 
                    className="text-sm text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: formatCommentContent(comment.content, comment.mentions) 
                    }}
                  />
                  
                  {comment.attachments && comment.attachments.length > 0 && (
                    <div className="mt-2 flex gap-2">
                      {comment.attachments.map((attachment) => (
                        <Button key={attachment.id} variant="outline" size="sm">
                          📎 {attachment.filename}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {comments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No comments yet. Start the conversation!</p>
            </div>
          )}
        </div>
        
        {/* New Comment Form */}
        <div className="border-t pt-4">
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={getUserById(currentUserId)?.avatar} />
              <AvatarFallback className="text-xs">
                {getUserById(currentUserId)?.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <Textarea
                placeholder="Add a comment... Use @name to mention team members"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-muted-foreground">
                  Use @name to mention team members
                </p>
                
                <Button 
                  onClick={handleSubmit}
                  disabled={!newComment.trim() || isSubmitting}
                  size="sm"
                >
                  <Send className="w-3 h-3 mr-1" />
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};