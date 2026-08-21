import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

// The UI package resolves through the npm workspace symlink and its exports
// map, so no alias is needed. An alias on the package root would swallow
// subpath imports such as `@accessible-dnd/accessible-ui/theme.css`.
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
  },
});
