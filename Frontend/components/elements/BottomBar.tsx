import React, { useEffect, useRef, useState } from 'react';
import {
 Animated,
 TextInput,
 TouchableOpacity,
 TouchableWithoutFeedback,
 View,
 StyleSheet,
 Easing,
 Pressable,
 PanResponder,
} from 'react-native';
import { AddButton, PullButton, styles } from '../styles/computed/styles';
import { Break, Pad } from './Components';
import { ArrowLeftDarkIcon, ArrowRightDarkIcon, ArrowUpIcon, AuxingIcon, BookerIcon, BookIcon, DesktopIcon, FindIcon, PlusIcon, RefreshIcon, ShareIcon, TabIconDark } from '../icons/Icons';
import { SearchBar } from './SearchBar';
import { BlurView } from 'expo-blur';
import { Blury } from './Blurry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';
import { TextBold, TextMed } from '../fonts/TextBox';
import { globalTitleStore } from '../../screens/BrowserView'; 
import { Themes } from '../styles/computed/themes';

const globalGradientSync = {
gradientTranslateY: null as any,
updateGradient: (translateY: number) => {
if (globalGradientSync.gradientTranslateY) {
globalGradientSync.gradientTranslateY.value = translateY;
}
}
};

if (typeof window !== 'undefined') {
(window as any).globalGradientSync = globalGradientSync;
}

type Props = {
 onActiveTabPress: () => void;
 activeTabId?: number;
 onSearchSubmit: (query: string) => void;
 onSearchFocus: () => void;
 onSearchBlur: () => void;
 checkSubmit: () => void;
 resetTrigger: number;
 isTabOverview: boolean;
 isSearchSubmitted: boolean;
 webViewRef?: React.RefObject<any>;
 canGoBack?: boolean;
 canGoForward?: boolean;
 onGoBack?: () => void;
 onGoForward?: () => void;
 onRefresh?: () => void;
 currentUrl?: string;
 shortUrl?: string;
 scrollControllerY?: number;
 onScrollControllerReset?: () => void;
 onTabOverviewExit?: () => void;
};

declare global {
interface Window {
resetBottomBarScrollController?: () => void;
globalGradientSync?: {
gradientTranslateY: any;
updateGradient: (translateY: number) => void;
};
browserNavigation?: {
goBack: () => void;
goForward: () => void;
refresh: () => void;
canGoBack?: boolean;
canGoForward?: boolean;
currentUrl?: string;
shortUrl?: string;
};
scrollAnimationState?: GlobalScrollState;
browserViewState?: {
isWebViewActive: boolean;
setIsWebViewActive: (value: boolean) => void;
isStartPageActive: boolean;
setIsStartPageActive: (value: boolean) => void;
};
}
}

interface BottomBarCache {
 searchValue: string;
 submitted: boolean;
 currentUrl: string;
 shortUrl: string;
 navigationState: {
 canGoBack: boolean;
 canGoForward: boolean;
 currentUrl: string;
 shortUrl: string;
 };
 lastUpdated: number;
}

interface GlobalScrollState {
 isScrollingDown: boolean;
 bottomBarAnimation: {
 containerBottom: Animated.Value;
 barScale: Animated.Value;
 barRadius: Animated.Value;
 respondOpacity: Animated.Value;
 respondZIndex: Animated.Value;
 };
 triggerHide: () => void;
 triggerShow: () => void;
}

const createGlobalScrollState = (): GlobalScrollState => {
 const containerBottom = new Animated.Value(0);
 const barScale = new Animated.Value(0.9);
 const barRadius = new Animated.Value(40);
 const respondOpacity = new Animated.Value(0);
 const respondZIndex = new Animated.Value(-9);

 const triggerHide = () => {
 Animated.parallel([
 Animated.timing(containerBottom, {
 toValue: -20,
 duration: 300,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: false,
 }),
 Animated.timing(barScale, {
 toValue: 1,
 duration: 300,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: false,
 }),
 Animated.timing(barRadius, {
 toValue: 0,
 duration: 300,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: false,
 }),
 Animated.timing(respondOpacity, {
 toValue: 1,
 duration: 300,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: false,
 }),
 Animated.timing(respondZIndex, {
 toValue: 9,
 duration: 300,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: false,
 }),
 ]).start();
 };

 const triggerShow = () => {
 Animated.parallel([
 Animated.timing(containerBottom, {
 toValue: 0,
 duration: 300,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: false,
 }),
 Animated.timing(barScale, {
 toValue: 0.9,
 duration: 300,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: false,
 }),
 Animated.timing(barRadius, {
 toValue: 40,
 duration: 300,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: false,
 }),
 Animated.timing(respondOpacity, {
 toValue: 0,
 duration: 300,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: false,
 }),
 Animated.timing(respondZIndex, {
 toValue: -9,
 duration: 300,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: false,
 }),
 ]).start();
 };

 return {
 isScrollingDown: false,
 bottomBarAnimation: {
 containerBottom,
 barScale,
 barRadius,
 respondOpacity,
 respondZIndex,
 },
 triggerHide,
 triggerShow,
 };
};

