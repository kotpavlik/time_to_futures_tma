import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidSvgPlugin from 'vite-plugin-solid-svg';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tailwindcss from '@tailwindcss/vite';
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    solidPlugin(), basicSsl(), solidSvgPlugin(), nodePolyfills(), tailwindcss(),
  ],
  optimizeDeps: {
    exclude: ['react', 'react-dom'],
  },
  build: {
    target: 'esnext',
    outDir: './dist'
  },
  server: {

    hmr: {
      protocol: 'wss',
      host: 'time-to-futures.ru.tuna.am',
    },
  },
  base: './'
});


