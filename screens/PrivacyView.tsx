import React from 'react';
import { View, Animated } from 'react-native';
import { styles } from '../components/styles/computed/styles';
import { Shadows } from '../components/elements/Shadows';
import { Shadowy } from '../components/elements/Shadowy';
import { PrivateBottomBar } from '../components/elements/PrivateBottomBar';
import { LinearGradient } from 'expo-linear-gradient';
import { PrivacyStartScreen } from './PrivacyStartScreen';
import { LayerShadow } from '../components/elements/LayerShadow';
import layercover from '../assets/images/layercover.png';

export const PrivacyView = ({
  viewFade,
  contentFade,
}: {
  viewFade: Animated.Value;
  contentFade: Animated.Value;
}) => {
  return (
  <Animated.View style={[styles.layout, { opacity: viewFade }]}>
  <Shadows />
  <LayerShadow fill={layercover}/>
  <LinearGradient colors={['#000000b5', '#000000e3']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.layerTint}/>
  <View style={styles.mainView}>
  <Animated.View style={[styles.startPage, { opacity: contentFade }]}>
  <PrivacyStartScreen contentFade={contentFade}/>
  </Animated.View>
  <Shadowy distance={130} color="#00000090" />
  <PrivateBottomBar contentFade={contentFade} />
  </View>
  </Animated.View>
  );
};