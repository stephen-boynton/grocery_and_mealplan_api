const { over } = require('ramda');
const { ObjectId } = require('mongodb');
const { asyncPipe, lenses: { groceryIdLens } } = require('../../util');
const { toggleGroceryItem } = require('../../util/mongo');

module.exports = asyncPipe([
  over(groceryIdLens, ObjectId),
  toggleGroceryItem
]);
