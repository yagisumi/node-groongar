import typescript from 'rollup-plugin-typescript2'

export default {
  input: './tools/src/tools.ts',
  output: {
    file: './tools/lib/tools.js',
    format: 'cjs',
    sourcemap: true,
    sourcemapExcludeSources: true,
  },
  external: ['path', 'fs', 'util', 'rimraf', 'heredocument', 'moment', 'sortobject', 'prettier'],

  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          module: 'es2015',
          sourceMap: true,
          declaration: false,
        },
      },
    }),
  ],
}
