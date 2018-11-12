const Joi = require('joi');
const { boomify } = require('boom');
const { postMealPipe } = require('../../Meal');

module.exports = {
  validation: {
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        ingredients: Joi.array()
          .single()
          .required(),
        description: Joi.string(),
        tags: Joi.array()
          .single()
          .default([]),
        favorite: Joi.boolean().default(false)
      })
      .required()
  },
  async handler(req, res) {
    try {
      res.send(await postMealPipe(req.body));
    } catch (e) {
      res.send(boomify(e));
    }
  }
};
