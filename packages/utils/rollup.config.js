import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import path from 'path';

import pkg from './package.json';
import globalPkg from '../../package.json';

const config = [
	{
		input: 'src/index.ts',
		output: [
			{
				dir: 'dist/cjs',
				format: 'cjs'
			},
			{
				dir: 'dist/esm',
				format: 'esm'
			}
		],
		external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(globalPkg.peerDependencies)],
		plugins: [typescript(), terser({ format: { comments: false } })]
	},
	{
		input: 'src/index.ts',
		output: [{ file: 'dist/types/index.d.ts', format: 'cjs' }],
		plugins: [
			dts(),
			alias({
				entries: [
					{
						find: /^utils\/(.+)/,
						replacement: path.resolve(__dirname, './src/$1')
					}
				]
			})
		]
	}
];

export default config;
