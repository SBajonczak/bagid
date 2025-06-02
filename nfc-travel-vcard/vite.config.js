import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '127.0.0.1', // Explicitly use IPv4
    port: 3000,
    open: true,
    proxy: {
      // Proxy API requests to your backend during development
      '/api': {
        target: 'http://127.0.0.1:3001', // Explicitly use IPv4 instead of localhost
        changeOrigin: true,
        secure: false,
        // Add error logging for debugging
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('Proxy error:', err);
            console.log('Make sure your backend server is running at', options.target);
            // Return a friendly error instead of hanging
            res.statusCode = 502;
            res.end('Backend server not available. Please start your API server.');
          });
        }
      }
    }
  },
});
