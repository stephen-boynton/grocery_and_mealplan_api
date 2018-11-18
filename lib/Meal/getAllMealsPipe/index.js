const { asyncPipe } = require('../../util');
const { getAllMeals } = require('../../util/mongo');

module.exports = asyncPipe([
  getAllMeals
]);
