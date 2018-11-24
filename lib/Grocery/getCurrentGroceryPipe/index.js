const {
  ifElse, isNil, complement, identity
} = require('ramda');
const { notFound } = require('boom');
const {
  asyncPipe,
  mongo: { getCurrentGrocery }
} = require('../../util');

const isNotNil = complement(isNil);

module.exports = asyncPipe([
  getCurrentGrocery,
  ifElse(isNotNil, identity, () => {
    throw notFound('Meal not found');
  })
]);
