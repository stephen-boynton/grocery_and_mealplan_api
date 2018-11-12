const should = require('should');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

describe('util', () => {
  describe('mongo', () => {
    const sandbox = sinon.createSandbox();
    let mongo;
    let dbClassStub;
    let dbInnerStub;
    let getInstanceStub;
    let loggerStub;
    let insertOneStub;

    beforeEach(() => {
      insertOneStub = {
        insertOneAsync: sandbox.stub().returns('inserted!')
      };

      dbInnerStub = {
        collection: sandbox.stub().returns(insertOneStub)
      };
      loggerStub = {
        info: sandbox.stub(),
        error: sandbox.stub()
      };
      getInstanceStub = {
        getInstance: sandbox.stub().returns(dbInnerStub)
      };
      dbClassStub = sandbox.stub().returns(getInstanceStub);
      mongo = proxyquire('../../lib/util/mongo', {
        '../db': dbClassStub,
        './logger': loggerStub
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    describe('insertToMongo', () => {
      it('call all appropriate methods with appropriate values', async () => {
        const result = await mongo.insertToMongo('collection')('data');
        should(result).equal('inserted!');
        should(dbClassStub.callCount).equal(1);
        should(dbClassStub.calledWithNew()).equal(true);
        should(dbClassStub.args).deepEqual([[]]);
        should(getInstanceStub.getInstance.callCount).equal(1);
        should(getInstanceStub.getInstance.args).deepEqual([[]]);
        should(dbInnerStub.collection.callCount).equal(1);
        should(dbInnerStub.collection.args).deepEqual([['collection']]);
        should(insertOneStub.insertOneAsync.callCount).equal(1);
        should(insertOneStub.insertOneAsync.args).deepEqual([['data']]);
        should(loggerStub.info.callCount).equal(1);
        should(loggerStub.info.args).deepEqual([
          [['insertToMongo', 'writing to collection'], 'data']
        ]);
      });

      it('should log and throw if error', async () => {
        const err = new Error('err');
        insertOneStub.insertOneAsync.throws(err);
        try {
          await mongo.insertToMongo('collection')('data');
          should('not').equal('here');
        } catch (e) {
          should(e).deepEqual(err);
          should(dbClassStub.callCount).equal(1);
          should(dbClassStub.calledWithNew()).equal(true);
          should(dbClassStub.args).deepEqual([[]]);
          should(getInstanceStub.getInstance.callCount).equal(1);
          should(getInstanceStub.getInstance.args).deepEqual([[]]);
          should(dbInnerStub.collection.callCount).equal(1);
          should(dbInnerStub.collection.args).deepEqual([['collection']]);
          should(insertOneStub.insertOneAsync.callCount).equal(1);
          should(insertOneStub.insertOneAsync.args).deepEqual([['data']]);
          should(loggerStub.info.callCount).equal(1);
          should(loggerStub.info.args).deepEqual([
            [['insertToMongo', 'writing to collection'], 'data']
          ]);
          should(loggerStub.error.callCount).equal(1);
          should(loggerStub.error.args).deepEqual([[['insertToMongo'], e]]);
        }
      });
    });
  });
});
