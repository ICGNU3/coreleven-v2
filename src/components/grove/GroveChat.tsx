
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, MessageCircle } from 'lucide-react';

interface GroveChatProps {
  groveId: string;
  groveName?: string;
}

interface ChatMessage {
  id: string;
  content: string;
  message_type: string;
  created_at: string;
  sender_id: string;
  profiles?: {
    full_name: string;
  };
}

export const GroveChat: React.FC<GroveChatProps> = ({ groveId, groveName }) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
    subscribeToMessages();
  }, [groveId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('grove_messages')
        .select(`
          *,
          profiles:sender_id (
            full_name
          )
        `)
        .eq('grove_id', groveId)
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) {
        console.error('Error loading messages:', error);
      } else {
        setMessages(data || []);
      }
    } catch (error) {
      console.error('Error in loadMessages:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel(`grove_messages_${groveId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'grove_messages',
          filter: `grove_id=eq.${groveId}`
        },
        async (payload) => {
          const newMessage = payload.new as ChatMessage;
          
          // Fetch the sender's profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', newMessage.sender_id)
            .single();

          setMessages(prev => [...prev, {
            ...newMessage,
            profiles: profileData ? { full_name: profileData.full_name } : undefined
          }]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    try {
      setSending(true);
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to send messages.",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('grove_messages')
        .insert({
          grove_id: groveId,
          sender_id: user.user.id,
          content: newMessage.trim(),
          message_type: 'text'
        });

      if (error) {
        throw error;
      }

      setNewMessage('');
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return date.toLocaleDateString();
  };

  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { [date: string]: ChatMessage[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.created_at).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading chat...</div>
        </CardContent>
      </Card>
    );
  }

  const messageGroups = groupMessagesByDate(messages);

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5" />
          <span>Grove Chat</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {Object.keys(messageGroups).length === 0 ? (
            <div className="text-center text-stone-500 py-8">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            Object.keys(messageGroups).map(date => (
              <div key={date}>
                <div className="text-center text-xs text-stone-500 mb-3">
                  {formatDate(date)}
                </div>
                <div className="space-y-2">
                  {messageGroups[date].map((message) => (
                    <div key={message.id} className="group">
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-earth-100 rounded-full flex items-center justify-center text-xs font-medium">
                          {message.profiles?.full_name?.charAt(0) || '?'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline space-x-2">
                            <span className="font-medium text-sm">
                              {message.profiles?.full_name || 'Anonymous'}
                            </span>
                            <span className="text-xs text-stone-500">
                              {formatTime(message.created_at)}
                            </span>
                          </div>
                          <p className="text-sm text-stone-700">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={sending}
            className="flex-1"
          />
          <PrimaryButton 
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="bg-earth-600 hover:bg-earth-700"
          >
            <Send className="h-4 w-4" />
          </PrimaryButton>
        </form>
      </CardContent>
    </Card>
  );
};
