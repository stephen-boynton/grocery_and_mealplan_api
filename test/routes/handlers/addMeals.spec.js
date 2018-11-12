const sinon = require('sinon');
const should = require('should');
const proxyquire = require('proxyquire').noCallThru();

describe('lib index test', () => {
  const sandbox = sinon.createSandbox();
  let postStub;
  let reqStub;
  let respStub;
  let addMealsHandler;

  beforeEach(() => {
    postStub = sandbox.stub().returns('posted!');
    reqStub = {
      body: 'meal'
    };

    respStub = {
      send: sandbox.stub()
    };

    addMealsHandler = proxyquire('../../../lib/routes/handlers/addMeals', {
      '../../Meal': {
        postMealPipe: postStub
      }
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call app.use and listen with correct params', async () => {
    await addMealsHandler.handler(reqStub, respStub);
    should(respStub.send.callCount).equal(1);
    should(respStub.send.args).deepEqual([['posted!']]);
  });
});
