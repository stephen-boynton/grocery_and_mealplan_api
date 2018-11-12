module.exports = fxList => async args =>
  fxList.reduce(async (acc, fx) => fx(await acc), args);
