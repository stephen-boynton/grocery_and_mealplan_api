module.exports = fx => async args => {
  await fx(args);
  return args;
};
