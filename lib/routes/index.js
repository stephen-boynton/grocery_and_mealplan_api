const router = require("express").Router();
const { home } = require("./handlers");

router.route("/").get(home);

module.exports = router;
