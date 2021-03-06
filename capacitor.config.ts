import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.posporus.vorkout.app',
  appName: 'Happy Torture',
  webDir: 'dist\\spa',
  bundledWebRuntime: false,
   server: {
    'url': 'http://192.168.2.109:8080',
    'cleartext': true
  },
};

export default config;
