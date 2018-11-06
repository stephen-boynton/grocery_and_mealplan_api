const sinon = require('sinon');
const should = require('should');
const proxyquire = require('proxyquire');

describe('lib index test', () => {
  const sandbox = sinon.createSandbox();
  let useStub;
  let listenStub;
  let expressStub;
  let app;
  let index;

  beforeEach(() => {
    useStub = sandbox.stub();
    listenStub = sandbox.stub();
    app = {
      use: useStub,
      listen: listenStub
    };
    expressStub = sandbox.stub().returns(app);
    index = proxyquire('../lib/index', {
      express: expressStub
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should pass this test', () => {
    index();
    should(useStub.callCount).equal(1);
    should(useStub.args[0][0]).equal('/');
    should(useStub.args[0][1]).be.type('function');
    should(useStub.callCount).equal(1);
    should(listenStub.callCount).equal(1);
  });
});
