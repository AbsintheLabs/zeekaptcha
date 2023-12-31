import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import image from "@rollup/plugin-image";
import { base64 } from 'rollup-plugin-base64';


export default {
  input: "src/index.tsx",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
  // todo: include terser here for production
  // plugins: [url({
  //   include: ['**/snarkjs.min.js', '**/*.wasm', '**/*.zkey'], // Patterns to include
  //   limit: 0, // Always copy the files, do not inline
  //   emitFiles: true, // Ensure files are emitted to the output
  //   // publicPath: '/assets/', // Set the public path to /assets/ or wherever you serve assets from
  //   fileName: '[dirname][name][extname]'
  // }), image(), typescript(), resolve(), commonjs(), json(), postcss({
  //   plugins: [],
  //   minimize: true,
  // }), 
// ],
  plugins: [
    base64({include: ["**/snarkjs.min.js", "**/*.wasm", "**/*.zkey"]}), image(),
    typescript(), commonjs(), json(), 
    postcss({
      plugins: [],
      minimize: true,
    }), terser()
  ],
// fixme: add the other peer dependencies here
  external: ["react", "react-dom", "ethers"],
};
