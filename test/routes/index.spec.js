const should = require('should');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

describe('routes', () => {
  describe('index', () => {
    const sandbox = sinon.createSandbox();
    let expressStub;
    let validate;
    let routeStub;
    let methods;
    let addMeal;
    let getMeal;

    beforeEach(() => {
      addMeal = {
        validation: 'validation',
        handler: 'handler'
      };

      getMeal = {
        validation: 'get',
        handler: 'meal'
      };

      validate = sandbox.stub().returns('has been validated');

      methods = {
        post: sandbox.stub().returns('post!'),
        get: sandbox.stub().returns('get!')
      };

      routeStub = {
        route: sandbox.stub().returns(methods)
      };

      expressStub = {
        Router: sandbox.stub().returns(routeStub)
      };

      proxyquire('../../lib/routes/index', {
        express: expressStub,
        'express-validation': validate,
        './handlers': {
          addMeal,
          getMeal
        }
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should route with the correct params', async () => {
      should(expressStub.Router.callCount).equal(1);
      should(expressStub.Router.args).deepEqual([[]]);
      should(routeStub.route.callCount).equal(2);
      should(routeStub.route.args).deepEqual([['/meals/'], ['/meals/:meal/']]);
      should(methods.post.callCount).equal(1);
      should(methods.post.args).deepEqual([['has been validated', 'handler']]);
      should(methods.get.callCount).equal(1);
      should(methods.get.args).deepEqual([['has been validated', 'meal']]);
      should(validate.callCount).equal(2);
      should(validate.args).deepEqual([['validation'], ['get']]);
    });
  });
});
