require('dotenv').config();
require('./lib/utils/connect')();

const app = require('app');

const PORT = process.env.PORT || 7891;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
