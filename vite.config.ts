import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export const aliases = {
  '@assets': resolve(__dirname, './src/assets'),
  '@components': resolve(__dirname, './src/components'),
  '@constants': resolve(__dirname, './src/constants'),
  '@helpers': resolve(__dirname, './src/helpers'),
  '@hooks': resolve(__dirname, './src/hooks'),
  '@layout': resolve(__dirname, './src/layout'),
  '@service': resolve(__dirname, './src/service'),
  '@styles': resolve(__dirname, './src/styles'),
  '@types': resolve(__dirname, './src/types'),
  '@views': resolve(__dirname, './src/views'),
  '@api': resolve(__dirname, './src/api'),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliases,
  },
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // Tauri expects a fixed port, fail if that port is not available
  server: {
    strictPort: true,
  },
  // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
  // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
  // env variables
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // Tauri supports es2021
    target: ['es2021', 'chrome100', 'safari13'],
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
});
