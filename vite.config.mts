import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import removeConsole from 'vite-plugin-remove-console';
import solidPlugin from 'vite-plugin-solid';
import solidSvg from 'vite-plugin-solid-svg';
import tsconfigPaths from 'vite-tsconfig-paths';

const resolvePath = (str: string) => path.resolve(__dirname, str);

export default defineConfig({
  resolve: {
    alias: {
      '@ui': resolvePath('./src/modules/ui'),
    },
  },
  plugins: [
    tsconfigPaths(),
    solidPlugin(),
    removeConsole(),
    solidSvg({
      defaultAsComponent: true,
      svgo: {
        enabled: false,
      },
    }),
    checker({ typescript: true }),
    // Generate d.ts files
    dts(),
  ],
  build: {
    lib: {
      entry: resolvePath('src/main.ts'),
      name: 'Vxdk',
      fileName: (format) => `vxdk.${format}.js`,
      // formats: ["es"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [],
      output: [
        {
          format: 'es',
        },
        {
          name: 'Vxdk',
          format: 'umd',
          inlineDynamicImports: true,
          globals: {},
        },
      ],
    },
  },
});
