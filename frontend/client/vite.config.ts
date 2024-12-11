/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Permet d'utiliser les fonctions globales de vitest comme 'vi', 'describe', etc.
    environment: 'jsdom', // Pour le support des tests basés sur le DOM
    setupFiles: [
      path.resolve(__dirname, './src/setupTest.ts'),
      path.resolve(__dirname, './vitest.setup.ts'),
    ], // Fichier de configuration (optionnel)
    css: true, // Activer le support des styles CSS dans les tests
  },
});
