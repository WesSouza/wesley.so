import { resolve } from 'path';

const root = resolve(__dirname, '../');
const src = resolve(root, './src');

export const Paths = {
  documentsAndSettings: resolve(src, './documents-and-settings/wes'),
  dotEnv: resolve(root, './.env'),
};
