const { gt, length, filter } = require('ramda');

module.exports = (arr = []) =>
  arr.reduce(
    (acc, curr) => {
      if (gt(length(curr), 1)) {
        acc.update = [...acc.update, ...filter(({ _id }) => !_id, curr)];
        return acc;
      }
      acc.insert = [...acc.insert, ...curr];
      return acc;
    },
    { update: [], insert: [] }
  );
