import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.38f01ec7804044c48940e24559fbebf7',
  appName: 'legend-lift-ai',
  webDir: 'dist',
  server: {
    url: "https://38f01ec7-8040-44c4-8940-e24559fbebf7.lovableproject.com?forceHideBadge=true",
    androidScheme: "https",
    cleartext: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    }
  }
};

export default config;
