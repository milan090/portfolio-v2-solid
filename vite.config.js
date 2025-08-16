// vite.config.js
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import glslify from 'vite-plugin-glslify';
export default defineConfig({
  plugins: [solidPlugin(), glslify()],
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf'], // Add this line
});