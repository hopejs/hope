import ts from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

const __DEV__ = process.env.NODE_ENV !== 'production';

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'esm',
      file: 'dist/hope.esm.js'
    }
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__
    }),
    ts(),
    nodeResolve(),
    __DEV__ ? null : terser(),
  ],
};
