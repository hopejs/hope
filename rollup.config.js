import ts from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default {
  input: 'packages/hope/src/index.ts',
  output: {
    format: 'iife',
    file: 'packages/hope/dist/hope.global.js',
    name: 'Hope',
  },
  plugins: [
    // or 'production'
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': 'true',
    }),
    ts(),
    nodeResolve(),
  ],
};
