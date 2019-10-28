import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import rollupPluginJson from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	external: ['window', 'document'],

	output: {
		file: 'public/bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		// sourcemap: true,
		name: 'FuglePicture',
		globals: {
			'window': 'window',
			'document': 'document'
		},
	},
	plugins: [
		resolve(), // tells Rollup how to find date-fns in node_modules
		commonjs(), // converts date-fns to ES modules
		rollupPluginJson(),
		production && terser() // minify, but only in production
	]
};
