const router = require('express').Router();
const validate = require('express-validation');
const { addMeal } = require('./handlers');

router.route('/meals/').post(validate(addMeal.validation), addMeal.handler);

module.exports = router;
