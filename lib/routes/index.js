const router = require('express').Router();
const validate = require('express-validation');
const { addMeal, getMeal, getTags } = require('./handlers');

router.route('/meals/').post(validate(addMeal.validation), addMeal.handler);
router
  .route('/meals/:meal/')
  .get(validate(getMeal.validation), getMeal.handler);

router.route('/tags/').get(getTags.handler);

module.exports = router;
