const Joi = require('joi');
const { boomify } = require('boom');
const { putGroceryItemActivePipe } = require('../../Grocery');

module.exports = {
  validation: {
    params: Joi.object().keys({
      grocery: Joi.string()
    }).required(),
    body: Joi.object().keys({
      item: Joi.string()
    }).required()
  },
  async handler(req, res) {
    try {
      await putGroceryItemActivePipe({ ...req.params, ...req.body });
      res.status(204).end();
    } catch (e) {
      res.send(boomify(e));
    }
  }
};
