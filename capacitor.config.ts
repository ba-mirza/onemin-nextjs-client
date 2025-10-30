import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'kz.onemin.app',
  appName: 'ONEMIN.KZ',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
    // Allow navigation to all domains for news articles
    allowNavigation: ['*'],
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      backgroundColor: '#ffffff',
      style: 'default',
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true,
    },
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true,
    limitsNavigationsToAppBoundDomains: false,
    preferredContentMode: 'mobile',
  },
  android: {
    allowMixedContent: false,
    backgroundColor: '#ffffff',
    webContentsDebuggingEnabled: process.env.NODE_ENV !== 'production',
  },
};

export default config;