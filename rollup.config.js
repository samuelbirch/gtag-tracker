import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/gtag-tracker.js',
    output: {
        file: (process.env.BUILD === 'production' ? 'dist' : 'examples/assets') + '/gtag-tracker.js',
        name: 'gtagTracker',
        format: 'cjs'
    },
    plugins: [
        resolve(),
        json(),
        commonjs(),
        eslint(),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        }),
        replace({
            ENV: JSON.stringify(process.env.BUILD || 'development'),
        }),
        (process.env.BUILD === 'production' && uglify({}, minify)),
    ]
};