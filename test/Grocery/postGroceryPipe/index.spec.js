/* eslint-disable no-undef */
const sinon = require('sinon');
const should = require('should');
const proxyquire = require('proxyquire');

describe('Grocery', () => {
  describe('postGroceryPipe', () => {
    const sandbox = sinon.createSandbox();
    let mongoStub;
    let pipe;
    let setStub;

    beforeEach(() => {
      mongoStub = sandbox.stub();
      setStub = sandbox.stub();
      pipe = proxyquire('../../../lib/Grocery/postGroceryPipe/index', {
        '../../util/mongo': {
          insertToMongo: () => mongoStub,
          setOldCurrentFalse: setStub
        }
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call appropriate functions, and return expect response', async () => {
      mongoStub.resolves('boom shakalakah');
      setStub.resolves('done did');
      const result = await pipe({ start: 'here we go', items: ['ham', 'thyme'] });
      should(result).deepEqual({
        start: 'here we go',
        items: [{ item: 'ham', active: true }, { item: 'thyme', active: true }],
        current: true
      });
      should(mongoStub.callCount).equal(1);
      should(mongoStub.args).deepEqual([[
        {
          start: 'here we go',
          items: [{ item: 'ham', active: true }, { item: 'thyme', active: true }],
          current: true
        }
      ]]);
      should(setStub.callCount).equal(1);
      should(setStub.args).deepEqual([[{
        start: 'here we go',
        items: [{ item: 'ham', active: true }, { item: 'thyme', active: true }],
        current: true
      }]]);
    });
  });
});
