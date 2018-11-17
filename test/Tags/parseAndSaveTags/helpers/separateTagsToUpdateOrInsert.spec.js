const should = require('should');
const {
  separateTagsToUpdateOrInsert
} = require('../../../../lib/Tags/parseAndSaveTagsPipe/helpers');

describe('Tags', () => {
  describe('helpers', () => {
    describe('separateTagsToUpdateOrInsert', () => {
      it('should separate correctly using logic', () => {
        const result = separateTagsToUpdateOrInsert([
          [{ _id: 'ham', data: 'data' }, { test: 'test' }],
          ['checking this one']
        ]);
        return should(result).deepEqual({
          update: [{ test: 'test' }],
          insert: ['checking this one']
        });
      });

      it('should produce empty update when no double array contains 2 or more', () => {
        const result = separateTagsToUpdateOrInsert([['more data']]);
        return should(result).deepEqual({
          update: [],
          insert: ['more data']
        });
      });
    });
  });
});
