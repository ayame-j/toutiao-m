module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8'],
    },
    'postcss-pxtorem': {
      rootValue() {
        return 75;
      },
      //   rootValue: 75,
      propList: ['*'],
    },
  },
};
