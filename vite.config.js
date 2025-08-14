import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the interactive KPI analysis project.
// This config enables the React plugin so JSX can be transpiled
// and sets up sensible defaults for development and production.
export default defineConfig({
  plugins: [react()],
});