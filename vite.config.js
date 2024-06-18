// vite.config.js
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf'], // Add this line
});