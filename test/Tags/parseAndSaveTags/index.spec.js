/* eslint-disable no-undef */
const sinon = require('sinon');
const should = require('should');
const proxyquire = require('proxyquire');

describe('Tags', () => {
  describe('parseAndSaveTagsPipe', () => {
    const sandbox = sinon.createSandbox();
    let findStub;
    let separateStub;
    let maybeStub;
    let pipe;

    beforeEach(() => {
      findStub = sandbox.stub();
      separateStub = sandbox.stub();
      maybeStub = sandbox.stub();
      pipe = proxyquire('../../../lib/Tags/parseAndSaveTagsPipe/index.js', {
        './helpers': {
          findExistingTagsAndBuildTagsPayload: findStub,
          separateTagsToUpdateOrInsert: separateStub,
          maybeCallUpdateAndInsert: maybeStub
        }
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call appropriate functions, and return expect response', async () => {
      findStub.returns(['array']);
      separateStub.returns('separate');
      maybeStub.returns(['maaaaaaybe']);
      const result = await pipe({ tags: 'tag', _id: 'id' });
      should(result).deepEqual(['maaaaaaybe']);
      should(findStub.callCount).equal(1);
      should(findStub.args).deepEqual([[['tag', 'id']]]);
      should(separateStub.callCount).equal(1);
      should(separateStub.args).deepEqual([[[['array']]]]);
      should(maybeStub.callCount).equal(1);
      should(maybeStub.args).deepEqual([['separate']]);
    });
  });
});
