const Joi = require('joi');
const { boomify } = require('boom');
const { postGroceryPipe } = require('../../Grocery');

module.exports = {
  validation: {
    body: Joi.object()
      .keys({
        name: Joi.string().default('Grocery List'),
        items: Joi.array().single().required()
      }).required()
  },
  async handler(req, res) {
    try {
      res.send(await postGroceryPipe(req.body));
    } catch (e) {
      res.send(boomify(e));
    }
  }
};
