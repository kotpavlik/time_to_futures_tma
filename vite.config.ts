import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidSvgPlugin from 'vite-plugin-solid-svg';
import basicSsl from '@vitejs/plugin-basic-ssl';
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(), basicSsl(), solidSvgPlugin()
  ],
  server: { https: true },
  optimizeDeps: {
    exclude: ['react', 'react-dom'],
  },
  build: {
    target: 'esnext',
    outDir: './dist'
  },
  base: './'
});
function svgr(): import("vite").PluginOption {
  throw new Error('Function not implemented.');
}

function solidSvg(): import("vite").PluginOption {
  throw new Error('Function not implemented.');
}

