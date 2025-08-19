module.exports = {
  rules: {
    'header-pattern': [
      2,
      'always',
      /^#\d+ \[[A-Z]+\] .+$/,
    ],
    'header-max-length': [2, 'always', 72],
  },
};