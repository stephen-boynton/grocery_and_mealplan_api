/* eslint-disable no-undef */
const sinon = require('sinon');
const should = require('should');
const proxyquire = require('proxyquire');

describe('Tags', () => {
  describe('helpers', () => {
    describe('findExistingTagsAndBuildTagsPayload', () => {
      const sandbox = sinon.createSandbox();
      let findAsyncStub;
      let pipe;

      beforeEach(() => {
        findAsyncStub = sandbox.stub();

        pipe = proxyquire(
          '../../../../lib/Tags/parseAndSaveTagsPipe/helpers/findExistingTagsAndBuildTagsPayload.js',
          {
            '../../../util/mongo': {
              findAsync: () => findAsyncStub
            }
          }
        );
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('should call appropriate functions, and return expect response', () => {
        findAsyncStub.returns('found!');
        const result = pipe([['one', 'two'], 'three']);
        should(result).deepEqual([
          'found!',
          [{ tag: 'one', meals: ['three'] }, { tag: 'two', meals: ['three'] }]
        ]);
        should(findAsyncStub.callCount).equal(1);
        should(findAsyncStub.args).deepEqual([
          [[{ tag: 'one' }, { tag: 'two' }]]
        ]);
      });
    });
  });
});
