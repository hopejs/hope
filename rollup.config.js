import ts from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

const __DEV__ = process.env.NODE_ENV !== 'production';

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'umd',
      file: __DEV__ ? 'dist/index.js' : 'dist/index.min.js',
      name: 'Hope',
    },
    {
      format: 'cjs',
      file: 'lib/index.js'
    },
    {
      format: 'esm',
      file: 'esm/index.js'
    }
  ],
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__
    }),
    ts(),
    nodeResolve(),
    __DEV__ ? null : terser(),
  ],
};
