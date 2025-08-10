import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

interface ShadowyProps {
  distance: number;
  color: string;
  height: number;
}

export const Shadowy: React.FC<ShadowyProps> = ({ distance, color, height }) => {
  return (
  <View style={containerStyle}>
  <Shadow distance={distance} style={{height:height}} offset={[0, 0]} startColor={color}>
  <View style={shadowContentStyle}></View>
  </Shadow>
  </View>
  );
};

const containerStyle: ViewStyle = {
  width: '100%',
  position: 'absolute',
  bottom: 0,
  // zIndex: -99
};

const shadowContentStyle: ViewStyle = {
  width: '100%'
};