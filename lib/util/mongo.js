const Database = require('../db');
const log = require('./logger');


const genericMongoCall = call => collection => async (doc, options = {}) => {
  try {
    const db = await new Database().getInstance();
    log.info([call, `Collection: ${collection}`], doc);
    return await db.collection(collection)[call](doc, options);
  } catch (e) {
    log.error([call], e);
    throw e;
  }
};

const genericMongoCallWith3 = call => collection => async (doc, options = {}, extra = {}) => {
  try {
    const db = await new Database().getInstance();
    log.info([call, `Collection: ${collection}`], doc);
    return await db.collection(collection)[call](doc, options, extra);
  } catch (e) {
    log.error([call], e);
    throw e;
  }
};

const findAsync = collection => async (orArray) => {
  try {
    const db = await new Database().getInstance();
    log.info(['findAsync', `Collection: ${collection}`], orArray);
    const result = await db.collection(collection).findAsync({ $or: orArray });
    return result.toArray();
  } catch (e) {
    log.error(['findAsync'], e);
    throw e;
  }
};

const upsertManyTags = collection => async (tagArray, mealId) => {
  try {
    const db = await new Database().getInstance();

    log.info(['updateManyAsync', `Collection: ${collection}`], tagArray);

    return await db
      .collection(collection)
      .updateManyAsync({ $or: tagArray }, { $push: { meals: mealId } });
  } catch (e) {
    log.error(['updateManyAsync'], e);
    throw e;
  }
};

const getAllTags = async () => {
  const result = await genericMongoCall('aggregateAsync')('Tags')([{ $project: { tag: 1 } }]);
  return result.toArray();
};

const getAllMeals = async () => {
  const result = await genericMongoCall('findAsync')('Meals')();
  return result.toArray();
};

const setOldCurrentFalse = async () => {
  await genericMongoCall('updateOneAsync')('Groceries')({ current: true }, { $set: { current: false } });
  return null;
};

const getCurrentGrocery = async () => genericMongoCall('findOneAsync')('Groceries')({ current: true });

const toggleGroceryItem = async ({ grocery: _id, item } = {}) => genericMongoCallWith3('findOneAndUpdateAsync')('Groceries')({ _id },
  {
    $bit: {
      'items.$[item].active': { xor: 1 }
    },
    $set: { date_modified: Date.now() }
  }, {
    returnNewDocument: true,
    arrayFilters: [{ 'item.item': { $eq: item } }]
  });

module.exports = {
  insertToMongo: genericMongoCall('insertOneAsync'),
  insertMany: genericMongoCall('insertManyAsync'),
  findOneFromMongo: genericMongoCall('findOneAsync'),
  findAsync,
  getAllTags,
  getAllMeals,
  getCurrentGrocery,
  setOldCurrentFalse,
  toggleGroceryItem,
  upsertManyTags,
  genericMongoCall
};
