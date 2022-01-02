import {
  defineConfig, loadEnv
} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import env from 'vite-plugin-env-compatible'
const reactSvgPlugin = require('vite-plugin-react-svg');


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactSvgPlugin(), reactRefresh(), env({ prefix: 'VITE_' })],
  
  server: {
    fs: {
      allow: ["src", "./"]
    }
  },
  resolve: {
    alias: {
      'socket.io-client': 'socket.io-client/dist/socket.io.js',
      'terminal-in-react': 'terminal-in-react/lib/js/index.js',
      'react-chat-widget': 'react-chat-widget/lib/index.js',

    },
  },
});