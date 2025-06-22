
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8b83e98f461f45afa867b4ab45e7bcfd',
  appName: 'Coreleven',
  webDir: 'dist',
  server: {
    url: 'https://8b83e98f-461f-45af-a867-b4ab45e7bcfd.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;
