import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';

export const aliases = {
  '@assets': resolve(__dirname, './src/assets'),
  '@components': resolve(__dirname, './src/components'),
  '@constants': resolve(__dirname, './src/constants'),
  '@helpers': resolve(__dirname, './src/helpers'),
  '@hooks': resolve(__dirname, './src/hooks'),
  '@layouts': resolve(__dirname, './src/layouts'),
  '@services': resolve(__dirname, './src/services'),
  '@styles': resolve(__dirname, './src/styles'),
  '@types': resolve(__dirname, './src/types'),
  '@interface': resolve(__dirname, './src/interface'),
  '@views': resolve(__dirname, './src/views'),
  '@api': resolve(__dirname, './src/api'),
  '@router': resolve(__dirname, './src/router'),
  '@utils': resolve(__dirname, './src/utils'),
  '@schema': resolve(__dirname, './src/schema'),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        input: 'electron/preload.ts',
      },
      renderer: {},
    }),
  ],
  resolve: {
    alias: aliases,
  },
  clearScreen: false,
  server: {
    strictPort: true,
  },
});
