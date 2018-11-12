const should = require('should');
const promiseAll = require('../../lib/util/promiseAll');

describe('util', () => {
  describe('promiseAll', () => {
    it('should allow all promises to resolve before returning', async () => {
      const fxs = [async () => 'one', async () => 'two', async () => 'three'];
      const results = await promiseAll(fxs.map(fx => fx()));
      should(results).deepEqual(['one', 'two', 'three']);
    });
  });
});
