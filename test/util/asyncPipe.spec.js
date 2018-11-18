/* eslint-disable no-undef */

const should = require('should');
const asyncPipe = require('../../lib/util/asyncPipe');

describe('util', () => {
  describe('asyncPipe', () => {
    const arrayOfFxs = [
      async x => `${x}i`,
      async x => `${x}t`,
      async x => `${x}o`
    ];
    it('should pipe each async function into the next', async () => {
      should(await asyncPipe(arrayOfFxs)('mosqu')).equal('mosquito');
    });
  });
});
