const { boomify } = require('boom');
const { getAllMealsPipe } = require('../../Meal');

module.exports = {
  async handler(req, res) {
    try {
      res.send(await getAllMealsPipe());
    } catch (e) {
      res.send(boomify(e));
    }
  }
};
