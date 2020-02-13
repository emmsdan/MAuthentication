import express from 'express';
import ApiWrapper from './api';
import lang from './settings/locales';

const app = express();
lang.setLang('en');
// LanguageService.t('settings');

// Load and Wrap all api endpoints
ApiWrapper(app);

app.all('/', function (req, res) {
  res.send(lang.t('welcome'));
});

export default app;
