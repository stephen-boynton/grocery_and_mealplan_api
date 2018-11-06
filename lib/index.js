const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const log = require("./util/logger");
const routes = require("./routes");

function init() {
  app.use("/", routes);
  app.listen(port, () => log.info(`Server listening on port ${port}`));
}

module.exports = init;
