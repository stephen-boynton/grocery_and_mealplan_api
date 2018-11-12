const Database = require('../db');
const log = require('./logger');

exports.insertToMongo = collection => async doc => {
  try {
    const db = await new Database().getInstance();
    log.info(['insertToMongo', `writing to ${collection}`], doc);
    return await db.collection(collection).insertOneAsync(doc);
  } catch (e) {
    log.error(['insertToMongo'], e);
    throw e;
  }
};

exports.findOneFromMongo = collection => async searchObj => {
  try {
    const db = await new Database().getInstance();
    log.info(['findOneFromMongo', `finding from ${collection}`], searchObj);
    const result = await db.collection(collection).findOneAsync(searchObj);
    console.log(result);
    return result;
  } catch (e) {
    log.error(['findOneFromMongo'], e);
    throw e;
  }
};
