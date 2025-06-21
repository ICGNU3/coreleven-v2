
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/invite/LoadingSpinner';
import { InviteCodeForm } from '@/components/invite/InviteCodeForm';
import { InviteDetails } from '@/components/invite/InviteDetails';
import { InvalidInvite } from '@/components/invite/InvalidInvite';

interface InviteData {
  inviterName: string;
  groveId: string;
  filledSpots: number;
  isValid: boolean;
}

const InvitePage = () => {
  const { inviteId } = useParams();
  const { toast } = useToast();
  
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInviteForm, setShowInviteForm] = useState(!inviteId);

  useEffect(() => {
    if (inviteId) {
      loadInviteData();
    } else {
      setLoading(false);
      setShowInviteForm(true);
    }
  }, [inviteId]);

  const loadInviteData = async () => {
    try {
      // Simulate API call - replace with real API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock invite data - replace with real API response
      setInviteData({
        inviterName: 'Sarah Johnson',
        groveId: 'grove-123',
        filledSpots: Math.floor(Math.random() * 8) + 1,
        isValid: true
      });
    } catch (error) {
      console.error('Error loading invite:', error);
      setInviteData({ inviterName: '', groveId: '', filledSpots: 0, isValid: false });
    } finally {
      setLoading(false);
    }
  };

  const handleInviteCodeSubmit = async (inviteCode: string) => {
    setLoading(true);
    
    try {
      // Simulate invite code validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful validation - replace with real API
      setInviteData({
        inviterName: 'Sarah Johnson',
        groveId: 'grove-123',
        filledSpots: Math.floor(Math.random() * 8) + 1,
        isValid: true
      });
      
      setShowInviteForm(false);
      toast({
        title: "Invite code accepted!",
        description: "Welcome to the Grove invitation.",
      });
      
    } catch (error) {
      console.error('Invalid invite code:', error);
      toast({
        title: "Invalid invite code",
        description: "Please check your invite code and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (showInviteForm) {
    return <InviteCodeForm onInviteCodeSubmit={handleInviteCodeSubmit} />;
  }

  if (!inviteData?.isValid) {
    return <InvalidInvite />;
  }

  return <InviteDetails inviteData={inviteData} />;
};

export default InvitePage;
