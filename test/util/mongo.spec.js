/* eslint-disable no-undef */
const should = require('should');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

describe('util', () => {
  describe('mongo', () => {
    const sandbox = sinon.createSandbox();
    let mongo;
    let dbInnerStub;
    let loggerStub;
    let innerMongo;
    let findOneReturn;

    beforeEach(() => {
      findOneReturn = {
        toArray: sandbox.stub()
      };
      innerMongo = {
        findAsync: sandbox.stub().returns(findOneReturn),
        findOneAsync: sandbox.stub().returns('found one!'),
        insertManyAsync: sandbox.stub().returns('inserted many!'),
        updateManyAsync: sandbox.stub().returns('updated many!')
      };

      dbInnerStub = {
        collection: sandbox.stub().returns(innerMongo)
      };
      loggerStub = {
        info: sandbox.stub(),
        error: sandbox.stub()
      };

      mongo = proxyquire('../../lib/util/mongo', {
        '../db': dbInnerStub,
        './logger': loggerStub
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    describe('findAn', () => {
      it('call all appropriate methods with appropriate values', async () => {
        await mongo.genericMongoCall('findOneAsync')('collection')('data');
        should(dbInnerStub.collection.callCount).equal(1);
        should(dbInnerStub.collection.args).deepEqual([['collection']]);
        should(innerMongo.findOneAsync.callCount).equal(1);
        should(innerMongo.findOneAsync.args).deepEqual([['data']]);
        should(loggerStub.info.callCount).equal(1);
        should(loggerStub.info.args).deepEqual([
          [['findOneAsync', 'Collection: collection'], 'data']
        ]);
      });

      it('should log and throw if error', async () => {
        const err = new Error('err');
        innerMongo.findOneAsync.throws(err);
        try {
          await mongo.genericMongoCall('findOneAsync')('collection')('data');
          should('not').equal('here');
        } catch (e) {
          should(e).deepEqual(err);

          should(dbInnerStub.collection.callCount).equal(1);
          should(dbInnerStub.collection.args).deepEqual([['collection']]);
          should(innerMongo.findOneAsync.callCount).equal(1);
          should(innerMongo.findOneAsync.args).deepEqual([['data']]);
          should(loggerStub.info.callCount).equal(1);
          should(loggerStub.info.args).deepEqual([
            [['findOneAsync', 'Collection: collection'], 'data']
          ]);
          should(loggerStub.error.callCount).equal(1);
          should(loggerStub.error.args).deepEqual([[['findOneAsync'], e]]);
        }
      });
    });

    describe('findAsync', () => {
      it('call all appropriate methods with appropriate values', async () => {
        await mongo.findAsync('collection')('data');
        should(dbInnerStub.collection.callCount).equal(1);
        should(dbInnerStub.collection.args).deepEqual([['collection']]);
        should(innerMongo.findAsync.callCount).equal(1);
        should(innerMongo.findAsync.args).deepEqual([[{ $or: 'data' }]]);
        should(loggerStub.info.callCount).equal(1);
        should(loggerStub.info.args).deepEqual([
          [['findAsync', 'Collection: collection'], 'data']
        ]);
      });

      it('should log and throw if error', async () => {
        const err = new Error('err');
        innerMongo.findAsync.throws(err);
        try {
          await mongo.findAsync('collection')('data');
          should('not').equal('here');
        } catch (e) {
          should(e).deepEqual(err);

          should(dbInnerStub.collection.callCount).equal(1);
          should(dbInnerStub.collection.args).deepEqual([['collection']]);
          should(innerMongo.findAsync.callCount).equal(1);
          should(innerMongo.findAsync.args).deepEqual([[{ $or: 'data' }]]);
          should(loggerStub.info.callCount).equal(1);
          should(loggerStub.info.args).deepEqual([
            [['findAsync', 'Collection: collection'], 'data']
          ]);
          should(loggerStub.error.callCount).equal(1);
          should(loggerStub.error.args).deepEqual([[['findAsync'], e]]);
        }
      });
    });

    describe('upsertManyTags', () => {
      it('call all appropriate methods with appropriate values', async () => {
        await mongo.upsertManyTags('collection')('data', 'meal');
        should(dbInnerStub.collection.callCount).equal(1);
        should(dbInnerStub.collection.args).deepEqual([['collection']]);
        should(innerMongo.updateManyAsync.callCount).equal(1);
        should(innerMongo.updateManyAsync.args).deepEqual([
          [{ $or: 'data' }, { $push: { meals: 'meal' } }]
        ]);
        should(loggerStub.info.callCount).equal(1);
        should(loggerStub.info.args).deepEqual([
          [['updateManyAsync', 'Collection: collection'], 'data']
        ]);
      });

      it('should log and throw if error', async () => {
        const err = new Error('err');
        innerMongo.updateManyAsync.throws(err);
        try {
          await mongo.upsertManyTags('collection')('data', 'meal');
          should('not').equal('here');
        } catch (e) {
          should(e).deepEqual(err);

          should(dbInnerStub.collection.callCount).equal(1);
          should(dbInnerStub.collection.args).deepEqual([['collection']]);
          should(innerMongo.updateManyAsync.callCount).equal(1);
          should(innerMongo.updateManyAsync.args).deepEqual([
            [{ $or: 'data' }, { $push: { meals: 'meal' } }]
          ]);
          should(loggerStub.info.callCount).equal(1);
          should(loggerStub.info.args).deepEqual([
            [['updateManyAsync', 'Collection: collection'], 'data']
          ]);
          should(loggerStub.error.callCount).equal(1);
          should(loggerStub.error.args).deepEqual([[['updateManyAsync'], e]]);
        }
      });
    });
  });
});
