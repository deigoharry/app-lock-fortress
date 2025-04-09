
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.89ce56f0da924bea8e60b3d928bc6fe3',
  appName: 'App Lock Fortress',
  webDir: 'dist',
  server: {
    url: 'https://89ce56f0-da92-4bea-8e60-b3d928bc6fe3.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    // We can configure Capacitor plugins here when needed
  }
};

export default config;
