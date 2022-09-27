import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export const aliases = {
  '@assets': resolve(__dirname, './src/assets'),
  '@components': resolve(__dirname, './src/components'),
  '@constants': resolve(__dirname, './src/constants'),
  '@helpers': resolve(__dirname, './src/helpers'),
  '@hooks': resolve(__dirname, './src/hooks'),
  '@layouts': resolve(__dirname, './src/layouts'),
  '@service': resolve(__dirname, './src/service'),
  '@styles': resolve(__dirname, './src/styles'),
  '@types': resolve(__dirname, './src/types'),
  '@views': resolve(__dirname, './src/views'),
  '@api': resolve(__dirname, './src/api'),
  '@router': resolve(__dirname, './src/router'),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliases,
  },
  clearScreen: false,
  server: {
    strictPort: true,
  },
});
