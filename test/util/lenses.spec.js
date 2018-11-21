/* eslint-disable no-undef */

const should = require('should');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

describe('util', () => {
  describe('lenses', () => {
    const sandbox = sinon.createSandbox();
    let lensStub;
    let propStub;
    let assocStub;

    beforeEach(() => {
      lensStub = sandbox.stub();
      propStub = sandbox.stub().returns('prop!');
      assocStub = sandbox.stub().returns('assoc!');
      proxyquire('../../lib/util/lenses', {
        ramda: {
          lens: lensStub,
          prop: propStub,
          assoc: assocStub
        }
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should build lenses with the correct params', async () => {
      should(lensStub.callCount).equal(3);
      should(lensStub.args).deepEqual([
        ['prop!', 'assoc!'],
        ['prop!', 'assoc!'],
        ['prop!', 'assoc!'],
      ]);
      should(propStub.callCount).equal(3);
      should(propStub.args).deepEqual([
        ['date_created'], ['date_modified'], ['items']
      ]);
      should(assocStub.callCount).equal(3);
      should(assocStub.args).deepEqual([
        ['date_created'], ['date_modified'], ['items']
      ]);
    });
  });
});
