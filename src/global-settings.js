/* eslint no-undef: 0 */

import path from 'path';

export const locales = {
  defaultLocale    : 'fr',
  directory: path.join(__dirname, 'settings/locales'),
  translate      : 'true',
  locales: 0 // can also be an array of selected langs.. ['en', 'fr']
};

export const authSettings = {
  allowAccountActivation: true,
};

export const securityKey = {
  expiresIn: '5h'
};

const settings = {
  API_ENTRY_POINT: '/api/v1',
  COMPONENT_DIR: 'modules/',
  BASE_DIR: './src/',
  ...locales,
  ...authSettings,
  securityKey
};

export default settings;
