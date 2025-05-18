
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export interface Member {
  id: string;
  name: string | null;
  email: string | null;
  status: 'invited' | 'pending' | 'paid' | 'empty';
  inviteSent?: string;
}

interface MemberCardProps {
  member: Member;
  index: number;
  onSendInvite?: (index: number) => void;
  onRemoveInvite?: (index: number) => void;
  className?: string;
}

export function MemberCard({ 
  member, 
  index, 
  onSendInvite, 
  onRemoveInvite,
  className 
}: MemberCardProps) {
  const { toast } = useToast();
  const [showActions, setShowActions] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const handleSendInvite = async () => {
    if (!emailInput) {
      toast({
        title: "Email required",
        description: "Please enter an email address to send an invitation",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setShowForm(false);
    
    if (onSendInvite) {
      onSendInvite(index);
    }
    
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${emailInput}`,
    });
  };
  
  const handleCopyInviteLink = () => {
    // Simulate copying invite link
    toast({
      title: "Invite link copied",
      description: "The invitation link has been copied to your clipboard",
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'invited': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'paid': return 'text-green-600 bg-green-50';
      default: return 'text-stone-600 bg-stone-50';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'invited': return 'Invited';
      case 'pending': return 'Pending';
      case 'paid': return 'Confirmed';
      default: return 'Empty Spot';
    }
  };
  
  return (
    <div 
      className={cn(
        'border rounded-lg p-4 transition-all duration-300',
        member.status === 'empty' ? 'border-dashed border-stone-300 bg-stone-50' : 'border-stone-200 bg-white',
        showActions ? 'ring-1 ring-earth-400' : '',
        className
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-earth-200 flex items-center justify-center text-earth-700 mr-3">
            {member.name ? member.name.charAt(0).toUpperCase() : (index + 1)}
          </div>
          <div>
            <h3 className="font-medium text-stone-700">
              {member.name || `Spot ${index + 1}`}
            </h3>
            {member.email && (
              <p className="text-xs text-stone-500">{member.email}</p>
            )}
          </div>
        </div>
        
        {member.status !== 'empty' && (
          <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(member.status)}`}>
            {getStatusText(member.status)}
          </div>
        )}
      </div>
      
      {member.status === 'empty' && !showForm ? (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2 border-dashed border-stone-300 text-stone-600"
          onClick={() => setShowForm(true)}
        >
          Send invitation
        </Button>
      ) : member.status === 'empty' && showForm ? (
        <div className="mt-2 space-y-2">
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full p-2 text-sm border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-earth-400"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-earth-500 hover:bg-earth-600"
              onClick={handleSendInvite}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowForm(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className={`flex gap-2 mt-3 transition-opacity duration-300 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
          {member.status === 'invited' && (
            <>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 text-xs"
                onClick={handleCopyInviteLink}
              >
                Copy Link
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 text-xs text-stone-600"
                onClick={() => onRemoveInvite && onRemoveInvite(index)}
              >
                Remove
              </Button>
            </>
          )}
          
          {member.status === 'pending' && (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 text-xs"
              onClick={handleCopyInviteLink}
            >
              Resend Invite
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
