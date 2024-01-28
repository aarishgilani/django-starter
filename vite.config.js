import { defineConfig, loadEnv } from 'vite';
import { resolve, join } from 'path';

const postcssConfig = {
  plugins: [
    require('postcss-import')(),
    require('postcss-simple-vars')(),
    require('tailwindcss/nesting')(),
    require('tailwindcss')(),
    require('autoprefixer')(),
  ],
};

export default defineConfig((mode) => {
  const env = loadEnv(mode, process.cwd(), '');

  const INPUT_DIR = './django_starter/vite_assets';
  const OUTPUT_DIR = './django_starter/vite_assets_dist';

  return {
    plugins: [],
    resolve: {
      alias: {
        '@': resolve(INPUT_DIR),
      },
    },
    root: resolve(INPUT_DIR),
    base: '/static/',
    css: {
      postcss: postcssConfig,
    },
    server: {
      host: "localhost",
      port: "5173",
    },
    build: {
      manifest: true,
      emptyOutDir: true,
      outDir: resolve(OUTPUT_DIR),
      rollupOptions: {
        input: {
          home: join(INPUT_DIR, '/js/main.js'),
          css: join(INPUT_DIR, '/css/main.css.js'),
        },
      },
    },
  };
});