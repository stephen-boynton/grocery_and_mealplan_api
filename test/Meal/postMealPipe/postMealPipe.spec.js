/* eslint-disable no-undef */
const sinon = require('sinon');
const should = require('should');
const proxyquire = require('proxyquire');

describe('Meal', () => {
  describe('postMealPipe', () => {
    const sandbox = sinon.createSandbox();
    const expected = { start: 'here we go', date_created: 1, date_modified: 1 };
    let mongoStub;
    let tagsPipeStub;
    let pipe;
    let clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers(1);
      mongoStub = sandbox.stub();
      tagsPipeStub = sandbox.stub();
      pipe = proxyquire('../../../lib/Meal/postMealPipe/index', {
        '../../util': {
          mongo: {
            insertToMongo: () => mongoStub
          }
        },
        '../../Tags': {
          parseAndSaveTagsPipe: tagsPipeStub
        }
      });
    });

    afterEach(() => {
      sandbox.restore();
      clock.restore();
    });

    it('should call appropriate functions, and return expect response', async () => {
      mongoStub.resolves({ insertedCount: 1 });
      const result = await pipe({ start: 'here we go' });
      should(mongoStub.callCount).equal(1);
      should(mongoStub.args).deepEqual([[expected]]);
      should(tagsPipeStub.callCount).equal(1);
      should(tagsPipeStub.args).deepEqual([[expected]]);
      should(result).deepEqual(expected);
    });
  });
});
