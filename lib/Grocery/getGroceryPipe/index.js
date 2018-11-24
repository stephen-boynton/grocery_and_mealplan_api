const {
  ifElse,
  isNil,
  complement,
  prop,
  identity,
  assoc,
  __
} = require('ramda');
const { ObjectId } = require('mongodb');
const { notFound } = require('boom');
const {
  asyncPipe,
  mongo: { findOneFromMongo }
} = require('../../util');

const isNotNil = complement(isNil);

module.exports = asyncPipe([
  prop('grocery'),
  ObjectId,
  assoc('_id', __, {}),
  findOneFromMongo('Groceries'),
  ifElse(isNotNil, identity, () => {
    throw notFound('Meal not found');
  })
]);
