const router = require('express').Router();
const validate = require('express-validation');
const {
  addMeal, getMeal, getAllMeals, getTags, postGroceries
} = require('./handlers');

router.route('/meals/')
  .post(validate(addMeal.validation), addMeal.handler)
  .get(getAllMeals.handler);

router.route('/meals/:meal/')
  .get(validate(getMeal.validation), getMeal.handler);

router.route('/tags/').get(getTags.handler);

router.route('/groceries/')
  .post(validate(postGroceries.validation), postGroceries.handler);

module.exports = router;
