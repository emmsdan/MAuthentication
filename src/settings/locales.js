/* eslint no-undef: 0 */

/**
* @title LanguageService
* @description This class allows users to access api in their local language
* @author EmmsDan Inc
*/

/**                                                  /
* ---------------- FUNCTION/METHODS -----------------*
*/

/**                                                  /
* @method constructor(config) -----------------*
* @ config "is an object"
*/

import fileSystem from 'fs';

import { locales } from '@global_settings';

/**                                                  /
* ---------------- SETUP PRIVATE VAR -----------------*
*/
const __configEnv = Symbol('__configEnv');
const ___setDefaultConfig = Symbol('setDefaultConfig');
const ___loadLocale = Symbol('___loadLocale');
const ___listLocales = Symbol('___listLocales');
const __language = Symbol('__language');

class LanguageService {
  constructor(config=null) {
    if (!config){
      this[___setDefaultConfig]();
    }else{
      this.config({...locales, ...config});
    }
    this.languages = [];
    this[___listLocales]();
    this[___loadLocale]();
  }

  config (config) {
    this[__configEnv] = config;
    return this;
  }

  [___setDefaultConfig]() {
    if (locales && locales.directory) {
      this[__configEnv] = locales;
      return this;
    }
    throw Error('Please, specify a locales settings/config');
  }

  [___listLocales]() {
    return fileSystem.readdirSync(this[__configEnv].directory)
      .filter(file => (file.indexOf('.') !== 0) && (file.slice(-5) === '.json'))
      .forEach((file) => {
        this.languages.push(file);
      });
  }

  [___loadLocale]() {
    const { directory, current, defaultLocale } = this[__configEnv];
    const __dir =  `${directory}/${current || defaultLocale}.json`;
    this[__language] = require(__dir);
  }

  get getLang() {
    return this[__configEnv].current || this[__configEnv].defaultLocale;
  }

  get getCurrentLocale() {
    return this.getLang;
  }

  get supportedLocales() {
    return this.languages;
  }

  setLang(language = 'en') {
    if (this.languages.indexOf(`${language.toLowerCase()}.json`) === -1)
      throw Error('Language not supported.');

    this[__configEnv] = {
      ...this[__configEnv],
      current: language
    };
    this[___loadLocale]();
  }

  setCurrentLocale(language = 'en') {
    this.setLang(language);
  }

  /**                                                  /
  * ---------------- GET TRANSLATED TEXT---------------*
  * @translate('settings') => Réglages (french)
  */
  translate(key, defaultValue=null) {
    return this[__language][key] || defaultValue || key;
  }

  /**                                                  /
  * ---------------- GET TRANSLATED TEXT---------------*
  * @alias translate()
  * @t('settings') => Settings (English)
  */
  t(key, defaultValue='s') {
    return this.translate(key, defaultValue);
  }

}

export default new LanguageService();
