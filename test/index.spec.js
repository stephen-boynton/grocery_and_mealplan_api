/* eslint-disable no-undef */
const sinon = require('sinon');
const should = require('should');
const proxyquire = require('proxyquire').noCallThru();

describe('lib index test', () => {
  const sandbox = sinon.createSandbox();
  let useStub;
  let listenStub;
  let expressStub;
  let dotenvStub;
  let bodyparserStub;
  let routesStub;
  let app;
  let index;
  let port;

  beforeEach(() => {
    useStub = sandbox.stub();
    listenStub = sandbox.stub();

    port = 3001;

    bodyparserStub = {
      json: sandbox.stub()
    };

    dotenvStub = {
      config: sandbox.stub()
    };

    app = {
      use: useStub,
      listen: listenStub
    };

    routesStub = sandbox.stub();
    expressStub = sandbox.stub().returns(app);

    index = proxyquire('../lib/index', {
      express: expressStub,
      dotenv: dotenvStub,
      'body-parser': bodyparserStub,
      './util': {
        port
      },
      './routes/index': routesStub
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call app.use and listen with correct params', () => {
    bodyparserStub.json.returns('json');
    index();
    should(useStub.callCount).equal(2);
    should(useStub.args[0][0]).equal('json');
    should(useStub.args[1][0]).equal('/');
    should(useStub.args[1][1]).be.type('function');
    should(listenStub.callCount).equal(1);
    should(listenStub.args[0][0]).equal(3001);
    should(listenStub.args[0][1]).be.type('function');
    should(bodyparserStub.json.callCount).equal(1);
    should(bodyparserStub.json.args).deepEqual([[]]);
  });
});
