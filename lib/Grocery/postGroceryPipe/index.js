const {
  assoc, juxt, identity, last
} = require('ramda');
const { asyncPipe } = require('../../util');
const { setOldCurrentFalse, insertToMongo } = require('../../util/mongo');

module.exports = asyncPipe([
  assoc('current', true),
  juxt([setOldCurrentFalse, insertToMongo('Groceries'), identity]),
  last
]);
