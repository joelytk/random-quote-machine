import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/random-quote-machine/',
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
    port: 3000
  }
});
