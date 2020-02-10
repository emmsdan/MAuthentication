import express from 'express';
import ApiWrapper from './api';

const app = express();

// Load and Wrap all api endpoints
ApiWrapper(app);

app.all('/', function (req, res) {
  res.send('Welcome to EmmsDan Auth.');
});

export default app;
