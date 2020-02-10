const express = require('express');

const app = express();

app.all('/', function (req, res) {
  res.send('Welcome to EmmsDan Auth.');
});

// eslint-disable-next-line
const PORT = process.env.PORT || 0;
app.listen(PORT, function () {

  // eslint-disable-next-line
  console.log('Server Started ON: ');
  const { address, port } = this.address();
  // eslint-disable-next-line
  console.log(`http://${address === '::' ? '0.0.0.0' : address }:${port}`);
})
