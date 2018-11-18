const MongoClient = require('mongodb');
const { promisifyAll } = require('bluebird');
const log = require('../util/logger');

const asyncMongo = promisifyAll(MongoClient).MongoClient;
const connection = process.env.DATABASE_URL;

class Database {
  constructor() {
    this.mongo = null;
  }

  async connect() {
    try {
      const success = await asyncMongo.connectAsync(connection);
      this.mongo = await success.db('test');
      log.info(['mongo connection established']);
      return this.mongo;
    } catch (e) {
      log.error(['mongo connection error'], e);
      throw e;
    }
  }
}

class AsyncSingleton {
  constructor() {
    if (!AsyncSingleton.instance) {
      AsyncSingleton.instance = new Database();
    }
  }

  /* eslint-disable class-methods-use-this */
  async getInstance() {
    return AsyncSingleton.instance.connect();
  }
  /* eslint-enable class-methods-use-this */
}

module.exports = AsyncSingleton;
