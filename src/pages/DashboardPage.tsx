
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { CircleVisual } from '@/components/CircleVisual';
import { PrimaryButton } from '@/components/PrimaryButton';
import { MemberCard, Member } from '@/components/MemberCard';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const DashboardPage = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [progress, setProgress] = useState(0);
  
  // Initialize with some mock data
  useEffect(() => {
    // In a real app, this would be fetched from an API
    const mockMembers: Member[] = [
      { id: '1', name: 'John Smith', email: 'john@example.com', status: 'paid', inviteSent: '2023-05-10' },
      { id: '2', name: 'Emma Wilson', email: 'emma@example.com', status: 'paid', inviteSent: '2023-05-10' },
      { id: '3', name: 'Michael Brown', email: 'michael@example.com', status: 'pending', inviteSent: '2023-05-12' },
      { id: '4', name: 'Sophia Chen', email: 'sophia@example.com', status: 'invited', inviteSent: '2023-05-15' },
    ];
    
    // Fill the remaining spots with empty members
    const emptyMembers = Array(10 - mockMembers.length).fill(0).map((_, i) => ({
      id: `empty-${i}`,
      name: null,
      email: null,
      status: 'empty' as const,
    }));
    
    setMembers([...mockMembers, ...emptyMembers]);
    
    // Calculate progress
    const filledCount = mockMembers.filter(m => m.status === 'paid').length;
    setProgress((filledCount / 10) * 100);
  }, []);
  
  const handleSendInvite = (index: number) => {
    const newMembers = [...members];
    newMembers[index] = {
      ...newMembers[index],
      status: 'invited',
      inviteSent: new Date().toISOString().split('T')[0],
    };
    setMembers(newMembers);
  };
  
  const handleRemoveInvite = (index: number) => {
    const newMembers = [...members];
    newMembers[index] = {
      id: `empty-${Date.now()}`,
      name: null,
      email: null,
      status: 'empty',
    };
    setMembers(newMembers);
    
    toast({
      title: "Invitation removed",
      description: "The invitation has been removed. This spot is now available.",
    });
  };
  
  const confirmedCount = members.filter(m => m.status === 'paid').length;
  const pendingCount = members.filter(m => m.status === 'pending' || m.status === 'invited').length;
  const availableCount = members.filter(m => m.status === 'empty').length;
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-5xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-12">
          <div className="mb-10">
            <h1 className="text-2xl md:text-3xl font-medium mb-2 text-earth-700">
              Your Circle
            </h1>
            <p className="text-stone-600">
              Build your circle of 11 by inviting 10 people you believe in.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Status Section */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-stone-200 rounded-lg p-6 sticky top-6">
                <h2 className="text-xl font-medium mb-6 text-earth-700">Circle Status</h2>
                
                <div className="flex justify-center mb-8">
                  <CircleVisual filledCount={confirmedCount} />
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-stone-600">Circle Progress</span>
                    <span className="font-medium text-earth-700">{confirmedCount} of 10</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-stone-100" />
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Confirmed</span>
                    <span className="font-medium text-earth-700">{confirmedCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Pending</span>
                    <span className="font-medium text-earth-700">{pendingCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Available Spots</span>
                    <span className="font-medium text-earth-700">{availableCount}</span>
                  </div>
                </div>
                
                {confirmedCount === 10 ? (
                  <div className="text-center">
                    <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4">
                      Your circle is complete! You're ready for the next phase.
                    </div>
                    
                    <PrimaryButton className="w-full">
                      Start your next phase
                    </PrimaryButton>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-stone-600 mb-4">
                      Invite {10 - (confirmedCount + pendingCount)} more people to complete your circle.
                    </p>
                    
                    <Button variant="outline" className="w-full">
                      Generate Invite Link
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Members Grid */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-medium mb-6 text-earth-700">Your Circle Members</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {members.map((member, index) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    index={index}
                    onSendInvite={handleSendInvite}
                    onRemoveInvite={handleRemoveInvite}
                  />
                ))}
              </div>
              
              <div className="mt-8 bg-stone-100 p-6 rounded-lg">
                <h3 className="font-medium mb-3 text-earth-700">Important Reminders:</h3>
                <ul className="space-y-2 text-stone-600 text-sm">
                  <li>• Each person has 72 hours to accept their invitation before the spot is released.</li>
                  <li>• Nobody can invite more than 10 people.</li>
                  <li>• Once your circle is full, it will be locked.</li>
                  <li>• This is about quality, not quantity. Choose wisely.</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
