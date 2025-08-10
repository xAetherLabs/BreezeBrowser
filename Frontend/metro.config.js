// metro.config.js - Update your metro config
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add node_modules polyfills
config.resolver.alias = {
  ...config.resolver.alias,
  crypto: 'react-native-crypto',
  stream: 'readable-stream',
  buffer: 'buffer',
};

config.resolver.fallback = {
  ...config.resolver.fallback,
  crypto: require.resolve('react-native-crypto'),
  stream: require.resolve('readable-stream'),
  buffer: require.resolve('buffer'),
  process: require.resolve('process/browser'),
};

module.exports = config;