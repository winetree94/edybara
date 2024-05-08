import { defineConfig } from 'tsup';

export default defineConfig({
  target: 'es2018',
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
