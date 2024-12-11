import path from 'path';
import { defineConfig } from '@craco/craco';

export default defineConfig({
  webpack: {
    alias: {
      '#': path.resolve(__dirname, 'src'), // Mappez "#" vers "src"
    },
  },
});