/* eslint-disable no-undef */
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
    let getTags;
    let getAllMeals;

    beforeEach(() => {
      addMeal = {
        validation: 'validation',
        handler: 'handler'
      };

      getMeal = {
        validation: 'get',
        handler: 'meal'
      };

      getTags = {
        handler: 'get tags'
      };

      getAllMeals = {
        handler: 'get meals'
      };

      validate = sandbox.stub().returns('has been validated');

      methods = {
        post: sandbox.stub(),
        get: sandbox.stub()
      };

      methods.post.returns(methods);
      methods.get.returns(methods);

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
          getAllMeals,
          getMeal,
          getTags
        }
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should route with the correct params', async () => {
      should(expressStub.Router.callCount).equal(1);
      should(expressStub.Router.args).deepEqual([[]]);
      should(routeStub.route.callCount).equal(3);
      should(routeStub.route.args).deepEqual([
        ['/meals/'],
        ['/meals/:meal/'],
        ['/tags/'],
      ]);
      should(methods.post.callCount).equal(1);
      should(methods.post.args).deepEqual([['has been validated', 'handler']]);
      should(methods.get.callCount).equal(3);
      should(methods.get.args).deepEqual([
        ['get meals'],
        ['has been validated', 'meal'],
        ['get tags']
      ]);
      should(validate.callCount).equal(2);
    });
  });
});
