// AppLoader.tsx
import React from 'react';
import * as Font from 'expo-font';
import App from './App';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLoader() {
  const [fontsLoaded] = Font.useFonts({
    'Font-Regular': require('./components/fonts/SF-Pro-Rounded-Medium.otf'),
    'Font-Bold': require('./components/fonts/SF-Pro-Rounded-Bold.otf'),
    'Font-Heavy': require('./components/fonts/SF-Pro-Rounded-Heavy.otf'),
  });

  if (!fontsLoaded) {
    return (
      <GestureHandlerRootView style={loaderStyles.loader}>
        <ActivityIndicator size="large" color="#0025c8" />
      </GestureHandlerRootView>
    );
  }

  return <App />;
}

const loaderStyles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});