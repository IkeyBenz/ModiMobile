const plugins = [
  [
    'babel-plugin-module-resolver',
    {
      root: ['./src'],
    },
  ],
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '@modi',
        rootPathSuffix: 'src',
      },
    ],
  ],
};
