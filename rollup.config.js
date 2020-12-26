import ts from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

const __DEV__ = process.env.NODE_ENV !== 'production';

export default {
  input: 'packages/hope/src/index.ts',
  output: [
    {
      format: 'umd',
      file: __DEV__ ? 'packages/hope/dist/index.js' : 'packages/hope/dist/index.min.js',
      name: 'Hope',
    },
    {
      format: 'cjs',
      file: 'packages/hope/lib/index.js'
    },
    {
      format: 'esm',
      file: 'packages/hope/esm/index.js'
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
