const { boomify } = require('boom');
const { getCurrentGroceryPipe } = require('../../Grocery');

module.exports = {
  async handler(req, res) {
    try {
      res.send(await getCurrentGroceryPipe());
    } catch (e) {
      res.send(boomify(e));
    }
  }
};
