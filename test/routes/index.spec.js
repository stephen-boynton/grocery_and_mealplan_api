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
    let postGroceries;

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

      postGroceries = {
        valdiation: 'post',
        handler: 'groceries'
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
          getTags,
          postGroceries
        }
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should route with the correct params', async () => {
      should(expressStub.Router.callCount).equal(1);
      should(expressStub.Router.args).deepEqual([[]]);
      should(routeStub.route.callCount).equal(4);
      should(routeStub.route.args).deepEqual([
        ['/meals/'],
        ['/meals/:meal/'],
        ['/tags/'],
        ['/groceries/'],
      ]);
      should(methods.post.callCount).equal(2);
      should(methods.post.args).deepEqual([
        ['has been validated', 'handler'],
        ['has been validated', 'groceries']
      ]);
      should(methods.get.callCount).equal(3);
      should(methods.get.args).deepEqual([
        ['get meals'],
        ['has been validated', 'meal'],
        ['get tags']
      ]);
      should(validate.callCount).equal(3);
    });
  });
});
