/* eslint no-undef: 0 */

import path from 'path';

const APP_TITLE = 'EmmsDan';
const APP_URL = process.env.FRONTEND_URL || 'https://emmsdan.com';
const APP_LOGO = 'https://res.cloudinary.com/emmsdan/image/upload/v1559042471/authors-haven/17757468_1014843961983837_2430230854716361697_n_go8xqn.jpg';
export const locales = {
  defaultLocale    : 'en',
  directory: path.join(__dirname, 'settings/locales'),
  translate      : 'true',
  locales: 0 // can also be an array of selected langs.. ['en', 'fr']
};

export const authSettings = {
  allowAccountActivation: false,
};

export const securityKey = {
  expiresIn: '5h'
};

export const logo = {
  logoAlt: APP_TITLE,
  logoURL: APP_URL,
  logoImg: APP_LOGO,
};

export const socialMedia = {
  linkedInUrl: 'https://www.linkedin.com/in/emmsdan/',
  facebookUrl: 'http://facebook.com/emmsdan',
  githubUrl: 'https://github.com/emmsdan',
  twitterUrl: 'https://twitter.com/EmmsDan',

  linkedInAlt: 'LinkedIn',
  facebookInAlt: 'Facebook',
  githubAlt: 'Github',
  twitterAlt: 'Twitter',

  linkedInImg: 'https://res.cloudinary.com/emmsdan/image/upload/v1582113225/icons/linkedin_2.svg',
  facebookImg: 'https://res.cloudinary.com/emmsdan/image/upload/v1582113225/icons/facebook_2.svg',
  githubImg: 'https://res.cloudinary.com/emmsdan/image/upload/v1582113225/icons/github_2.svg',
  twitterImg: 'https://res.cloudinary.com/emmsdan/image/upload/v1582113225/icons/twitter_2.svg',
};

const settings = {
  APP_TITLE, APP_URL, APP_LOGO,
  API_ENTRY_POINT: '/api/v1',
  COMPONENT_DIR: 'modules/',
  BASE_DIR: './src/',
  ROUTEFILE: '.route.js',
  ...locales,
  ...authSettings,
  securityKey
};

export default settings;
