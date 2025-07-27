import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

export default function BackdropBlurOverlay() {
  return (
    <View style={styles.container}>
      {/* Other content behind the blur */}

      {/* Backdrop Blur Overlay */}
      <BlurView
        style={styles.blurView}
        tint="dark"
        intensity={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 120,
    zIndex: 999,
  },
});
