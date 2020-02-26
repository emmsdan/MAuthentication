import { BitlyClient } from 'bitly';
import { config } from 'dotenv';
config();

/**
* Handles error responses for database
* @param {object} error error object
*/
export const DBErrorHandler = (error) => {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
    return error;
  }
  return error.message;
};

/**
* Verify if value is an object
* @param {any} value value to be verified
*/
export const isObject = (value) => {
  if (value === Object(value)) {
    return true;
  }
  return false;
};

export const getEnv = (variable, defaultValue) => {
  const value = process.env[variable] || defaultValue;
  return value;
};

export const randomNumber = (number = 99999, min = 11111) => {
  const adjusted = min + 1;
  return Math.floor((Math.random() * (number - adjusted)) * min);
};

export const generateURL = async (path) => {
  const bitly = new BitlyClient(getEnv('BIT_LY_TOKEN'), {});
  const bit = await bitly.shorten(`${getEnv('FRONTEND_URL')}/${path}`);
  return bit;
};

export const activationLink = async (id, token) => {
  return await generateURL(`activate/${id}/${token}/${id}`);
};
export const logger = (params) => {
  const log = console;
  log.table(params);
};

export const objectValueToLowerCase = (obj) => {
  const newObject = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value !== 'object') {
      newObject[key] = typeof value === 'number' ? value : value.toLowerCase();
    } else {
      newObject[key] = objectValueToLowerCase(value);
    }
  });
  return newObject;
};
