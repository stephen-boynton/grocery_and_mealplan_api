const MongoClient = require('mongodb');
const { promisifyAll } = require('bluebird');

const asyncMongo = promisifyAll(MongoClient).MongoClient;
const connection = process.env.DATABASE_URL;

class Database {
  constructor() {
    this.mongo = null;
  }

  async connect() {
    const success = await asyncMongo.connectAsync(connection);
    this.mongo = success.db('test');
    return this.mongo;
  }
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new Database();
    }
  }

  async getInstance() {
    return await Singleton.instance.connect();
  }
}

module.exports = Singleton;