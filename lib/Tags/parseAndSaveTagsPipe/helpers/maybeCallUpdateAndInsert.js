const {
  __, always, apply, dissoc, gt, ifElse, juxt, length, map, path, pipe, prop
} = require('ramda');

const { insertMany, upsertManyTags } = require('../../../util/mongo');

module.exports = juxt([
  pipe(
    juxt([
      pipe(prop('update'), map(dissoc('meals'))),
      pipe(path(['update', 0, 'meals', 0]))
    ]),
    ifElse(
      pipe(path([0]), length, gt(__, 0)),
      apply(upsertManyTags('Tags')),
      always(null)
    )
  ),
  ifElse(
    pipe(prop('insert'), length, gt(__, 0)),
    pipe(prop('insert'), insertMany('Tags')),
    always(null)
  )
]);
