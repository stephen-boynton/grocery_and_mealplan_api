const {
  flatten, groupBy, prop, props, values
} = require('ramda');
const {
  findExistingTagsAndBuildTagsPayload,
  separateTagsToUpdateOrInsert,
  maybeCallUpdateAndInsert
} = require('./helpers');
const { asyncPipe, promiseAll } = require('../../util');

module.exports = asyncPipe([
  props(['tags', '_id']),
  findExistingTagsAndBuildTagsPayload,
  promiseAll,
  flatten,
  groupBy(prop('tag')),
  values,
  separateTagsToUpdateOrInsert,
  maybeCallUpdateAndInsert,
  promiseAll
]);
