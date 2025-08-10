import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useCustomView = () => {
 const customizeViewY = useRef(new Animated.Value(300)).current;
 const customizeViewOpacity = useRef(new Animated.Value(0)).current;

 const showCustomView = () => {
 Animated.parallel([
 Animated.timing(customizeViewY, {
 toValue: 0,
 duration: 800,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: true,
 }),
 Animated.timing(customizeViewOpacity, {
 toValue: 1,
 duration: 800,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: true,
 })
 ]).start();
 };

 const hideCustomView = () => {
 Animated.parallel([
 Animated.timing(customizeViewY, {
 toValue: 300,
 duration: 800,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: true,
 }),
 Animated.timing(customizeViewOpacity, {
 toValue: 0,
 duration: 800,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: true,
 })
 ]).start();
 };

 const customizeViewStyle = {
 transform: [{ translateY: customizeViewY }],
 opacity: customizeViewOpacity
 };

 return {
 showCustomView,
 hideCustomView,
 customizeViewStyle
 };
};