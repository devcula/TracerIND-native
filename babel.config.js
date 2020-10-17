module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'babel-preset-expo'],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'module:react-native-dotenv'],
    },
    development: {
      plugins: ['module:react-native-dotenv'],
    },
  },
};
