const stringStandardizer = (titleString) =>
  titleString
    .split(' ')
    .join('-')
    .split(':')
    .join('-')
    .toLowerCase();

module.exports = {
  stringStandardizer: stringStandardizer,
};
