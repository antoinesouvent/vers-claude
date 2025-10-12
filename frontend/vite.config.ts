import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  // Configuration pour le routage côté client
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});
