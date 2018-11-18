const Database = require('../db');
const log = require('./logger');

const db = new Database().getInstance();


const genericMongoCall = call => collection => async (doc) => {
  try {
    console.log(db);
    log.info([call, `Collection: ${collection}`], doc);
    return await db.collection(collection)[call](doc);
  } catch (e) {
    log.error([call], e);
    throw e;
  }
};

const findAsync = collection => async (orArray) => {
  try {
    await db;
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
    await db;
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
  const result = await genericMongoCall('aggregateAsync')('Tags')([{ $projection: { tag: 1 } }]);
  return result.toArray();
};

module.exports = {
  insertToMongo: genericMongoCall('insertOneAsync'),
  insertMany: genericMongoCall('insertManyAsync'),
  findOneFromMongo: genericMongoCall('findOneAsync'),
  findAsync,
  getAllTags,
  upsertManyTags,
  genericMongoCall
};
