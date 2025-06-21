
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/invite/LoadingSpinner';
import { InviteCodeForm } from '@/components/invite/InviteCodeForm';
import { InviteDetails } from '@/components/invite/InviteDetails';
import { InvalidInvite } from '@/components/invite/InvalidInvite';
import { supabase } from '@/integrations/supabase/client';

interface InviteData {
  inviterName: string;
  groveId: string;
  filledSpots: number;
  isValid: boolean;
  inviteCode: string;
}

const InvitePage = () => {
  const { inviteId } = useParams();
  const { toast } = useToast();
  
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInviteForm, setShowInviteForm] = useState(!inviteId);

  useEffect(() => {
    if (inviteId) {
      loadInviteData(inviteId);
    } else {
      setLoading(false);
      setShowInviteForm(true);
    }
  }, [inviteId]);

  const loadInviteData = async (inviteCode: string) => {
    try {
      console.log('Loading invite data for code:', inviteCode);
      
      // First, get the grove information
      const { data: groveData, error: groveError } = await supabase
        .from('groves')
        .select('id, owner_id, invite_code, is_complete')
        .eq('invite_code', inviteCode.toUpperCase())
        .single();

      if (groveError) {
        console.error('Grove lookup error:', groveError);
        setInviteData({ 
          inviterName: '', 
          groveId: '', 
          filledSpots: 0, 
          isValid: false, 
          inviteCode: '' 
        });
        return;
      }

      if (!groveData) {
        console.log('No grove found for invite code');
        setInviteData({ 
          inviterName: '', 
          groveId: '', 
          filledSpots: 0, 
          isValid: false, 
          inviteCode: '' 
        });
        return;
      }

      // Check if grove is already complete
      if (groveData.is_complete) {
        console.log('Grove is already complete');
        setInviteData({ 
          inviterName: '', 
          groveId: '', 
          filledSpots: 11, 
          isValid: false, 
          inviteCode: '' 
        });
        return;
      }

      // Get the owner's profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', groveData.owner_id)
        .single();

      if (profileError) {
        console.error('Profile lookup error:', profileError);
      }

      // Count current members
      const { count: memberCount, error: countError } = await supabase
        .from('grove_members')
        .select('*', { count: 'exact' })
        .eq('grove_id', groveData.id);

      if (countError) {
        console.error('Member count error:', countError);
      }

      const totalMembers = (memberCount || 0) + 1; // +1 for owner
      
      setInviteData({
        inviterName: profileData?.full_name || 'Grove Owner',
        groveId: groveData.id,
        filledSpots: totalMembers,
        isValid: true,
        inviteCode: groveData.invite_code
      });

    } catch (error) {
      console.error('Error loading invite:', error);
      setInviteData({ 
        inviterName: '', 
        groveId: '', 
        filledSpots: 0, 
        isValid: false, 
        inviteCode: '' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInviteCodeSubmit = async (inviteCode: string) => {
    setLoading(true);
    
    try {
      await loadInviteData(inviteCode);
      
      // Wait for state to update, then check validity
      setTimeout(() => {
        const currentData = inviteData;
        if (currentData?.isValid) {
          setShowInviteForm(false);
          toast({
            title: "Invite code accepted!",
            description: "Welcome to the Grove invitation.",
          });
        } else {
          toast({
            title: "Invalid invite code",
            description: "Please check your invite code and try again.",
            variant: "destructive"
          });
        }
      }, 100);
      
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
