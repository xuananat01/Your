module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': [
      'error',
      {endOfLine: 'auto'},
      {'no-inline-styles': 'false'},
    ],
    'react-native/no-inline-styles': 0,
    'no-unused-vars': 0,
  },
  settings: {
    'import/resolver': {
      alias: [
        ['@assets', './src/assets'],
        ['@components', './src/components'],
        ['@configs', './src/configs'],
        ['@context', './src/context'],
        ['@data', './src/data'],
        ['@i18n', './src/i18n'],
        ['@screens', './src/screens'],
        ['@redux', './src/redux'],
        ['@repository', './src/repository'],
        ['@routes', './src/routes'],
        ['@styles', './src/styles'],
        ['@utils', './src/utils'],
        ['@location', './src/location']
      ],
    },
  },
};
