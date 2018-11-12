const Joi = require('joi');
const { boomify } = require('boom');
const { getMealPipe } = require('../../Meal');

module.exports = {
  validation: {
    params: Joi.object()
      .keys({
        meal: Joi.string()
      })
      .required()
  },
  async handler(req, res) {
    try {
      res.send(await getMealPipe(req.params));
    } catch (e) {
      console.error(e);
      res.send(boomify(e));
    }
  }
};
