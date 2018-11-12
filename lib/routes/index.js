const router = require('express').Router();
const validate = require('express-validation');
const { addMeal, getMeal } = require('./handlers');

router.route('/meals/').post(validate(addMeal.validation), addMeal.handler);
router
  .route('/meals/:meal/')
  .get(validate(getMeal.validation), getMeal.handler);

module.exports = router;
