import express from 'express';
import ApiWrapper from './api';
import LanguageService from './setup/locales';

const app = express();
LanguageService.setLang('fr');
// LanguageService.t('settings');

// Load and Wrap all api endpoints
ApiWrapper(app);

app.all('/', function (req, res) {
  res.send('Welcome to EmmsDan Auth.');
});

export default app;