declare global {
 interface Window {
 browserNavigation?: {
 goBack: () => void;
 goForward: () => void;
 refresh: () => void;
 canGoBack?: boolean;
 canGoForward?: boolean;
 currentUrl?: string;
 shortUrl?: string;
 };
 scrollAnimationState?: GlobalScrollState;
 }
}

if (typeof window !== 'undefined' && !window.scrollAnimationState) {
 window.scrollAnimationState = createGlobalScrollState();
}

const CACHE_KEY = '@bottombar_state';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000;

const saveToCache = async (data: Partial<BottomBarCache>) => {
//   try {
//     const existingCache = await loadFromCache();
//     const timestamp = Date.now();
//   const cacheData: BottomBarCache = {
//   searchValue: '',
//   submitted: false,
//   currentUrl: '',
//   shortUrl: '',
//   navigationState: {
//     canGoBack: false,
//     canGoForward: false,
//     currentUrl: '',
//     shortUrl: '',
//   },
//   lastUpdated: 0,
//   ...existingCache,
//   ...data,
//   lastUpdated: Date.now()
// };
//     await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
//   } catch (error) {
//     console.warn('Failed to save bottom bar state to cache:', error);
//   }
};

const loadFromCache = async (): Promise<Partial<BottomBarCache>> => {
 try {
 const cached = await AsyncStorage.getItem(CACHE_KEY);
 if (!cached) return {};
 
 const data: BottomBarCache = JSON.parse(cached);
 
 if (Date.now() - data.lastUpdated > CACHE_EXPIRY) {
 await AsyncStorage.removeItem(CACHE_KEY);
 return {};
 }
 
 return data;
 } catch (error) {
 console.warn('Failed to load bottom bar state from cache:', error);
 return {};
 }
};

const clearCache = async () => {
 try {
 await AsyncStorage.removeItem(CACHE_KEY);
 } catch (error) {
 console.warn('Failed to clear bottom bar cache:', error);
 }
};

