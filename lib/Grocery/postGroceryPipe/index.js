const {
  assoc, juxt, identity, last, over, map
} = require('ramda');
const {
  asyncPipe,
  lenses: { groceryItems, dateCreatedLens, dateModifiedLens },
  promiseAll
} = require('../../util');
const { setOldCurrentFalse, insertToMongo } = require('../../util/mongo');

module.exports = asyncPipe([
  over(groceryItems, map(item => ({ item, active: 1 }))),
  over(dateCreatedLens, Date.now),
  over(dateModifiedLens, Date.now),
  assoc('current', true),
  juxt([setOldCurrentFalse, insertToMongo('Groceries'), identity]),
  promiseAll,
  last,
  over(groceryItems, map(({ item, active } = {}) => ({ item, active: Boolean(active) }))),
]);
