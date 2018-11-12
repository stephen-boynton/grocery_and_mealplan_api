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
