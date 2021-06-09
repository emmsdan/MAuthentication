import open from 'open';
import dotenv from 'dotenv';
import app from '../app';
import BeLogger from './logger';

dotenv.config();
const bLogger = new BeLogger();

app.use(bLogger.use);

// eslint-disable-next-line
const PORT = process.env.PORT || 3030;
app.listen(PORT, function () {
  const { address, port } = this.address();
  const server = `http://${address === '::' ? '0.0.0.0' : address }:${port}`;
  // eslint-disable-next-line
  console.log('Server Started ON:', '\x1b[36m\x1b[89m', server);
  // eslint-disable-next-line
  if (process.env.EMMSDAN_STARTED) {
    open(server);
  }
});

process.on('uncaughtException', (err) => {
  bLogger.log(err, 'uncaughtException');
}).on('unhandledRejection', (err) => {
  bLogger.log(err, 'unhandledRejection');
});
