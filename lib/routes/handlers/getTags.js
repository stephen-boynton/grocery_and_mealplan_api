const { boomify } = require('boom');
const { getTagsPipe } = require('../../Tags');

module.exports = {
  async handler(req, res) {
    try {
      res.send(await getTagsPipe());
    } catch (e) {
      res.send(boomify(e));
    }
  }
};
