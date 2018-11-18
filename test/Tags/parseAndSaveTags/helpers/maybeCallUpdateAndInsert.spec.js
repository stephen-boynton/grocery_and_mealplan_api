/* eslint-disable no-undef */
const sinon = require('sinon');
const should = require('should');
const proxyquire = require('proxyquire');

describe('Tags', () => {
  describe('helpers', () => {
    describe('maybeCallUpdateAndInsert', () => {
      const sandbox = sinon.createSandbox();
      const data = {
        update: [
          { tag: 'test', meals: ['ham'] },
          { tag: 'test', meals: ['ham'] }
        ],
        insert: [{ tag: 'other test', meals: ['sandwich'] }]
      };
      let insertStub;
      let upsertStub;
      let pipe;

      beforeEach(() => {
        insertStub = sandbox.stub();
        upsertStub = sandbox.stub();

        pipe = proxyquire(
          '../../../../lib/Tags/parseAndSaveTagsPipe/helpers/maybeCallUpdateAndInsert.js',
          {
            '../../../util/mongo': {
              insertMany: () => insertStub,
              upsertManyTags: () => upsertStub
            }
          }
        );
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('should call upsert and insert if requirements are met, and return expect response', () => {
        insertStub.returns('inserted!');
        upsertStub.returns('upserted!');
        const result = pipe(data);
        should(result).deepEqual(['upserted!', 'inserted!']);
        should(insertStub.callCount).equal(1);
        should(insertStub.args).deepEqual([
          [
            [
              {
                meals: ['sandwich'],
                tag: 'other test'
              }
            ]
          ]
        ]);
        should(upsertStub.callCount).equal(1);
        should(upsertStub.args).deepEqual([
          [[{ tag: 'test' }, { tag: 'test' }], 'ham']
        ]);
      });

      it('should not call upsert and insert if no tags, and return expect response', () => {
        insertStub.returns('inserted!');
        upsertStub.returns('upserted!');
        const result = pipe({ update: [], insert: [] });
        should(result).deepEqual([null, null]);
        should(insertStub.callCount).equal(0);
        should(upsertStub.callCount).equal(0);
      });
    });
  });
});
