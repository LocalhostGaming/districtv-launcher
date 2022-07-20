import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export const aliases = {
  '@': resolve(__dirname, './src'),
  '@assets': resolve(__dirname, './src/assets'),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliases,
  },
});
