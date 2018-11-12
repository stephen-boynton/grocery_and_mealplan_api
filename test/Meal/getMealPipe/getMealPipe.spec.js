const sinon = require('sinon');
const should = require('should');
const proxyquire = require('proxyquire').noCallThru();
const { asyncPipe } = require('../../../lib/util');

describe('Meal', () => {
  describe('getMealPipe', () => {
    const sandbox = sinon.createSandbox();
    const expected = { meal: 1 };
    let mongoStub;
    let objectIdStub;
    let pipe;

    beforeEach(() => {
      mongoStub = sandbox.stub();
      objectIdStub = sandbox.stub().returns('id!');
      pipe = proxyquire('../../../lib/Meal/getMealPipe/index', {
        '../../util': {
          mongo: {
            findOneFromMongo: () => mongoStub
          },
          asyncPipe: asyncPipe
        },
        mongodb: {
          ObjectId: objectIdStub
        },
        ramda: {
          '@noCallThru': false
        }
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call expected functions, with expected params', async () => {
      mongoStub.resolves({ meal: 1 });
      const result = await pipe({ start: 'here we go' });
      should(mongoStub.callCount).equal(1);
      should(mongoStub.args).deepEqual([[{ _id: 'id!' }]]);
      should(result).deepEqual(expected);
    });

    it('fail and return 404 if no results from mongo', async () => {
      mongoStub.resolves(null);
      try {
        await pipe({ start: 'here we go' });
      } catch (e) {
        should(mongoStub.callCount).equal(1);
        should(mongoStub.args).deepEqual([[{ _id: 'id!' }]]);
        should(e.isBoom).equal(true);
      }
    });
  });
});
