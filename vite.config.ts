import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative base so the build works from any folder or subpath (GitHub Pages, S3, etc.).
  base: './',
});
