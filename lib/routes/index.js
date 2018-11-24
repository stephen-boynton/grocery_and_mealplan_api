const router = require('express').Router();
const validate = require('express-validation');
const {
  addMeal, getMeal, getAllMeals, getTags, postGroceries, putGroceryItemActive,
  getGrocery, getCurrentGrocery
} = require('./handlers');

router.route('/meals/')
  .post(validate(addMeal.validation), addMeal.handler)
  .get(getAllMeals.handler);

router.route('/meals/:meal/')
  .get(validate(getMeal.validation), getMeal.handler);

router.route('/tags/').get(getTags.handler);

router.route('/groceries/')
  .post(validate(postGroceries.validation), postGroceries.handler);

router.route('/groceries/current/')
  .get(getCurrentGrocery.handler);

router.route('/groceries/:grocery')
  .get(validate(getGrocery.validation), getGrocery.handler);

router.route('/groceries/:grocery/items/')
  .put(validate(putGroceryItemActive.validation), putGroceryItemActive.handler);

module.exports = router;
