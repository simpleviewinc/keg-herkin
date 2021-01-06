import babel from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import cleanup from 'rollup-plugin-cleanup'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from "rollup-plugin-terser"

const { DOC_APP_PATH, DOC_APP_PORT, NODE_ENV } = process.env

// Need to require our babel.config.js because it uses module.exports
const babelConfig = require('./babel.config.js')

const isProd = process.env.NODE_ENV === 'production'

// Default location of the build output
const buildPath = `./build`
const buildTypes = isProd ? ['cjs', 'esm'] : ['esm']

// Rollup accepts an array of configs as an export
// Which allows us to loop over the export types for cjs and esm
// Most bundler use esm, but include cjs just incase
export default buildTypes.reduce((apps, type) => {
  // Push each buildTypes config into apps and return
  apps.push({
    // List of alternate exports
    // This allows importing only when you need
    input: {
      index: `./src/index.js`,
      react: './src/react/index.js',
      parent: './src/parent/index.js',
      child: './src/child/index.js',
    },
    output: {
      dir: `${buildPath}/${type}`,
      format: type,
      sourcemap: true,
    },
    watch: {
      clearScreen: false,
      ...(process.env.DOC_APP_PATH && { chokidar: false } || {}),
    },
    external: [
      'react',
      '@keg-hub/jsutils',
      'codeamigo-jest-lite',
    ],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
      alias({
        entries: {},
      }),
      resolve(),
      babel({
        babelrc: false,
        sourceMaps: true,
        inputSourceMap: true,
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        ...babelConfig,
      }),
      commonjs(),
      cleanup(),
      isProd && terser({
        mangle: {
          keep_fnames: true,
          keep_classnames: true,
        }
      })
    ]
  })

  return apps
}, [])

