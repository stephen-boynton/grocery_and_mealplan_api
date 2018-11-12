const { over, ifElse, pathEq, juxt, identity, last } = require('ramda');
const Boom = require('boom');
const {
  asyncPipe,
  lenses: { dateCreatedLens, dateModifiedLens },
  mongo: { insertToMongo },
  promiseAll
} = require('../../util');

module.exports = asyncPipe([
  over(dateCreatedLens, Date.now),
  over(dateModifiedLens, Date.now),
  juxt([insertToMongo('Meals'), identity]),
  promiseAll,
  ifElse(pathEq([0, 'insertedCount'], 1), last, resp => {
    throw new Boom('insertToMongo failed', { statusCode: 500, payload: resp });
  })
]);
