import 'react-native-get-random-values';
import { Buffer } from 'buffer';

// Polyfill Buffer globally
global.Buffer = Buffer;

// Polyfill crypto.getRandomValues
if (typeof global.crypto === 'undefined') {
  global.crypto = {
    getRandomValues: (array: Uint8Array) => {
      const { getRandomBytes } = require('expo-crypto');
      const bytes = getRandomBytes(array.length);
      array.set(bytes);
      return array;
    }
  } as any;
}