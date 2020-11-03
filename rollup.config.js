import ts from 'rollup-plugin-typescript2';

export default {
  input: 'packages/hope/src/index.ts',
  output: {
    format: 'iife',
    file: 'packages/hope/dist/hope.global.js',
    name: 'Hope'
  },
  plugins: [ts()]
}