import open from 'open';
import dotenv from 'dotenv';
import app from '../app';
dotenv.config();

// eslint-disable-next-line
const PORT = process.env.PORT || 40000;
app.listen(PORT, function () {
  const { address, port } = this.address();
  const server = `http://${address === '::' ? '0.0.0.0' : address }:${port}`;
  // eslint-disable-next-line
  console.log('Server Started ON:', '\x1b[36m\x1b[89m', server);
  // eslint-disable-next-line
  if (process.env.EMMSDAN_STARTED) {
    open(server);
  }
  // eslint-disable-next-line
  console.log(process.env, '\n\n')
  // eslint-disable-next-line
  console.log(process.env.DB_DATABASE, '\n\n')
});
