import React, { useState, useRef } from 'react';
import {
 Animated,
 Easing,
 Keyboard,
 Pressable,
 TextInput,
 TouchableOpacity,
 TouchableWithoutFeedback,
 View,
} from 'react-native';
import { PrivatePullButton, styles } from '../styles/computed/styles';
import { Break, Pad } from './Components';
import { BlurView } from 'expo-blur';
import { PrivacySearchBar } from './PrivacySearchBar';
import { AppsIcon, ArrowLeftIcon, ArrowUpIcon, DotIcon, HomeIcon, ProfileIcon, SearchIcon, WalletIcon } from '../icons/Icons';
import { useCustomView } from '../../context/CustomViewContext';
import { Blury } from './Blurry';

interface PrivateBottomBarProps {
 contentFade: Animated.Value;
 onSearchSubmit?: (query: string) => void;
 canGoBack?: boolean;
 canGoForward?: boolean;
 onGoBack?: () => void;
 onGoForward?: () => void;
}

const easing = Easing.bezier(0.16, 1, 0.29, 0.99);

export const PrivateBottomBar: React.FC<PrivateBottomBarProps> = ({ 
 contentFade, 
 onSearchSubmit,
 canGoBack = false,
 canGoForward = false,
 onGoBack,
 onGoForward
}) => {
 const [searchValue, setSearchValue] = useState('');
 const [isFocused, setIsFocused] = useState(false);
 const [activeAction, setActiveAction] = useState('home');
 const inputRef = useRef<TextInput>(null);

 const COLLAPSED_HEIGHT = 65;
 const EXPANDED_HEIGHT = 500;
 const COLLAPSED_RADIUS = 0;
 const EXPANDED_RADIUS = 40;

 const radiusAnim = useRef(new Animated.Value(COLLAPSED_RADIUS)).current;
 const focusLayerOpacity = useRef(new Animated.Value(0)).current;
 const bgColorAnim = useRef(new Animated.Value(0)).current;
 const searchWidthAnim = useRef(new Animated.Value(0)).current;
 const iconFadeSlideAnim = useRef(new Animated.Value(1)).current;

 const {
 privacyActionsGap,
 privacyActionsWidth,
 privacySearchHeight,
 privacyWidth,
 privacyScale,
 privacyRadius,
 loadSearchState,
 revertSearchState,
 showPrivacySearch,
 showPrivacyWallet,
 hidePrivacySwitch,
 showPrivacySwitch,
 setPrivacyBlurHeight,
 showPrivacyFeeds
 } = useCustomView();

 const backgroundColorInterpolate = bgColorAnim.interpolate({
 inputRange: [0, 1],
 outputRange: ['#ffffff00', '#ffffff15'],
 });

 const animateExpand = () => {
 Animated.parallel([
 Animated.timing(privacySearchHeight, {
 toValue: EXPANDED_HEIGHT,
 duration: 900,
 easing,
 useNativeDriver: false,
 }),
 Animated.timing(radiusAnim, {
 toValue: EXPANDED_RADIUS,
 duration: 900,
 easing,
 useNativeDriver: false,
 }),
 Animated.timing(privacyScale, {
 toValue: 1,
 duration: 900,
 easing,
 useNativeDriver: false,
 }),
 Animated.timing(focusLayerOpacity, {
 toValue: 1,
 duration: 900,
 easing,
 useNativeDriver: true,
 }),
 Animated.timing(bgColorAnim, {
 toValue: 1,
 duration: 900,
 easing,
 useNativeDriver: false,
 }),
 Animated.timing(searchWidthAnim, {
 toValue: 1,
 duration: 900,
 easing,
 useNativeDriver: false,
 }),
 Animated.timing(iconFadeSlideAnim, {
 toValue: 0,
 duration: 500,
 easing,
 useNativeDriver: true,
 }),
 ]).start();
 };

 const animateCollapse = () => {
 Animated.parallel([
 Animated.timing(privacySearchHeight, {
 toValue: COLLAPSED_HEIGHT,
 duration: 900,
 easing,
 useNativeDriver: false,
 }),
 Animated.timing(radiusAnim, {
 toValue: COLLAPSED_RADIUS,
 duration: 900,
 easing,
 useNativeDriver: false,
 }),
 Animated.timing(privacyScale, {
 toValue: .9,
 duration: 900,
 easing,
 useNativeDriver: false,
 }),
 Animated.timing(focusLayerOpacity, {
 toValue: 0,
 duration: 900,
 easing,
 useNativeDriver: true,
 }),
 Animated.timing(bgColorAnim, {
 toValue: 0,
 duration: 900,
 easing,
 useNativeDriver: false,
 }),
 Animated.timing(searchWidthAnim, {
 toValue: 0,
 duration: 900,
 easing,
 useNativeDriver: false,
 }),
 Animated.timing(iconFadeSlideAnim, {
 toValue: 1,
 duration: 500,
 easing,
 useNativeDriver: true,
 }),
 ]).start();
 };

 const handleCancel = () => {
 setSearchValue('');
 inputRef.current?.blur();
 setIsFocused(false);
 animateCollapse();
 Animated.timing(contentFade, {
 toValue: 1,
 duration: 400,
 easing,
 useNativeDriver: true,
 }).start();
 };

 const handleFocus = () => {
 setIsFocused(true);
 animateExpand();
 Animated.timing(contentFade, {
 toValue: 0,
 duration: 400,
 easing,
 useNativeDriver: true,
 }).start();
 };

 const handleBlur = () => {
 setIsFocused(false);
 if (searchValue === '') {
 animateCollapse();
 } else {
 Animated.parallel([
 Animated.timing(focusLayerOpacity, {
 toValue: 0,
 duration: 300,
 easing,
 useNativeDriver: true,
 }),
 Animated.timing(bgColorAnim, {
 toValue: 0,
 duration: 300,
 easing,
 useNativeDriver: false,
 }),
 Animated.timing(iconFadeSlideAnim, {
 toValue: 1,
 duration: 300,
 easing,
 useNativeDriver: true,
 }),
 Animated.timing(searchWidthAnim, {
 toValue: 0,
 duration: 400,
 easing,
 useNativeDriver: false,
 }),
 ]).start();
 }

 Animated.timing(contentFade, {
 toValue: 1,
 duration: 400,
 easing,
 useNativeDriver: true,
 }).start();
 };

 const handleLayerPress = () => {
 Keyboard.dismiss();
 };

 const handleActionPress = (actionName: string) => {
 setActiveAction(actionName);
 };

 const handleSearchSubmit = (query: string) => {
 if (onSearchSubmit) {
 onSearchSubmit(query);
 }
 inputRef.current?.blur();
 setIsFocused(false);
 animateCollapse();
 Animated.timing(contentFade, {
 toValue: 1,
 duration: 400,
 easing,
 useNativeDriver: true,
 }).start();
 };

 return (
 <>
 <Animated.View
 style={[
 styles.focusLayer,
 {
 opacity: focusLayerOpacity,
 pointerEvents: isFocused ? 'auto' : 'none',
 },
 ]}>
 <BlurView style={styles.focusLayer} intensity={40} tint="dark">
 <TouchableWithoutFeedback onPress={handleLayerPress}>
 <View style={{ flex: 1 }} />
 </TouchableWithoutFeedback>
 </BlurView>
 </Animated.View>

 <Animated.View
 style={[
 styles.PrivacyBottomBar,
 {
 width: privacyWidth,
 borderRadius: privacyRadius,
 backgroundColor: '#ffffff20',
 borderTopWidth: 1.5,
 borderLeftWidth: 1.5,
 borderRightWidth: 1.5,
 borderColor: '#ffffff25',
 transform: [{scale:privacyScale},{translateY:-15}]
 },
 ]}>
 <Animated.View style={{ height: privacySearchHeight, overflow: 'hidden' }}>
 <View style={styles.PrivateBottomLayer}>
 <Break py={2} />
 <Pad direction="row" justify='flex-end' style={styles.wFull} gap={0}> 
 <View style={[styles.alignStart,styles.wFull]}>
 <Animated.View
 style={{
 opacity: iconFadeSlideAnim,
 transform: [
 {
 translateX: iconFadeSlideAnim.interpolate({
 inputRange: [0, 1],
 outputRange: [-10, 0],
 }),
 },
 ],
 }}>
 <Pad direction='row' gap={10}>
 <PrivatePullButton onPress={onGoBack ? onGoBack : undefined}>
 <View style={styles.absolute}>
 <ArrowLeftIcon 
 width={17} 
 height={17} 
 opacity={canGoBack ? 1 : 0.3}/>
 </View>
 </PrivatePullButton>
 <PrivatePullButton onPress={onGoForward ? onGoForward : undefined}>
 <View style={styles.absolute}>
 <ArrowLeftIcon 
 width={17} 
 height={17} 
 opacity={canGoForward ? 1 : 0.3} 
 style={{transform:[{rotate:'90deg'}]}}/>
 </View>
 </PrivatePullButton>
 </Pad>
 </Animated.View>
 </View>

 <Animated.View
 style={{
 width: searchWidthAnim.interpolate({
 inputRange: [0, 1],
 outputRange: ['73%', '100%'],
 }),
 display: 'flex',
 position: 'absolute'
 }}>
 <PrivacySearchBar
 ref={inputRef}
 value={searchValue}
 onTextChanged={setSearchValue}
 onCancel={handleCancel}
 onFocus={handleFocus}
 onBlur={handleBlur}
 onSubmit={handleSearchSubmit}
 />
 </Animated.View>
 </Pad>
 </View>
 </Animated.View>
 <Animated.View style={{
 paddingVertical: 10,
 paddingHorizontal: 10,
 flexDirection: 'row',
 gap: privacyActionsGap
 }}>
 <Animated.View 
 style={[
 styles.PrivacyActions,
 activeAction === 'home' ? styles.PrivacyActionsActive : styles.PrivacyActionsInactive,
 { opacity: activeAction === 'home' ? 1 : 0.7, paddingHorizontal: privacyActionsWidth}
 ]}
 onTouchStart={() => {
 handleActionPress('home');
 revertSearchState();
 showPrivacyFeeds();
 showPrivacySwitch();
 setPrivacyBlurHeight(90);
 }}>
 <HomeIcon width={25} height={25} strokeWidth={2.1} style={{position:'absolute'}}/>
 </Animated.View>
 <Animated.View 
 style={[
 styles.PrivacyActions,
 activeAction === 'apps' ? styles.PrivacyActionsActive : styles.PrivacyActionsInactive,
 { opacity: activeAction === 'apps' ? 1 : 0.7, paddingHorizontal: privacyActionsWidth}
 ]}
 onTouchStart={() => {
 handleActionPress('apps');
 setPrivacyBlurHeight(90)
 setTimeout(() => {
 revertSearchState();
 }, 1000);
 }}>
 <AppsIcon width={25} height={25} strokeWidth={2.1} style={{position:'absolute'}}/>
 </Animated.View>
 <Animated.View 
 style={[
 styles.PrivacyActions,
 activeAction === 'search' ? styles.PrivacyActionsActive : styles.PrivacyActionsInactive,
 { opacity: activeAction === 'search' ? 1 : 0.7, paddingHorizontal: privacyActionsWidth}
 ]}
 onTouchStart={() => {
 handleActionPress('search');
 setTimeout(() => {
 loadSearchState();
 }, 1000);
 showPrivacySearch();hidePrivacySwitch();setPrivacyBlurHeight(145)}}>
 <SearchIcon width={25} height={25} strokeWidth={2.1} style={{position:'absolute'}}/>
 </Animated.View>
 <Animated.View 
 style={[
 styles.PrivacyActions,
 activeAction === 'wallet' ? styles.PrivacyActionsActive : styles.PrivacyActionsInactive,
 { opacity: activeAction === 'wallet' ? 1 : 0.7, paddingHorizontal: privacyActionsWidth}
 ]}
 onTouchStart={() => {
 handleActionPress('wallet');
 setTimeout(() => {
 revertSearchState();
 }, 1000);
 showPrivacyWallet();showPrivacySwitch();setPrivacyBlurHeight(90)}}>
 <WalletIcon width={25} height={25} strokeWidth={2.1} style={{position:'absolute'}}/>
 </Animated.View>
 <Animated.View 
 style={[
 styles.PrivacyActions,
 activeAction === 'profile' ? styles.PrivacyActionsActive : styles.PrivacyActionsInactive,
 { opacity: activeAction === 'profile' ? 1 : 0.7, paddingHorizontal: privacyActionsWidth}
 ]}
 onTouchStart={() => {handleActionPress('profile');revertSearchState();setPrivacyBlurHeight(90)}}>
 <ProfileIcon width={20} height={20} strokeWidth={2.1} style={{position:'absolute'}}/>
 </Animated.View>
 </Animated.View>
 </Animated.View>
 </>
 );
};