export const BottomBar: React.FC<Props> = ({
 onActiveTabPress,
 onSearchSubmit,
 onSearchFocus,
 onSearchBlur,
 checkSubmit,
 resetTrigger,
 isSearchSubmitted,
 webViewRef,
 canGoBack: propCanGoBack = false,
 canGoForward: propCanGoForward = false,
 onGoBack,
 onGoForward,
 onRefresh,
 activeTabId,
 currentUrl: propCurrentUrl = '',
 shortUrl: propShortUrl = '',
}) => {

 const [searchValue, setSearchValue] = useState('');
 const [isFocused, setIsFocused] = useState(false);
 const [navigationState, setNavigationState] = useState({
 canGoBack: propCanGoBack,
 canGoForward: propCanGoForward,
 currentUrl: propCurrentUrl,
 shortUrl: propShortUrl,
 });

const [isWebViewActive, setIsWebViewActive] = useState(false);

useEffect(() => {
const checkBrowserViewState = () => {
if (window.browserViewState) {
setIsWebViewActive(window.browserViewState.isWebViewActive);
}
};
checkBrowserViewState();

const interval = setInterval(checkBrowserViewState, 100);

return () => clearInterval(interval);
}, []);

 const inputRef = useRef<TextInput>(null);

 const COLLAPSED_HEIGHT = 0;
 const COLLAPSED_AFTER_SUBMIT_HEIGHT = 65;
 const EXPANDED_HEIGHT = 500;
 const COLLAPSED_RADIUS = 0;
 const EXPANDED_RADIUS = 40;
 const SUBMIT_RADIUS = 40;

 const easing = Easing.bezier(0.16, 1, 0.29, 0.99);

 const getInitialHeight = () => {
 return isSearchSubmitted ? COLLAPSED_AFTER_SUBMIT_HEIGHT : COLLAPSED_HEIGHT;
 };

 const getInitialRadius = () => {
 return isSearchSubmitted ? SUBMIT_RADIUS : COLLAPSED_RADIUS;
 };

 const getInitialScale = () => {
 return isSearchSubmitted ? 0.9 : 1;
 };

 const getInitialBgColor = () => {
 return isSearchSubmitted ? 1 : 0;
 };

 const searcherHeight = useRef(new Animated.Value(getInitialHeight())).current;
 const radiusAnim = useRef(new Animated.Value(getInitialRadius())).current;
 const scaleAnim = useRef(new Animated.Value(getInitialScale())).current;
 const focusLayerOpacity = useRef(new Animated.Value(0)).current;
 const bgColorAnim = useRef(new Animated.Value(getInitialBgColor())).current;
 const darkOverlayOpacity = useRef(new Animated.Value(0)).current;
 
const [isWebInfoVisible, setIsWebInfoVisible] = useState(false);
const webInfoOpacity = useRef(new Animated.Value(0)).current;
const [webInfoZIndex, setWebInfoZIndex] = useState(-9);
const [scrollControllerPointerEvents, setScrollControllerPointerEvents] = useState<'auto' | 'none'>('auto');
const [gradientHeight, setGradientHeight] = useState(195);
const [bluryHeight, setBluryHeight] = useState('88%');

 const bottomBarBorderAnim = useRef(new Animated.Value(getInitialBgColor())).current;
 const bottomLayerBorderAnim = useRef(new Animated.Value(getInitialBgColor())).current;
 const tabButtonOpacity = useRef(new Animated.Value(1)).current;
 const refreshButtonOpacity = useRef(new Animated.Value(1)).current;

 const backgroundColorInterpolate = bgColorAnim.interpolate({
inputRange: [0, 1],
outputRange: ['#ffffff00', '#ffffffd4'],
 });

 const bottomBarBorderColorInterpolate = bottomBarBorderAnim.interpolate({
inputRange: [0, 1],
outputRange: ['#ffffff00', '#ffffffd5'],
 });

 const bottomLayerBorderColorInterpolate = bottomLayerBorderAnim.interpolate({
inputRange: [0, 1],
outputRange: ['#00000000', '#00000009'],
 });

 const getScrollAnimationStyle = () => {
 if (typeof window !== 'undefined' && window.scrollAnimationState) {
 return {
 containerBottom: window.scrollAnimationState.bottomBarAnimation.containerBottom,
 barScale: window.scrollAnimationState.bottomBarAnimation.barScale,
 barRadius: window.scrollAnimationState.bottomBarAnimation.barRadius,
 respondOpacity: window.scrollAnimationState.bottomBarAnimation.respondOpacity,
 respondZIndex: window.scrollAnimationState.bottomBarAnimation.respondZIndex,
 };
 }
 return {
 containerBottom: new Animated.Value(0),
 barScale: new Animated.Value(0.9),
 barRadius: new Animated.Value(40),
 respondOpacity: new Animated.Value(0),
 respondZIndex: new Animated.Value(-9),
 };
 };

 const scrollAnimation = getScrollAnimationStyle();

 useEffect(() => {
 const loadCachedData = async () => {
 const cachedData = await loadFromCache();
 if (cachedData.searchValue) {
 setSearchValue(cachedData.searchValue);
 }
 if (cachedData.navigationState) {
 setNavigationState(cachedData.navigationState);
 }
 };
 loadCachedData();
 }, []);

 useEffect(() => {
 const cacheData = async () => {
 await saveToCache({
 searchValue,
 submitted: isSearchSubmitted,
 currentUrl: navigationState.currentUrl,
 shortUrl: navigationState.shortUrl,
 navigationState,
 });
 };
 cacheData();
 }, [searchValue, isSearchSubmitted, navigationState]);

 useEffect(() => {
 if (isSearchSubmitted && !isFocused) {
 animateCollapseTo65();
 } else if (!isSearchSubmitted && !isFocused) {
 animateCollapseToZero();
 }
 }, [isSearchSubmitted, isFocused]);

 useEffect(() => {
 const interval = setInterval(() => {
 if (typeof window !== 'undefined' && window.browserNavigation) {
 const nav = window.browserNavigation;
 const newState = {
 canGoBack: nav.canGoBack ?? navigationState.canGoBack,
 canGoForward: nav.canGoForward ?? navigationState.canGoForward,
 currentUrl: nav.currentUrl ?? navigationState.currentUrl,
 shortUrl: nav.shortUrl ?? navigationState.shortUrl,
 };
 
 if (JSON.stringify(newState) !== JSON.stringify(navigationState)) {
 setNavigationState(newState);
 }
 }
 }, 100);

 return () => clearInterval(interval);
 }, [navigationState]);

 const canGoBack = navigationState.canGoBack || propCanGoBack;
 const canGoForward = navigationState.canGoForward || propCanGoForward;
 const currentUrl = navigationState.currentUrl || propCurrentUrl;
 const shortUrl = navigationState.shortUrl || propShortUrl;
 const [isStartPageActive, setIsStartPageActive] = useState(false);
 
 useEffect(() => {
const checkBrowserViewState = () => {
if (window.browserViewState) {
setIsWebViewActive(window.browserViewState.isWebViewActive);
setIsStartPageActive(window.browserViewState.isStartPageActive);
}
};
checkBrowserViewState();

const interval = setInterval(checkBrowserViewState, 100);

return () => clearInterval(interval);
}, []);

 useEffect(() => {
if (!isFocused && shortUrl && shortUrl !== searchValue) {
 setSearchValue(shortUrl);
}
 }, [shortUrl, isFocused]);

 const animateExpand = () => {
Animated.parallel([
 Animated.timing(searcherHeight, {
toValue: EXPANDED_HEIGHT,
duration: 800,
easing,
useNativeDriver: false,
 }),
 Animated.timing(radiusAnim, {
toValue: EXPANDED_RADIUS,
duration: 800,
easing,
useNativeDriver: false,
 }),
 Animated.timing(scaleAnim, {
toValue: 1,
duration: 800,
easing,
useNativeDriver: false,
 }),
 Animated.timing(focusLayerOpacity, {
toValue: 1,
duration: 800,
easing,
useNativeDriver: true,
 }),
 Animated.timing(bgColorAnim, {
toValue: 1,
duration: 800,
easing,
useNativeDriver: false,
 }),
 Animated.timing(darkOverlayOpacity, {
toValue: 1,
duration: 800,
easing,
useNativeDriver: true,
 }),
 Animated.timing(bottomBarBorderAnim, {
toValue: 1,
duration: 800,
easing,
useNativeDriver: false,
 }),
 Animated.timing(bottomLayerBorderAnim, {
toValue: 1,
duration: 800,
easing,
useNativeDriver: false,
 }),
 Animated.timing(tabButtonOpacity, {
toValue: 0,
duration: 400,
easing,
useNativeDriver: true,
 }),
 Animated.timing(refreshButtonOpacity, {
toValue: 0,
duration: 400,
easing,
useNativeDriver: true,
 }),
]).start();
 };

const animateCollapseToZero = () => {
setBluryRadius(0);
setBluryParentRadius(0);
setBluryScaleX(0);
setBluryBottom(0);
Animated.parallel([
 Animated.timing(searcherHeight, {
toValue: COLLAPSED_HEIGHT,
duration: 800,
easing,
useNativeDriver: false,
 }),
 Animated.timing(radiusAnim, {
toValue: COLLAPSED_RADIUS,
duration: 800,
easing,
useNativeDriver: false,
 }),
 Animated.timing(scaleAnim, {
toValue: 1,
duration: 800,
easing,
useNativeDriver: false,
 }),
 Animated.timing(focusLayerOpacity, {
toValue: 0,
duration: 800,
easing,
useNativeDriver: true,
 }),
 Animated.timing(bgColorAnim, {
toValue: 0,
duration: 800,
easing,
useNativeDriver: false,
 }),
 Animated.timing(darkOverlayOpacity, {
toValue: 0,
duration: 800,
easing,
useNativeDriver: true,
 }),
 Animated.timing(bottomBarBorderAnim, {
toValue: 0,
duration: 800,
easing,
useNativeDriver: false,
 }),
 Animated.timing(bottomLayerBorderAnim, {
toValue: 0,
duration: 800,
easing,
useNativeDriver: false,
 }),
 Animated.timing(tabButtonOpacity, {
toValue: 1,
duration: 400,
easing,
useNativeDriver: true,
 }),
 Animated.timing(refreshButtonOpacity, {
toValue: 1,
duration: 400,
easing,
useNativeDriver: true,
 }),
]).start();
 };

const animateCollapseTo65 = () => {
setBluryRadius(40);
setBluryParentRadius(40);
setBluryScaleX(0.9);
setBluryBottom(19);
Animated.parallel([
 Animated.timing(searcherHeight, {
toValue: COLLAPSED_AFTER_SUBMIT_HEIGHT,
duration: 500,
easing,
useNativeDriver: false,
 }),
 Animated.timing(radiusAnim, {
toValue: SUBMIT_RADIUS,
duration: 500,
easing,
useNativeDriver: false,
 }),
 Animated.timing(scaleAnim, {
toValue: 0.9,
duration: 500,
easing,
useNativeDriver: false,
 }),
 Animated.timing(focusLayerOpacity, {
toValue: 0,
duration: 500,
easing,
useNativeDriver: true,
 }),
 Animated.timing(bgColorAnim, {
toValue: 1,
duration: 500,
easing,
useNativeDriver: false,
 }),
 Animated.timing(darkOverlayOpacity, {
toValue: 0,
duration: 500,
easing,
useNativeDriver: true,
 }),
 Animated.timing(bottomBarBorderAnim, {
toValue: 1,
duration: 500,
easing,
useNativeDriver: false,
 }),
 Animated.timing(bottomLayerBorderAnim, {
toValue: 1,
duration: 500,
easing,
useNativeDriver: false,
 })
]).start();
 Animated.parallel([
 Animated.timing(tabButtonOpacity, {
toValue: 1,
duration: 300,
easing,
useNativeDriver: true,
 }),
 Animated.timing(refreshButtonOpacity, {
toValue: 1,
duration: 300,
easing,
useNativeDriver: true,
 }),
 ]).start()
 };

 const handleCancel = async () => {
setSearchValue('');
inputRef.current?.blur();
setIsFocused(false);
animateCollapseToZero();
await clearCache();
 };

 const handleFocus = () => {
setIsFocused(true);
onSearchFocus();

if (shortUrl && searchValue !== shortUrl) {
 setSearchValue(shortUrl);
}

setTimeout(() => {
 if (inputRef.current && searchValue) {
inputRef.current.setSelection(0, searchValue.length);
 }
}, 100);

animateExpand();
 };

 const handleBlur = () => {
setIsFocused(false);
onSearchBlur();

if (searchValue === '' && !isSearchSubmitted) {
 animateCollapseToZero();
} else if (isSearchSubmitted || searchValue !== '') {
 animateCollapseTo65();
} else {
 animateCollapseToZero();
}
 };

 const handleSubmit = () => {
if (searchValue.trim().length > 0) {
 onSearchSubmit(searchValue.trim());
 setTimeout(() => {
inputRef.current?.blur();
setIsFocused(false);
animateCollapseTo65();
 }, 200);
}
 };

 const handleRefresh = () => {
if (typeof window !== 'undefined' && window.browserNavigation?.refresh) {
 window.browserNavigation.refresh();
} else if (onRefresh) {
 onRefresh();
}
 };

 const handleGoBack = () => {
if (typeof window !== 'undefined' && window.browserNavigation?.goBack) {
 window.browserNavigation.goBack();
} else if (onGoBack && canGoBack) {
 onGoBack();
}
 };

 const handleGoForward = () => {
if (typeof window !== 'undefined' && window.browserNavigation?.goForward) {
 window.browserNavigation.goForward();
} else if (onGoForward && canGoForward) {
 onGoForward();
}
 };

 useEffect(() => {
const resetComponent = async () => {
setSearchValue('');
inputRef.current?.blur();
setIsFocused(false);
animateCollapseToZero();
await clearCache();
};
resetComponent();
 }, [resetTrigger]);

const panY = useRef(new Animated.Value(0)).current;
const gradientY = useRef(new Animated.Value(0)).current;
const panBarScale = useRef(new Animated.Value(0.9)).current;
const panBarRadius = useRef(new Animated.Value(40)).current;
const panBottomLayerOpacity = useRef(new Animated.Value(1)).current;
const panBottomRespondOpacity = useRef(new Animated.Value(0)).current;
const panBottomRespondZIndex = useRef(new Animated.Value(-9)).current;
const [bluryRadius, setBluryRadius] = useState(40);
const [bluryIntensity, setBluryIntensity] = useState(8);
const [bluryParentRadius, setBluryParentRadius] = useState(40);
const [bluryBottom, setBluryBottom] = useState(19);
const [bluryScaleX, setBluryScaleX] = useState(0.9);

const panResponder = useRef(
PanResponder.create({
onMoveShouldSetPanResponder: (_, gestureState) => {
return Math.abs(gestureState.dy) > 10;
},
onPanResponderMove: (_, gestureState) => {
if (gestureState.dy > 0 && typeof window !== 'undefined' && (window as any).globalGradientSync) {
const clampedY = Math.max(0, Math.min(100, gestureState.dy));
(window as any).globalGradientSync.updateGradient(clampedY);
}
},
onPanResponderRelease: (_, gestureState) => {
if (gestureState.dy < -20) {
setBluryRadius(0);
setBluryParentRadius(0);
setBluryScaleX(1);
setBluryBottom(25);

if (typeof window !== 'undefined' && (window as any).globalGradientSync) {
(window as any).globalGradientSync.updateGradient(100);
}

Animated.parallel([
Animated.timing(panY, {
toValue: 87,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: true,
}),
Animated.timing(gradientY, {
toValue: 40,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: true,
}),
Animated.timing(scaleAnim, {
toValue: 1,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: false,
}),
Animated.timing(bgColorAnim, {
toValue: 0.1,
duration: 600,
easing,
useNativeDriver: false,
}),
Animated.timing(bottomBarBorderAnim, {
toValue: 0.25,
duration: 600,
easing,
useNativeDriver: false,
}),
Animated.timing(radiusAnim, {
toValue: 0,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: false,
}),
Animated.timing(panBottomLayerOpacity, {
toValue: 0,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: false,
}),
Animated.timing(panBottomRespondOpacity, {
toValue: 1,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: true,
}),
]).start();
} else if (gestureState.dy > 20) {
setBluryRadius(40);
setBluryParentRadius(40);
setBluryScaleX(0.9);
setBluryBottom(19);

if (typeof window !== 'undefined' && (window as any).globalGradientSync) {
(window as any).globalGradientSync.updateGradient(0);
}

Animated.parallel([
Animated.timing(panY, {
toValue: 0,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: true,
}),
Animated.timing(gradientY, {
toValue: 0,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: true,
}),
Animated.timing(scaleAnim, {
toValue: 0.9,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: false,
}),
Animated.timing(radiusAnim, {
toValue: 40,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: false,
}),
Animated.timing(bgColorAnim, {
toValue: 1,
duration: 600,
easing,
useNativeDriver: false,
}),
Animated.timing(bottomBarBorderAnim, {
toValue: 1,
duration: 600,
easing,
useNativeDriver: false,
}),
Animated.timing(panBottomLayerOpacity, {
toValue: 1,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: false,
}),
Animated.timing(panBottomRespondOpacity, {
toValue: 0,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: true,
}),
]).start();
} else {
if (typeof window !== 'undefined' && (window as any).globalGradientSync) {
(window as any).globalGradientSync.updateGradient(0);
}
}
},
})
).current;

const revertPanAnim = () => {
setBluryRadius(40);
setBluryParentRadius(40);
setBluryScaleX(0.9);
setBluryBottom(19);

if (typeof window !== 'undefined' && (window as any).globalGradientSync) {
(window as any).globalGradientSync.updateGradient(0);
}

Animated.parallel([
Animated.timing(panY, {
toValue: 0,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: true,
}),
Animated.timing(gradientY, {
toValue: 0,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: true,
}),
Animated.timing(scaleAnim, {
toValue: 0.9,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: false,
}),
Animated.timing(radiusAnim, {
toValue: 40,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: false,
}),
Animated.timing(bgColorAnim, {
toValue: 1,
duration: 600,
easing,
useNativeDriver: false,
}),
Animated.timing(bottomBarBorderAnim, {
toValue: 1,
duration: 600,
easing,
useNativeDriver: false,
}),
Animated.timing(panBottomLayerOpacity, {
toValue: 1,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: false,
}),
Animated.timing(panBottomRespondOpacity, {
toValue: 0,
duration: 600,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: true,
}),
]).start();

if (typeof window !== 'undefined' && (window as any).globalGradientSync) {
(window as any).globalGradientSync.updateGradient(0);
}
}

const [pointerEvents, setPointerEvents] = useState<'auto' | 'none'>('none')
const [scrollControllerY, setScrollControllerY] = useState(0);

const handleTabOverviewExit = () => {
setScrollControllerY(0);
setPointerEvents('auto');
};

useEffect(() => {
if (typeof window !== 'undefined') {
window.resetBottomBarScrollController = () => {
setScrollControllerY(0);
setPointerEvents('auto');
};
}
return () => {
if (typeof window !== 'undefined') {
delete window.resetBottomBarScrollController;
}
};
}, []);

const animateWebInfoShow = () => {
setIsWebInfoVisible(true);
setWebInfoZIndex(9);
setGradientHeight(300);
setBluryHeight('94.1%')
setBluryScaleX(0.95);
setBluryBottom(20);
setBluryIntensity(15)

if (typeof window !== 'undefined') {
(window as any).globalGradientHeight = 470;
}

Animated.parallel([
Animated.timing(searcherHeight, {
toValue: 310,
duration: 900,
easing,
useNativeDriver: false,
}),
Animated.timing(bottomBarBorderAnim, {
toValue: 1,
duration: 900,
easing,
useNativeDriver: false,
}),
Animated.timing(scaleAnim, {
toValue: 0.95,
duration: 900,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: false,
}),
Animated.timing(bgColorAnim, {
toValue: 0.95,
duration: 900,
easing,
useNativeDriver: false,
}),
Animated.timing(panBottomLayerOpacity, {
toValue: 0,
duration: 900,
easing,
useNativeDriver: false,
}),
]).start();

setTimeout(() => {
Animated.parallel([
Animated.timing(webInfoOpacity, {
toValue: 1,
duration: 900,
easing,
useNativeDriver: true,
}),
]).start();
}, 500);

setScrollControllerPointerEvents('none');
};

const animateWebInfoHide = () => {
setBluryHeight('88%')
setBluryScaleX(0.9);
setBluryBottom(19);
setBluryIntensity(8)
Animated.parallel([
Animated.timing(searcherHeight, {
toValue: COLLAPSED_AFTER_SUBMIT_HEIGHT,
duration: 600,
easing,
useNativeDriver: false,
}),
Animated.timing(webInfoOpacity, {
toValue: 0,
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
Animated.timing(bottomBarBorderAnim, {
toValue: 0.25,
duration: 900,
easing,
useNativeDriver: false,
}),
Animated.timing(scaleAnim, {
toValue: 0.9,
duration: 900,
easing: Easing.bezier(0.16, 1, 0.29, 0.99),
useNativeDriver: false,
}),
// Fade in bottom layer
Animated.timing(panBottomLayerOpacity, {
toValue: 1,
duration: 900,
easing,
useNativeDriver: false,
}),
]).start(() => {
setIsWebInfoVisible(false);
setWebInfoZIndex(-9);
setGradientHeight(195);
setBluryHeight('88%');

if (typeof window !== 'undefined') {
(window as any).globalGradientHeight = 195;
}
});

setScrollControllerPointerEvents('auto');
};


const [currentTitle, setCurrentTitle] = useState('Untitled');
useEffect(() => {
const unsubscribe = globalTitleStore.subscribe((titles) => {
if (activeTabId) {
setCurrentTitle(titles[activeTabId] || 'Untitled');
}
});

if (activeTabId) {
setCurrentTitle(globalTitleStore.getTitle(activeTabId));
}

return unsubscribe;
}, [activeTabId]);

useEffect(() => {
  if (isStartPageActive) {
   animateCollapseToZero();
  }
}, [isStartPageActive]);
useEffect(() => {
 if (isWebViewActive) {
 animateCollapseTo65();
 isSearchSubmitted = isSearchSubmitted;
 inputRef.current?.blur();
 onSearchBlur();
 setScrollControllerPointerEvents('auto')
 }
}, [isWebViewActive]);
 return (
<View style={localStyles.absoluteContainer} pointerEvents="box-none">
<Animated.View
pointerEvents={isFocused ? 'auto' : 'none'}
style={[localStyles.darkOverlay, { opacity: darkOverlayOpacity }]}>
<TouchableWithoutFeedback onPress={handleCancel}>
 <View style={{ flex: 1 }} />
</TouchableWithoutFeedback>
 </Animated.View>

 <Animated.View
pointerEvents={isFocused ? 'auto' : 'none'}
style={[styles.focusLayer, { opacity: focusLayerOpacity }]}>
<BlurView style={styles.focusLayer} intensity={100} tint="dark">
 <TouchableWithoutFeedback onPress={handleCancel}>
<View style={{ flex: 1 }} />
 </TouchableWithoutFeedback>
</BlurView>
 </Animated.View>
<Animated.View
style={{
width: '100%',
position: 'absolute',
bottom: 0,
transform: [{ translateY: panY }],
}}>

<Animated.View
pointerEvents="auto"
style={[
styles.bottomBar,
{
borderRadius: radiusAnim,
backgroundColor: backgroundColorInterpolate,
borderColor: bottomBarBorderColorInterpolate,
transform: [{ scale: scaleAnim}],
},
]}>
<Animated.View 
style={[
styles.bottomLayer,
{borderColor: bottomLayerBorderColorInterpolate,
opacity: panBottomLayerOpacity,
}]}>
<Animated.View style={{ height: searcherHeight, overflow: 'hidden' }}>
<Pad direction='row' justify='center' align='center'>
<TouchableOpacity style={styles.searchTaber} onPress={() => {
onActiveTabPress();
setPointerEvents('none');
setScrollControllerY(700);
}}>
<Animated.View style={[styles.justify,{ opacity: tabButtonOpacity }]}>
<TabIconDark width={35} height={35} opacity={0.7}/>
</Animated.View>
</TouchableOpacity>

<TouchableOpacity style={styles.searchRefresh} onPress={handleRefresh}>
<Animated.View style={[styles.justify,{ opacity: refreshButtonOpacity }]}>
<RefreshIcon width={25} height={25} opacity={0.7}/>
</Animated.View>
</TouchableOpacity>

<SearchBar
ref={inputRef}
value={searchValue}
onTextChanged={setSearchValue}
onCancel={handleCancel}
onFocus={handleFocus}
onBlur={handleBlur}
onPress={()=>{animateCollapseTo65(),handleFocus()}}
onSubmitEditing={handleSubmit}
isSubmitted={isSearchSubmitted}
isFocused={isFocused}/>
</Pad>
</Animated.View>

{isStartPageActive && (
<Pad px={10} direction="row" align="center" justify="center" gap={100}>
<Pressable style={styles.centerFill} onPress={() => {
onActiveTabPress();
setPointerEvents('none');
setScrollControllerY(700);
}}>
<Pressable style={styles.tabButton} onPress={() => {
onActiveTabPress();
setPointerEvents('none');
setScrollControllerY(700);
}}/>
<TouchableOpacity style={styles.activeTab} onPress={() => {
onActiveTabPress();
setPointerEvents('none');
setScrollControllerY(700);
}}/>
</Pressable>

<TouchableOpacity onPress={() => inputRef.current?.focus()}>
<AddButton>
<PlusIcon width={27} height={27} stroke="#000000" opacity={0.7} />
</AddButton>
</TouchableOpacity>

<Pad style={styles.justify}>
<PullButton>
<ArrowUpIcon width={15} height={15} opacity={0.8} style={styles.absolute} />
</PullButton>
</Pad>
</Pad>
)}

{isWebViewActive && (
<Pad py={2} direction="row" align="center" justify="center" style={{width:"90%"}} gap={55}>
<TouchableOpacity 
style={[styles.justify,{zIndex:999}]}
onPress={handleGoBack}
disabled={!canGoBack}>
<ArrowLeftDarkIcon 
width={21} 
height={21} 
opacity={canGoBack ? .7 : 0.3}/>
</TouchableOpacity>

<TouchableOpacity 
style={styles.justify}
onPress={handleGoForward}
disabled={!canGoForward}>
<ArrowRightDarkIcon
width={21}
height={21}
opacity={canGoForward ? .7 : 0.3}/>
</TouchableOpacity>

<Pressable style={styles.justify} onPress={animateWebInfoShow}>
<BookIcon width={30} height={30} opacity={.7} strokeWidth={1.65} />
</Pressable>

<Pressable style={styles.justify} onPress={() => inputRef.current?.focus()}>
<ShareIcon width={28} height={28} opacity={.7} strokeWidth={1.6} />
</Pressable>

<TouchableOpacity style={styles.justify} onPress={animateWebInfoShow}>
<TouchableOpacity style={styles.PullButton} onPress={animateWebInfoShow}>
<ArrowUpIcon width={15} height={15} opacity={0.8} style={styles.absolute} />
</TouchableOpacity>
</TouchableOpacity>
</Pad>
)}

</Animated.View>

<Animated.View style={[
localStyles.bottomRespond,
{
opacity: panBottomRespondOpacity,
zIndex: panBottomRespondZIndex,
}
]}>
<Pressable onPress={()=>{revertPanAnim()}} style={[styles.align,{width:'100%',height:'100%',justifyContent:'flex-start'}]}>
<Break py={3}/>
<TouchableOpacity style={localStyles.searchValueObject}>
<TextMed color='#000000f5' size={13}>{searchValue}</TextMed>
</TouchableOpacity>
</Pressable>
</Animated.View>
<Animated.View style={[
localStyles.bottomWebInfo,
{
opacity: webInfoOpacity,
zIndex: webInfoZIndex,
}
]}>
<Pad px={14} py={15} direction='column' align='center' justify='flex-start' style={{width:'100%',height:'100%'}}>
<View style={styles.objectPad}>
<Pad px={14} direction='column' align='flex-start' style={{width:'100%'}}>
<TextBold size={18} color='#000000' style={{textTransform:'capitalize'}}>
{currentTitle.length > 35 ? currentTitle.substring(0, 35) + '...' : currentTitle}
</TextBold>
<Break py={4}/>
<Pad direction='row' justify='center' gap={10}>
<Pressable style={[styles.wInfoButton,{backgroundColor:Themes.themeCol}]}>
<Pad direction='row' justify='center' gap={5}>
<BookerIcon width={20} height={20} strokeWidth={.8} stroke={'#ffffff'}/>
<Text style={{fontFamily:'Font-Regular',color:'#ffffff',fontSize:16}}>Summarize</Text>
</Pad>
</Pressable>
<Pressable style={[styles.wInfoButton,{backgroundColor:Themes.darkLight}]}>
<Pad direction='row' justify='center' gap={8}>
<AuxingIcon width={20} height={20}strokeWidth={.8} opacity={.8}/>
<Text style={{fontFamily:'Font-Regular',color:'#000000',fontSize:16}}>Listen on page</Text>
</Pad>
</Pressable>
</Pad>
</Pad>
</View>
<Break py={8}/>
<TouchableOpacity style={[styles.ViewPad,{borderTopStartRadius:24,borderTopEndRadius:24},styles.justify]}>
<Break py={2}/>
<Pad px={14} direction='column' align='flex-start' style={{width:'100%'}}>
<Pad direction='row' justify='center' align='center' gap={0}>
<Pressable style={styles.descButton}>
<TextBold size={18} color='#000000'>Find on page</TextBold>
</Pressable>
<View style={styles.descButton}>
<Pad direction='row' justify='flex-end' gap={10}>
<FindIcon width={23} height={23} opacity={.8} strokeWidth={2}/>
</Pad>
</View>
</Pad>
</Pad>
</TouchableOpacity>
<TouchableOpacity style={styles.ViewPad}>
<Pad px={14} direction='column' align='flex-start' style={{width:'100%'}}>
<Pad direction='row' justify='center' align='center' gap={0}>
<Pressable style={styles.descButton}>
<TextBold size={18} color='#000000'>Add to reader list</TextBold>
</Pressable>
<View style={styles.descButton}>
<Pad direction='row' justify='flex-end' gap={10}>
<BookIcon width={23} height={23} strokeWidth={2.3} opacity={.8}/>
</Pad>
</View>
</Pad>
</Pad>
</TouchableOpacity>
<TouchableOpacity style={[styles.ViewPad,{borderBottomStartRadius:24,borderBottomEndRadius:24}]}>
<Pad px={14} direction='column' align='flex-start' style={{width:'100%'}}>
<Pad direction='row' justify='center' align='center' gap={0}>
<Pressable style={styles.descButton}>
<TextBold size={18} color='#000000'>Desktop site</TextBold>
</Pressable>
<View style={styles.descButton}>
<Pad direction='row' justify='flex-end' gap={10}>
<DesktopIcon width={23} height={23}strokeWidth={2.2} opacity={.8}/>
</Pad>
</View>
</Pad>
</Pad>
<Break py={2}/>
</TouchableOpacity>
<Break py={5}/>
<TouchableOpacity style={[styles.wInfoButton,{backgroundColor:Themes.darkLight}]} onPress={animateWebInfoHide}>
<Pad direction='row' justify='center'>
<Text style={{fontFamily:'Font-Regular',color:'#000000',fontSize:16}}>Done</Text>
</Pad>
</TouchableOpacity>
</Pad>
</Animated.View>
</Animated.View>

{isWebViewActive && (
<Blury
parentRadius={bluryParentRadius}
radius={bluryRadius}
intensity={bluryIntensity}
bottom={bluryBottom}
zindex={-9}
height={bluryHeight}
scaleX={bluryScaleX}
/>
)}
</Animated.View>
{isWebViewActive && (<View 
{...panResponder.panHandlers} 
style={[localStyles.scrollController, {transform:[{translateY:scrollControllerY}]}]} 
pointerEvents={scrollControllerPointerEvents}
/>)}
</View>
 );
};

export const BottomBarCache = {
 save: saveToCache,
 load: loadFromCache,
 clear: clearCache,
};

const localStyles = StyleSheet.create({
 absoluteContainer: {
position: 'absolute',
bottom: 0,
width: '100%',
height: '100%',
zIndex: 9,
pointerEvents: 'box-none',
 },
 darkOverlay: {
...StyleSheet.absoluteFillObject,
backgroundColor: '#00000060',
zIndex: 5,
 },
 scrollController: {
position: 'absolute',
bottom: 0,
left: 0,
width: '100%',
height: 750,
zIndex: -9,
 },
 bottomRespond: {
width: '100%',
height: '100%',
display: 'flex',
alignItems:'center',
position:'absolute',
 },
 bottomWebInfo: {
width: '100%',
height: '100%',
display: 'flex',
alignItems:'center',
justifyContent: 'center',
position:'absolute',
 },
 searchValueObject: {
paddingHorizontal: 10,
borderRadius: 100,
borderWidth: 1.5,
display: 'flex',
alignItems:'center',
justifyContent: 'center',
borderColor: "#ffffffd5",
backgroundColor: "#ffffffb5"
 },
 gradient: {
width: '100%',
height: 150,
bottom: 0,
opacity: .7,
zIndex: 999999,
position: 'absolute'
 }
});