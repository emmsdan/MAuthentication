const express = require('express');

const app = express();

app.all('/', function (req, res) {
  res.send('Welcome to EmmsDan Auth.')
})

const PORT = process.env.PORT || 0;
app.listen(PORT, function () {
  console.log('Server Started ON: ')
  const { address, port } = this.address();
  console.log(`http://${address === '::' ? '0.0.0.0' : address }:${port}`)
})
