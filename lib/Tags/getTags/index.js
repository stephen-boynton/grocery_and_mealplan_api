const { asyncPipe } = require('../../util');
const { getAllTags } = require('../../util/mongo');

module.exports = asyncPipe([
  getAllTags
]);
