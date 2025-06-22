
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Users, MessageCircle, Mic, Settings } from 'lucide-react';

interface MobileDashboardProps {
  grove?: {
    id: string;
    member_count: number;
    is_complete: boolean;
  } | null;
  onNavigateToGrove: () => void;
  onNavigateToAudio: () => void;
  onNavigateToChat: () => void;
}

export const MobileDashboard: React.FC<MobileDashboardProps> = ({
  grove,
  onNavigateToGrove,
  onNavigateToAudio,
  onNavigateToChat,
}) => {
  return (
    <div className="min-h-screen bg-stone-50 p-4 pb-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Your Grove</h1>
        {grove ? (
          <div className="flex items-center space-x-2">
            <Badge variant={grove.is_complete ? "default" : "outline"}>
              {grove.member_count}/11 members
            </Badge>
            {grove.is_complete && (
              <Badge className="bg-green-500">Complete</Badge>
            )}
          </div>
        ) : (
          <p className="text-stone-600">Create or join your first Grove</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="cursor-pointer" onClick={onNavigateToGrove}>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-earth-600" />
            <p className="text-sm font-medium">Grove</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer" onClick={onNavigateToChat}>
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-earth-600" />
            <p className="text-sm font-medium">Chat</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer" onClick={onNavigateToAudio}>
          <CardContent className="p-4 text-center">
            <Mic className="h-8 w-8 mx-auto mb-2 text-earth-600" />
            <p className="text-sm font-medium">Audio Room</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer">
          <CardContent className="p-4 text-center">
            <Settings className="h-8 w-8 mx-auto mb-2 text-earth-600" />
            <p className="text-sm font-medium">Settings</p>
          </CardContent>
        </Card>
      </div>

      {/* Grove Status */}
      {grove && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Grove Status</CardTitle>
          </CardHeader>
          <CardContent>
            {grove.is_complete ? (
              <div className="text-center py-4">
                <p className="text-green-600 font-medium mb-2">Your Grove is complete! 🎉</p>
                <p className="text-sm text-stone-600 mb-4">
                  You now have 11 trusted connections in your circle.
                </p>
                <PrimaryButton 
                  onClick={onNavigateToAudio}
                  className="w-full"
                >
                  Start Audio Room
                </PrimaryButton>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-stone-700 font-medium mb-2">
                  {11 - grove.member_count} more members needed
                </p>
                <p className="text-sm text-stone-600 mb-4">
                  Invite trusted people to complete your Grove
                </p>
                <PrimaryButton 
                  onClick={onNavigateToGrove}
                  className="w-full"
                >
                  Invite Members
                </PrimaryButton>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!grove && (
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-stone-400" />
            <h3 className="font-medium mb-2">No Grove Yet</h3>
            <p className="text-sm text-stone-600 mb-4">
              Start building your circle of 11 trusted connections
            </p>
            <PrimaryButton 
              onClick={onNavigateToGrove}
              className="w-full"
            >
              Create Grove
            </PrimaryButton>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
