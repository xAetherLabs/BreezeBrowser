import React from 'react';
import { Text, TextProps, StyleSheet, View } from 'react-native';

interface TextBoxProps extends TextProps {
  children: React.ReactNode;
  color: string;
  size: number;
}

export const TextMed: React.FC<TextBoxProps> = ({ children, size, color, style, ...rest }) => {
  return (
  <Text style={{fontFamily:'Font-Regular',fontSize:size,color:color,opacity:.7}} {...rest}>{children}</Text>
  );
};

export const TextBold: React.FC<TextBoxProps> = ({ children, size, color, style, ...rest }) => {
  return (
  <Text style={{fontFamily:'Font-Bold',fontSize:size,color:color,opacity:.7}} {...rest}>{children}</Text>
  );
};

export const TextHeavy: React.FC<TextBoxProps> = ({ children, size, color, style, ...rest }) => {
  return (
  <Text style={{fontFamily:'Font-Heavy',fontSize:size,color:color,opacity:.7}} {...rest}>{children}</Text>
  );
};