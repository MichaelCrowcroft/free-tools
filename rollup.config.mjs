// rollup.config.mjs
import { readdirSync } from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import { string } from 'rollup-plugin-string';
import path from 'path';

const componentsDir = 'src';
const outputDir = 'dist';

// Get all JavaScript files from the components directory
const componentFiles = readdirSync(componentsDir).filter(file => file.endsWith('.js'));

const plugins = [
  string({ include: '**/*.css' }),
  resolve()
];

export default componentFiles.map(file => ({
  input: path.join(componentsDir, file),
  output: {
    file: path.join(outputDir, file),
    format: 'es',
    sourcemap: true,
  },
  plugins,
}));