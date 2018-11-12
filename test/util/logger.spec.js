const should = require('should');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

describe('util', () => {
  describe('logger', () => {
    const sandbox = sinon.createSandbox();
    let createStub;

    beforeEach(() => {
      createStub = sandbox.stub();

      proxyquire('../../lib/util/logger', {
        bunyan: {
          createLogger: createStub
        }
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should build lenses with the correct params', async () => {
      should(createStub.callCount).equal(1);
      should(createStub.args).deepEqual([[{ name: 'Boynblat Groceries' }]]);
    });
  });
});
