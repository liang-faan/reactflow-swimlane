import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "./src/index.ts",
    output: [
      // {
      //   file: packageJson.main,
      //   format: "cjs",
      //   sourcemap: true,
      // },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
      }),
      external({
        includeDependencies: true,
      }),
      resolve(),
      terser(),
      typescript({ tsconfig: "./tsconfig.json" }),
      // postcss({
      //   minimize: true,
      //   extensions: [".css"],
      //   extract: path.resolve("dist/swimlane-style.css"),
      // }),
      // image(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/], // telling rollup anything that is .css aren't part of type exports
  },
  {
    input: "src/App.css",
    output: [{ file: "dist/swimlane-style.css" }],
    plugins: [
      postcss({
        minimize: true,
      }),
    ],
  },
];
