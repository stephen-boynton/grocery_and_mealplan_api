require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const { log, port } = require('./util');
const routes = require('./routes/index');

function init() {
  console.log(log);
  app.use(bodyparser.json());
  app.use('/', routes);
  app.listen(port, () => log.info(`Server listening on port ${port}`));
}

module.exports = init;
