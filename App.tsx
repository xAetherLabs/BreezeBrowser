import React, { useRef, useState, useEffect } from 'react';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
 View,
 Text,
 Pressable,
 Image,
 Animated,
 StyleSheet,
 Easing,
 LayoutChangeEvent,
 ViewStyle,
 Keyboard,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { styles } from './components/styles/computed/styles';
import { PrivacyView } from './screens/PrivacyView';
import { BrowserView } from './screens/BrowserView';
import { BottomBar } from './components/elements/BottomBar';
import { BottomTabAction } from './constants/BottomTabAction';
import { Pad } from './components/elements/Components';
import favicon from './assets/images/favico.png';
import { DeviceIcon } from './components/icons/Icons';

type TabData = {
 id: number;
 url: string | null;
};

const TABS_STORAGE_KEY = '@browser_tabs';
const ACTIVE_TAB_STORAGE_KEY = '@active_tab_index';
const BROWSER_VISIBLE_STORAGE_KEY = '@browser_visible';

export default function App() {
 const [isBrowserVisible, setIsBrowserVisible] = useState(false);
 const [slideWidth, setSlideWidth] = useState(0);
 const [isTabOverview, setIsTabOverview] = useState(false);
 const [isSearchFocused, setIsSearchFocused] = useState(false);
 const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
 const [tabs, setTabs] = useState<TabData[]>([{ id: 1, url: null }]);
 const [activeTabIndex, setActiveTabIndex] = useState(0);
 const [resetTrigger, setResetTrigger] = useState(0);
 const [isLoading, setIsLoading] = useState(true);

 const [fontsLoaded] = Font.useFonts({
 'Font-Regular': require('./components/fonts/SF-Pro-Rounded-Medium.otf'),
 'Font-Bold': require('./components/fonts/SF-Pro-Rounded-Bold.otf'),
 'Font-Heavy': require('./components/fonts/SF-Pro-Rounded-Heavy.otf'),
 });

 const privacyViewFade = useRef(new Animated.Value(1)).current;
 const browserViewFade = useRef(new Animated.Value(0)).current;
 const privacyContentFade = useRef(new Animated.Value(1)).current;
 const browserContentFade = useRef(new Animated.Value(0)).current;
 const toggleX = useRef(new Animated.Value(0)).current;
 const bottomBarOpacity = useRef(new Animated.Value(0)).current;
 const bottomBarY = useRef(new Animated.Value(100)).current;
 const bottomTabActionOpacity = useRef(new Animated.Value(0)).current;
 const bottomTabActionY = useRef(new Animated.Value(100)).current;
 const bottomBarContentOpacity = useRef(new Animated.Value(0)).current;
 const bottomBarContentY = useRef(new Animated.Value(100)).current;
 const tapBlockerOpacity = useRef(new Animated.Value(0)).current;
 const tabOverviewTrigger = useRef(new Animated.Value(0)).current;

 useEffect(() => {
 loadCachedTabs();
 }, []);

 useEffect(() => {
 if (!isLoading) {
 saveTabs();
 }
 }, [tabs, activeTabIndex, isLoading]);

 useEffect(() => {
 Animated.timing(tapBlockerOpacity, {
 toValue: isSearchFocused ? 1 : 0,
 duration: 200,
 easing: Easing.inOut(Easing.ease),
 useNativeDriver: true,
 }).start();
 }, [isSearchFocused]);

const loadCachedTabs = async () => {
 try {
 const cachedTabs = await AsyncStorage.getItem(TABS_STORAGE_KEY);
 const cachedActiveIndex = await AsyncStorage.getItem(ACTIVE_TAB_STORAGE_KEY);
 const cachedBrowserVisible = await AsyncStorage.getItem(BROWSER_VISIBLE_STORAGE_KEY);
 
 if (cachedTabs) {
 const parsedTabs = JSON.parse(cachedTabs);
 if (parsedTabs.length > 0) {
 setTabs(parsedTabs);
 
 const activeIndex = cachedActiveIndex ? parseInt(cachedActiveIndex, 10) : 0;
 const validActiveIndex = Math.max(0, Math.min(activeIndex, parsedTabs.length - 1));
 setActiveTabIndex(validActiveIndex);
 }
 }
 
 if (cachedBrowserVisible !== null) {
 const browserVisible = JSON.parse(cachedBrowserVisible);
 setIsBrowserVisible(browserVisible);
 toggleX.setValue(browserVisible ? 1 : 0);

 if (browserVisible) {
 privacyViewFade.setValue(0);
 browserViewFade.setValue(1);
 privacyContentFade.setValue(0);
 browserContentFade.setValue(1);
 bottomBarOpacity.setValue(1);
 bottomBarY.setValue(0);
 bottomBarContentOpacity.setValue(1);
 bottomBarContentY.setValue(0);
 }
 }
 } catch (error) {
 console.error('Error loading cached data:', error);
 } finally {
 setIsLoading(false);
 }
};

const saveBrowserState = async () => {
 try {
 await AsyncStorage.setItem(BROWSER_VISIBLE_STORAGE_KEY, JSON.stringify(isBrowserVisible));
 } catch (error) {
 console.error('Error saving browser state:', error);
 }
};

useEffect(() => {
 if (!isLoading) {
 saveBrowserState();
 }
}, [isBrowserVisible, isLoading]);

 const saveTabs = async () => {
 try {
 await AsyncStorage.setItem(TABS_STORAGE_KEY, JSON.stringify(tabs));
 await AsyncStorage.setItem(ACTIVE_TAB_STORAGE_KEY, activeTabIndex.toString());
 } catch (error) {
 console.error('Error saving tabs:', error);
 }
 };

 if (!fontsLoaded || isLoading) return null;

 const addTab = () => {
 const newId = tabs.length > 0 ? Math.max(...tabs.map(t => t.id)) + 1 : 1;
 const newTabs = [...tabs, { id: newId, url: null }];
 setTabs(newTabs);
 setActiveTabIndex(newTabs.length - 1);
 setResetTrigger((prev) => prev + 1);
 setIsSearchSubmitted(false);
 };

 const handleSearchSubmit = (query: string) => {
 const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en&theme=dark`;
 setTabs((prev) => {
 const updated = [...prev];
 updated[activeTabIndex] = { ...updated[activeTabIndex], url };
 return updated;
 });
 setIsSearchSubmitted(true);
 };

 const handleSearchFocus = () => {
 setIsSearchFocused(true);
 };

 const handleSearchBlur = () => {
 setIsSearchFocused(false);
 };

 const handleTapBlockerPress = () => {
 Keyboard.dismiss();
 setIsSearchFocused(false);
 };

 const handleTabOverviewEnter = () => {
 if (!isTabOverview) {
 setIsTabOverview(true);
 
 Animated.timing(tabOverviewTrigger, {
 toValue: 1,
 duration: 1,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: false,
 }).start();

 setTimeout(() => {
 Animated.parallel([
 Animated.timing(bottomTabActionOpacity, {
 toValue: 1,
 duration: 500,
 useNativeDriver: true,
 }),
 Animated.timing(bottomTabActionY, {
 toValue: 0,
 duration: 500,
 useNativeDriver: true,
 }),
 ]).start();
 }, 50);
 }
 };

 const handleTabOverviewExit = () => {
 if (isTabOverview) {
 setIsTabOverview(false);
 
 Animated.timing(tabOverviewTrigger, {
 toValue: 0,
 duration: 0,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: false,
 }).start();

 Animated.parallel([
 Animated.timing(bottomTabActionOpacity, {
 toValue: 0,
 duration: 500,
 useNativeDriver: true,
 }),
 Animated.timing(bottomTabActionY, {
 toValue: 100,
 duration: 500,
 useNativeDriver: true,
 }),
 ]).start();
 }
 };

 const handleActiveTabPress = () => {
 if (isBrowserVisible) {
 if (isTabOverview) {
 handleTabOverviewExit();
 } else {
 handleTabOverviewEnter();
 }
 }
 };

 const handleTabSelect = (index: number) => {
 setActiveTabIndex(index);
 setResetTrigger((prev) => prev + 1);
 handleTabOverviewExit();
 setIsSearchSubmitted(tabs[index]?.url !== null);
 };

 const handleTabClose = (index: number) => {
 if (tabs.length === 1) return;
 
 const newTabs = tabs.filter((_, i) => i !== index);
 setTabs(newTabs);
 
 let newActiveIndex = activeTabIndex;
 if (activeTabIndex >= index) {
 newActiveIndex = Math.max(0, activeTabIndex - 1);
 }
 setActiveTabIndex(newActiveIndex);
 setIsSearchSubmitted(newTabs[newActiveIndex]?.url !== null);
 setResetTrigger((prev) => prev + 1);
 if (newTabs.length === 0) {
 handleTabOverviewExit();
 }
 };

 const handleSwitch = () => {
 const fadeOutCurrentContent = isBrowserVisible
 ? browserContentFade
 : privacyContentFade;
 const fadeOutCurrentView = isBrowserVisible
 ? browserViewFade
 : privacyViewFade;
 const fadeInNextView = isBrowserVisible
 ? privacyViewFade
 : browserViewFade;
 const fadeInNextContent = isBrowserVisible
 ? privacyContentFade
 : browserContentFade;

 const targetBrowserVisible = !isBrowserVisible;
 if (isBrowserVisible && isTabOverview) {
 handleTabOverviewExit();
 }

 if (!targetBrowserVisible) {
 setIsSearchSubmitted(false);
 }

 Animated.timing(toggleX, {
 toValue: isBrowserVisible ? 0 : 1,
 duration: 500,
 easing: Easing.inOut(Easing.ease),
 useNativeDriver: true,
 }).start();

 if (targetBrowserVisible) {
 Animated.parallel([
 Animated.timing(bottomBarContentOpacity, {
 toValue: 1,
 duration: 700,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: true,
 }),
 Animated.timing(bottomBarContentY, {
 toValue: 0,
 duration: 700,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: true,
 }),
 ]).start();
 } else {
 Animated.parallel([
 Animated.timing(bottomBarContentOpacity, {
 toValue: 0,
 duration: 700,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: true,
 }),
 Animated.timing(bottomBarContentY, {
 toValue: 100,
 duration: 700,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: true,
 }),
 ]).start();
 }

 if (targetBrowserVisible) {
 setTimeout(() => {
 Animated.parallel([
 Animated.timing(bottomBarOpacity, {
 toValue: 1,
 duration: 800,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: true,
 }),
 Animated.timing(bottomBarY, {
 toValue: 0,
 duration: 800,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: true,
 }),
 ]).start();
 }, 500);
 } else {
 Animated.parallel([
 Animated.timing(bottomBarOpacity, {
 toValue: 0,
 duration: 800,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: true,
 }),
 Animated.timing(bottomBarY, {
 toValue: 100,
 duration: 800,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: true,
 }),
 Animated.timing(bottomTabActionOpacity, {
 toValue: 0,
 duration: 800,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: true,
 }),
 Animated.timing(bottomTabActionY, {
 toValue: 100,
 duration: 800,
 easing: Easing.bezier(0.16, 1, 0.29, 0.99),
 useNativeDriver: true,
 }),
 ]).start();
 }
 
 Animated.timing(fadeOutCurrentContent, {
 toValue: 0,
 duration: 100,
 useNativeDriver: true,
 }).start(() => {
 Animated.parallel([
 Animated.timing(fadeOutCurrentView, {
 toValue: 0,
 duration: 700,
 useNativeDriver: true,
 }),
 Animated.timing(fadeInNextView, {
 toValue: 1,
 duration: 700,
 useNativeDriver: true,
 }),
 ]).start(() => {
 Animated.timing(fadeInNextContent, {
 toValue: 1,
 duration: 100,
 useNativeDriver: true,
 }).start(() => {
 setIsBrowserVisible(targetBrowserVisible);
 });
 });
 });
 };

 const handleSlideLayout = (event: LayoutChangeEvent) => {
 setSlideWidth(event.nativeEvent.layout.width);
 };

 const animatedToggleStyle: Animated.WithAnimatedObject<ViewStyle> = {
 transform: [
 {
 translateX: toggleX.interpolate({
 inputRange: [0, 1],
 outputRange: [5.5, slideWidth * 0.49],
 }),
 },
 ],
 };

 const switchToggleStyle: ViewStyle = {
 width: '45%',
 height: '100%',
 borderRadius: 100,
 backgroundColor: '#0025c8',
 position: 'absolute',
 zIndex: -9,
 };

 const bottomBarStyle = {
 opacity: bottomBarOpacity,
 transform: [{ translateY: bottomBarY }],
 };

 const bottomBarContentStyle = {
 opacity: bottomBarContentOpacity,
 transform: [{ translateY: bottomBarContentY }],
 };

 const bottomTabActionStyle = {
 opacity: bottomTabActionOpacity,
 transform: [{ translateY: bottomTabActionY }],
 };

 const tapBlockerStyle = {
 opacity: tapBlockerOpacity,
 };

 return (
 <>
 <View style={StyleSheet.absoluteFill}>
 {/* PrivacyView */}
 <Animated.View
 style={[
 StyleSheet.absoluteFill,
 { opacity: privacyViewFade, zIndex: isBrowserVisible ? 0 : 1 },
 ]}
 pointerEvents={!isBrowserVisible ? 'auto' : 'none'}>
 <PrivacyView
 viewFade={privacyViewFade}
 contentFade={privacyContentFade}/>
 {/* Switch */}
 <Pad style={styles.switchContainer} px={25}>
 <Pressable
 style={styles.switchSlide}
 onPress={handleSwitch}
 onLayout={handleSlideLayout}>
 <View style={styles.switchHandle}>
 <Image
 source={favicon}
 style={{
 width: 22,
 height: 22,
 transform: [{ rotate: '-20deg' }, { translateY: -1.1 }],
 marginLeft: 3,
 }}/>
 </View>
 <View style={styles.switchHandle}>
 <DeviceIcon width={19} height={19} style={{transform:[{translateX:-4}]}}/>
 </View>
 <Animated.View style={[switchToggleStyle, animatedToggleStyle]} />
 </Pressable>
 </Pad>
 </Animated.View>

 {/* BrowserView */}
 <Animated.View
 style={[
 StyleSheet.absoluteFill,
 { opacity: browserViewFade, zIndex: isBrowserVisible ? 1 : 0 },
 ]}
 pointerEvents={isBrowserVisible ? 'auto' : 'none'}>
 <BrowserView
 tabs={tabs}
 setTabs={setTabs}
 activeTabIndex={activeTabIndex}
 setActiveTabIndex={setActiveTabIndex}
 onTabSelect={handleTabSelect}
 onTabClose={handleTabClose}
 activeTabId={tabs[activeTabIndex]?.id}
 isTabOverview={isTabOverview}
 tabOverviewTrigger={tabOverviewTrigger}
 onTabOverviewExit={handleTabOverviewExit}
 bottomBarContentOpacity={bottomBarContentOpacity}
 bottomBarContentY={bottomBarContentY}/>
 {/* Switch */}
 <Pad style={styles.switchContainer} px={25}>
 <Pressable
 style={styles.switchSlide}
 onPress={handleSwitch}
 onLayout={handleSlideLayout}>
 <View style={styles.switchHandle}>
 <Image
 source={favicon}
 style={{
 width: 22,
 height: 22,
 transform: [{ rotate: '-20deg' }, { translateY: -1.1 }],
 marginLeft: 3,
 }}/>
 </View>
 <View style={styles.switchHandle}>
 <DeviceIcon width={19} height={19} style={{transform:[{translateX:-4}]}}/>
 </View>
 <Animated.View style={[switchToggleStyle, animatedToggleStyle]} />
 </Pressable>
 </Pad>
 </Animated.View>
 </View>
 
 {/* Tap Blocker */}
 <Animated.View style={[localStyles.tapBlocker, tapBlockerStyle]} pointerEvents={isSearchFocused ? 'auto' : 'none'}>
 <Pressable style={localStyles.tapBlockerPressable} onPress={handleTapBlockerPress} />
 </Animated.View>
 
 {/* Bottom Bar */}
 <Pad style={localStyles.bottomBarView}>
 <Animated.View style={[localStyles.bottomBarContent, bottomBarContentStyle]}>
 <Animated.View style={[localStyles.bottomBarWrap, bottomBarStyle]}>
 <BottomBar
 onActiveTabPress={handleActiveTabPress}
 onSearchSubmit={handleSearchSubmit}
 onSearchFocus={handleSearchFocus}
 onSearchBlur={handleSearchBlur}
 resetTrigger={resetTrigger}
 isTabOverview={isTabOverview}
 checkSubmit={() => {}}
 activeTabId={tabs[activeTabIndex]?.id}
 isSearchSubmitted={isSearchSubmitted}/>
 </Animated.View>

 {/* BottomTabAction */}
 </Animated.View>
 <Animated.View style={[localStyles.bottomTabActionWrap, bottomTabActionStyle]}>
 <BottomTabAction onAddTab={addTab} />
 </Animated.View>
 </Pad>
 </>
 );
}

const localStyles = StyleSheet.create({
 tapBlocker: {
 bottom: 0,
 zIndex: 999,
 backgroundColor: '#000000e5',
 width: '100%',
 height: '100%',
 display: 'flex',
 position: 'absolute',
 alignItems: 'flex-end',
 },
 tapBlockerPressable: {
 width: '100%',
 height: '100%',
 },
 bottomBarView: {
 bottom: 0,
 zIndex: 9999,
 width: '100%',
 display: 'flex',
 position: 'absolute',
 alignItems: 'flex-end',
 },
 bottomBarWrap: {
 position: 'absolute',
 width: '100%',
 height: '100%',
 bottom: 0,
 zIndex: 999,
 },
 bottomTabActionWrap: {
 position: 'absolute',
 width: '100%',
 bottom: 80,
 zIndex: 150,
 alignItems: 'center',
 },
 bottomBarContent: {
 width: '100%',
 height: '100%',
 zIndex: 9,
 borderRadius: 30,
 display: 'flex',
 alignItems: 'center',
 position: 'relative',
 flexDirection: 'row',
 },
});