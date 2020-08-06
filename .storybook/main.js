module.exports = {
  stories: ['../output/**/*.Story/index.js'],
  addons: [],
  webpackFinal: async config => {
    // do mutation to the config
    return config;
  },
};
