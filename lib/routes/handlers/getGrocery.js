const Joi = require('joi');
const { boomify } = require('boom');
const { getGroceryPipe } = require('../../Grocery');

module.exports = {
  validation: {
    params: Joi.object().keys({
      meal: Joi.string()
    }).required()
  },
  async handler(req, res) {
    try {
      res.send(await getGroceryPipe(req.params));
    } catch (e) {
      res.send(boomify(e));
    }
  }
};
