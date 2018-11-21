const {
  assoc, juxt, identity, last, over, map
} = require('ramda');
const { asyncPipe, lenses: { groceryItems } } = require('../../util');
const { setOldCurrentFalse, insertToMongo } = require('../../util/mongo');

module.exports = asyncPipe([
  over(groceryItems, map(item => ({ item, active: true }))),
  assoc('current', true),
  juxt([setOldCurrentFalse, insertToMongo('Groceries'), identity]),
  last
]);
