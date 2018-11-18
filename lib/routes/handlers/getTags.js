const { boomify } = require('boom');
const { getTagsPipe } = require('../../Tags');

module.exports = {
  async handler(req, res) {
    try {
      res.send(await getTagsPipe());
    } catch (e) {
      console.error(e);
      res.send(boomify(e));
    }
  }
};
