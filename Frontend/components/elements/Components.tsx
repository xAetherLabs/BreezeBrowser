import React from 'react';
import { View, ViewStyle, ViewProps, StyleSheet, TouchableOpacityProps, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PadProps extends ViewProps {
  px?: number;
  py?: number;
  gap?: number;
  direction?: 'row' | 'column';
  align?: 'center' | 'baseline' | 'stretch' | 'flex-start' | 'flex-end';
  justify?: 'center' | 'space-around' | 'space-between' | 'space-evenly' | 'flex-start' | 'flex-end';
  children?: React.ReactNode;
}

interface BreakProps extends ViewProps {
  px?: number;
  py?: number;
  children?: React.ReactNode;
}

interface ButtonProps extends TouchableOpacityProps {
  px?: number;
  py?: number;
  children?: React.ReactNode;
}

export const Pad: React.FC<PadProps> = ({ px = 0, py = 0, direction = 'column', gap, justify = 'center', align = 'center', style, children, ...rest }) => {
  const padStyle: ViewStyle = {
  gap: gap,
  paddingLeft: px,
  paddingRight: px,
  paddingVertical: py,
  flexDirection: direction,
  justifyContent: justify,
  alignItems: align
  };

  return (
  <View style={[padStyle, style]} {...rest}>
  {children}
  </View>
  );
};

export const Break: React.FC<BreakProps> = ({ px = 0, py = 0, children, style, ...rest }) => {
  const BreakStyle: ViewStyle = {
  paddingLeft: px,
  paddingRight: px,
  paddingTop: py,
  paddingBlock: py
  };

  return (
  <View style={[BreakStyle, style]} {...rest}>
    {children}
  </View>
  );
};

export const Button: React.FC<ButtonProps> = ({ px = 0, py = 0, children, style, ...rest }) => {
  const GradientStyle: ViewStyle = {
  paddingLeft: px,
  paddingRight: px,
  paddingTop: py,
  paddingBlock: py
  };
  return (
  <LinearGradient
  colors={['#ffffff', '#ffffff90', '#ffffff80', '#ffffff50']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.gradientBorder} {...rest}>
  <View style={styles.innerBox}>
  <Text>{children}</Text>
  </View>
  </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
  padding: 2,
  borderRadius: 100,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
  },
  innerBox: {
  backgroundColor: '#F3F4f9',
  borderRadius: 100,
  paddingLeft: 14,
  paddingRight: 14,
  paddingTop: 6,
  paddingBlock: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
  }
});