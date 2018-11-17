const { __, juxt, pipe, head, map, assoc, tap } = require('ramda');
const { findAsync } = require('../../../util/mongo');

module.exports = juxt([
  pipe(
    head,
    map(assoc('tag', __, {})),
    findAsync('Tags')
  ),
  ([tags, id]) => map(tag => ({ tag, meals: [id] }), tags)
]);
