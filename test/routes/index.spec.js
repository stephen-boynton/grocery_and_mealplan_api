const should = require('should');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

describe('routes', () => {
  describe('index', () => {
    const sandbox = sinon.createSandbox();
    let expressStub;
    let validate;
    let routeStub;
    let postStub;
    let addMeal;

    beforeEach(() => {
      addMeal = {
        validation: 'validation',
        handler: 'handler'
      };

      validate = sandbox.stub().returns('has been validated');

      postStub = {
        post: sandbox.stub().returns('post!')
      };

      routeStub = {
        route: sandbox.stub().returns(postStub)
      };

      expressStub = {
        Router: sandbox.stub().returns(routeStub)
      };

      proxyquire('../../lib/routes/index', {
        express: expressStub,
        'express-validation': validate,
        './handlers': {
          addMeal
        }
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should route with the correct params', async () => {
      should(expressStub.Router.callCount).equal(1);
      should(expressStub.Router.args).deepEqual([[]]);
      should(routeStub.route.callCount).equal(1);
      should(routeStub.route.args).deepEqual([['/meals/']]);
      should(postStub.post.callCount).equal(1);
      should(postStub.post.args).deepEqual([['has been validated', 'handler']]);
      should(validate.callCount).equal(1);
      should(validate.args).deepEqual([['validation']]);
    });
  });
});
