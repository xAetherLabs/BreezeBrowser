import React, { useRef, useState, useEffect } from 'react';
import {
 View,
 ScrollView,
 Text,
 Image,
 TouchableOpacity,
 TextInput,
 Dimensions,
 Pressable,
 PanResponder,
 Animated as RNAnimated,
 Easing as RNEasing,
 StyleSheet,
 TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
 useSharedValue,
 useAnimatedStyle,
 useAnimatedProps,
 useAnimatedReaction,
 withRepeat,
 withTiming,
 Easing,
 runOnJS,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { WebView } from 'react-native-webview';
import { Shadows } from '../../components/elements/Shadows';
import { Shadowy } from '../../components/elements/Shadowy';
import { Break, Pad } from '../../components/elements/Components';
import favicon from '../../assets/images/favico.png';
import { ArrowDownIcon, AudioIcon, CodeIcon, CrossIcon, DownloadIcon, FileIcon, GoogleIcon, HtmlIcon, ImageIcon, PdfIcon, SvgIcon, VideoIcon } from '../../components/icons/Icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Blury } from '../../components/elements/Blurry';
import { LayerTint, styles } from '../../components/styles/computed/styles';
import { Shadow } from 'react-native-shadow-2';
import { TextBold, TextMed } from '../../components/fonts/TextBox';
import { GlobalContextMenu, globalContextMenuStore } from '../../context/GlobalContextMenu';
import { useMeter } from '../../context/MeterContext';
import { ReadingListManager } from '../../components/hooks/ReadingListManager';
import { resotreScrollController } from '../../components/elements/BottomBar';
import { PrivacyStartScreen } from '../../screens/PrivacyStartScreen';
import { StartPage } from '../../screens/StartPage';

const SCREEN = Dimensions.get('window');
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const reanimatedEasing = Easing.bezier(0.16, 1, 0.29, 0.99);
const rnAnimatedEasing = RNEasing.bezier(0.16, 1, 0.29, 0.99);

type TabData = {
 id: number;
 url: string | null;
 title?: string;
};

class GlobalTitleStore {
private titles: { [key: number]: string } = {};
private listeners: Array<(titles: { [key: number]: string }) => void> = [];

constructor() {
this.titles = {};
this.listeners = [];
}

updateTitle(tabId: number, title: string): void {
this.titles[tabId] = title;
this.notifyListeners();
}

getTitle(tabId: number): string {
return this.titles[tabId] || 'Untitled';
}

getAllTitles(): { [key: number]: string } {
return this.titles;
}

subscribe(listener: (titles: { [key: number]: string }) => void): () => void {
this.listeners.push(listener);
return () => {
this.listeners = this.listeners.filter(l => l !== listener);
};
}

notifyListeners(): void {
this.listeners.forEach(listener => listener(this.titles));
}
}

export const globalTitleStore: GlobalTitleStore = new GlobalTitleStore()

const globalSearchSync = {
 tabSearchValues: {} as {[key: number]: string},
 externalSearchValue: '',
 externalSearchCallback: null as ((text: string) => void) | null,
 tabSearchCallback: null as ((tabIndex: number, text: string) => void) | null,

 updateExternal: (text: string) => {
 globalSearchSync.externalSearchValue = text;
 if (globalSearchSync.externalSearchCallback) {
 globalSearchSync.externalSearchCallback(text);
 }
 },

 updateTab: (tabIndex: number, text: string) => {
 globalSearchSync.tabSearchValues[tabIndex] = text;
 if (globalSearchSync.tabSearchCallback) {
 globalSearchSync.tabSearchCallback(tabIndex, text);
 }
 },

 triggerSearch: (searchText: string, tabIndex?: number) => {
 if (typeof window !== 'undefined' && (window as any).browserViewSearch) {
 (window as any).browserViewSearch.triggerSearch(searchText);
 }
 }
};

if (typeof window !== 'undefined') {
(window as any).globalSearchSync = globalSearchSync;
}

type BrowserViewProps = {
 tabs: TabData[];
 setTabs: React.Dispatch<React.SetStateAction<TabData[]>>;
 activeTabIndex: number;
 setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
 onTabSelect: (index: number) => void;
 onTabClose: (index: number) => void;
 activeTabId?: number;
 isTabOverview: boolean;
 tabOverviewTrigger: RNAnimated.Value;
 onTabOverviewExit: () => void;
 bottomBarContentOpacity: RNAnimated.Value;
 bottomBarContentY: RNAnimated.Value;
 onNavigationStateChange?: (canGoBack: boolean, canGoForward: boolean) => void;
 onUrlChange?: (url: string, shortUrl: string) => void;
//  viewFaded: () => RNAnimated.Value;
//  contentFaded: () => RNAnimated.Value;
};



const getShortUrl = (fullUrl: string): string => {
 try {
 const url = new URL(fullUrl);
 let domain = url.hostname;
 
 if (domain.startsWith('www.')) {
 domain = domain.substring(4);
 }
 
 return domain;
 } catch (error) {
 const match = fullUrl.match(/^https?:\/\/(?:www\.)?([^\/]+)/);
 return match ? match[1] : fullUrl;
 }
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
 }
}
declare global {
interface Window {
browserViewState?: {
isWebViewActive: boolean;
setIsWebViewActive: (value: boolean) => void;
isStartPageActive: boolean;
setIsStartPageActive: (value: boolean) => void;
};
}
}

let globalHideDownloadsView: (() => void) | null = null;

export const hideDownloadsView = () => {
 if (globalHideDownloadsView) {
 globalHideDownloadsView();
 }
};

let globalShowDownloadsView: (() => void) | null = null;

export const displayDownloadsView = () => {
 if (globalShowDownloadsView) {
 globalShowDownloadsView();
 }
};

let globalHideBottomBar: (() => void) | null = null;

export const removeBottomBar = () => {
 if (globalHideBottomBar) {
 globalHideBottomBar();
 }
};

let globalDisplayBottomBar: (() => void) | null = null;

export const displayBottomBar = () => {
 if (globalDisplayBottomBar) {
 globalDisplayBottomBar();
 }
};

export const PrivacyBrowser: React.FC<BrowserViewProps> = ({
 tabs,
 setTabs,
 activeTabIndex,
 setActiveTabIndex,
 onTabSelect,
 onTabClose,
 isTabOverview,
 tabOverviewTrigger,
 onTabOverviewExit,
 bottomBarContentOpacity,
 bottomBarContentY,
 onNavigationStateChange,
 activeTabId,
 onUrlChange,
//  viewFaded,
//  contentFaded
}) => {
 const [scrollEnabled, setScrollEnabled] = useState(false);
 const [isWebViewActive, setIsWebViewActive] = useState(false);
 const [isStartPageActive, setIsStartPageActive] = useState(false);

const [downloads, setDownloads] = useState<Array<{
 id: string;
 name: string;
 url: string;
 size: string;
 type: string;
 date: Date;
 progress?: number;
}>>([]);
 useEffect(() => {
const hasWebView = tabs[activeTabIndex]?.url !== null && tabs[activeTabIndex]?.url !== undefined;
setIsWebViewActive(hasWebView);
const hasStartPage = tabs[activeTabIndex]?.url === null || tabs[activeTabIndex]?.url === undefined;
setIsStartPageActive(hasStartPage);
hideDownloadsView();
if (typeof window !== 'undefined') {
if (!window.browserViewState) {
window.browserViewState = {
isWebViewActive: hasWebView,
setIsWebViewActive: setIsWebViewActive,
isStartPageActive: hasStartPage,
setIsStartPageActive: setIsStartPageActive
};
} else {
window.browserViewState.isWebViewActive = hasWebView;
window.browserViewState.setIsWebViewActive = setIsWebViewActive;
window.browserViewState.isStartPageActive = hasStartPage;
window.browserViewState.setIsStartPageActive = setIsStartPageActive;
}
}
}, [tabs, activeTabIndex]);
useEffect(() => {
if (typeof window !== 'undefined') {
if (!window.browserViewState) {
window.browserViewState = {
isWebViewActive,
setIsWebViewActive,
isStartPageActive,
setIsStartPageActive
};
} else {
window.browserViewState.isWebViewActive = isWebViewActive;
}
}
}, [isWebViewActive]);
 const [navigationStates, setNavigationStates] = useState<{[key: number]: {canGoBack: boolean, canGoForward: boolean, url: string}}>({});
 const scrollRef = useRef<ScrollView>(null);
 const webViewRefs = useRef<{ [key: number]: WebView | null }>({});
 const lastScrollY = useRef(0);
 const scrollThreshold = 20;
 const viewFade = useSharedValue(1);
 const contentFade = useSharedValue(1);
 const scale = useSharedValue(1);
 const height = useSharedValue(SCREEN.height);
 const radius = useSharedValue(0);
 const blurVal = useSharedValue(35);
 const breakPad = useSharedValue(25);
 const tabTitleOpacity = useSharedValue(0);
 const closeOpacity = useSharedValue(0);
 const translateUp = useSharedValue(0);
 const searchHeaderOpacity = useSharedValue(1);
 const searchHeaderTranslateY = useSharedValue(0);
const [loadingStates, setLoadingStates] = useState<{[key: number]: boolean}>({});
const loadingOpacity = useSharedValue(0);
const loadingScale = useSharedValue(1);
const gradientTranslateY = useSharedValue(0);
useEffect(() => {
if (typeof window !== 'undefined') {
(window as any).globalGradientSync.gradientTranslateY = gradientTranslateY;

(window as any).globalGradientSync.updateGradient = (translateY: number) => {
gradientTranslateY.value = withTiming(translateY, { 
duration: 200, 
easing: reanimatedEasing 
});
};
}
}, []);

const gradientPanResponder = useRef(
PanResponder.create({
onStartShouldSetPanResponder: () => true,
onMoveShouldSetPanResponder: () => true,
onPanResponderGrant: () => {
},
onPanResponderMove: (_, gesture) => {
const clampedY = Math.max(0, Math.min(300, gesture.dy));
gradientTranslateY.value = clampedY;
},
onPanResponderRelease: (_, gesture) => {
if (gesture.dy > 150 || gesture.vy > 0.5) {
gradientTranslateY.value = withTiming(300, { 
duration: 200, 
easing: reanimatedEasing 
});
} else {
gradientTranslateY.value = withTiming(0, { 
duration: 200, 
easing: reanimatedEasing 
});
}
},
})
).current;

const startLoadingAnimation = () => {
console.log('🎬 Starting loading animation');
loadingOpacity.value = withTiming(1, { duration: 300 });
loadingScale.value = withRepeat(
withTiming(1.2, { duration: 300, easing: Easing.inOut(Easing.ease) }),
-1,
true
);
};

const stopLoadingAnimation = () => {
console.log('🛑 Stopping loading animation');
setTimeout(() => {
loadingOpacity.value = withTiming(0, { duration: 300 });
loadingScale.value = withTiming(1, { duration: 300 });
}, 500);
};

const handleLoadStart = (tabIndex: number) => {
console.log(`🔄 WebView ${tabIndex} started loading`);
setLoadingStates(prev => {
const newState = { ...prev, [tabIndex]: true };
console.log('📊 Loading states after start:', newState);
return newState;
});
};

const handleLoadEnd = (tabIndex: number) => {
console.log(`✅ WebView ${tabIndex} finished loading`);
setLoadingStates(prev => {
const newState = { ...prev, [tabIndex]: false };
console.log('📊 Loading states after end:', newState);
return newState;
});
};

const loadingStyle = useAnimatedStyle(() => ({
opacity: loadingOpacity.value,
transform: [{ scale: loadingScale.value }],
}));

const showSearchHeader = () => {
searchHeaderOpacity.value = withTiming(1, { duration: 250 });
searchHeaderTranslateY.value = withTiming(0, { duration: 250 });
};

const hideSearchHeader = () => {
searchHeaderOpacity.value = withTiming(0, { duration: 250 });
searchHeaderTranslateY.value = withTiming(-30, { duration: 250 });
resotreScrollController()
};
const handleSearch = (searchText: string, tabIndex: number) => {
 console.log('🔍 Searching for:', searchText);
 let searchUrl;
 
 const isUrl = (text: string) => {
 const urlPattern = /^(https?:\/\/|www\.|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i;
 const hasProtocol = text.startsWith('http://') || text.startsWith('https://');
 const hasDomain = text.includes('.') && !text.includes(' ');
 
 return hasProtocol || urlPattern.test(text) || hasDomain;
 };
 
 if (isUrl(searchText)) {
 searchUrl = searchText.startsWith('http') ? searchText : `https://${searchText}`;
 } else {
 searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;
 }

 console.log('🌐 Final URL:', searchUrl);

 setTabs(prevTabs => 
 prevTabs.map((tab, index) => 
 index === tabIndex ? { ...tab, url: searchUrl } : tab
 )
 );
 
 setSearchValue('');
 setTabSearchValues(prev => ({ ...prev, [tabIndex]: '' }));
 
 if (typeof window !== 'undefined' && (window as any).globalSearchSync) {
 (window as any).globalSearchSync.updateExternal('');
 }
};

const triggerSearchFromExternal = (searchText: string) => {
 console.log('🎯 External search triggered:', searchText);
 handleSearch(searchText, activeTabIndex);
};

useEffect(() => {
 if (typeof window !== 'undefined') {
 (window as any).browserViewSearch = {
 triggerSearch: triggerSearchFromExternal
 };
 }
 
 return () => {
 if (typeof window !== 'undefined') {
 delete (window as any).browserViewSearch;
 }
 };
}, [activeTabIndex]);

const [tabSearchValues, setTabSearchValues] = useState<{[key: number]: string}>({});
const [searchValue, setSearchValue] = useState('');
const isOnGoogle = useSharedValue(true);
 const webViewHeight = useSharedValue(78);
 const webViewBottomBarOpacity = useSharedValue(1);
 const webViewBottomBarY = useSharedValue(0);
 const [layoutZIndex, setLayoutZIndex] = useState(0);
 const isScrollingRef = useRef(false);
 const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
 const currentScrollX = useRef(0);
 const targetScrollX = useRef(0);
 const isUserScrolling = useRef(false);
 const scrollEndTimer = useRef<NodeJS.Timeout | null>(null);
 const shouldShowTabCloser = tabs.length > 1;
 const hasActiveWebview = tabs[activeTabIndex]?.url !== null && tabs[activeTabIndex]?.url !== undefined;

 useEffect(() => {
 setLayoutZIndex(hasActiveWebview ? 9 : 0);
 }, [hasActiveWebview, activeTabIndex]);

 useEffect(() => {
 const hasWebview = tabs[activeTabIndex]?.url !== null && tabs[activeTabIndex]?.url !== undefined;
 setLayoutZIndex(hasWebview ? 9 : 0);
 }, [tabs, activeTabIndex]);

useEffect(() => {
const isActiveTabLoading = loadingStates[activeTabIndex];
if (isActiveTabLoading) {
startLoadingAnimation();
} else {
stopLoadingAnimation();
}
}, [loadingStates, activeTabIndex]);

 const updateGlobalNavigationState = () => {
 const activeTabNav = navigationStates[activeTabIndex];
 if (typeof window !== 'undefined') {
 if (!window.browserNavigation) {
 window.browserNavigation = {
 goBack: handleGoBack,
 goForward: handleGoForward,
 refresh: handleRefresh,
 };
 }
 
 window.browserNavigation.canGoBack = activeTabNav?.canGoBack ?? false;
 window.browserNavigation.canGoForward = activeTabNav?.canGoForward ?? false;
 window.browserNavigation.currentUrl = activeTabNav?.url ?? '';
 window.browserNavigation.shortUrl = activeTabNav?.url ? getShortUrl(activeTabNav.url) : '';
 window.browserNavigation.goBack = handleGoBack;
 window.browserNavigation.goForward = handleGoForward;
 window.browserNavigation.refresh = handleRefresh;
 }
 };

 const handleGoBack = () => {
const currentWebView = webViewRefs.current[activeTabIndex];
if (currentWebView) {
 currentWebView.goBack();
}
 };

 const handleGoForward = () => {
const currentWebView = webViewRefs.current[activeTabIndex];
if (currentWebView) {
 currentWebView.goForward();
}
 };

 const handleRefresh = () => {
const currentWebView = webViewRefs.current[activeTabIndex];
if (currentWebView) {
 currentWebView.reload();
}
 };

 useEffect(() => {
 updateGlobalNavigationState();
 }, [navigationStates, activeTabIndex]);

 useEffect(() => {
 const listener = tabOverviewTrigger.addListener(({ value }) => {
 if (value === 1) {
 animateIn();
 } else {
 animateOut();
 }
 });

 return () => {
 tabOverviewTrigger.removeListener(listener);
 };
 }, [tabOverviewTrigger]);

 useAnimatedReaction(
 () => scale.value,
 (val) => {
 runOnJS(setScrollEnabled)(val < 1);
 }
 );

 const hideBottomBar = () => {
 RNAnimated.parallel([
 RNAnimated.timing(bottomBarContentOpacity, {
 toValue: 0,
 duration: 700,
 easing: rnAnimatedEasing,
 useNativeDriver: true,
 }),
 RNAnimated.timing(bottomBarContentY, {
 toValue: 100,
 duration: 900,
 easing: rnAnimatedEasing,
 useNativeDriver: true,
 }),
 ]).start();
 };

 const restoreBottomBar = () => {
 RNAnimated.parallel([
 RNAnimated.timing(bottomBarContentOpacity, {
 toValue: 1,
 duration: 700,
 easing: rnAnimatedEasing,
 useNativeDriver: true,
 }),
 RNAnimated.timing(bottomBarContentY, {
 toValue: 0,
 duration: 900,
 easing: rnAnimatedEasing,
 useNativeDriver: true,
 }),
 ]).start();
 };

 const showBottomBar = () => {
 webViewBottomBarOpacity.value = withTiming(1, { duration: 150, easing: reanimatedEasing });
 webViewBottomBarY.value = withTiming(0, { duration: 150, easing: reanimatedEasing });
 webViewHeight.value = withTiming(78, { duration: 150, easing: reanimatedEasing });
 };

const handleNavigationStateChange = (navState: any, tabIndex: number) => {
setNavigationStates(prev => ({
...prev,
[tabIndex]: {
canGoBack: navState.canGoBack,
canGoForward: navState.canGoForward,
url: navState.url,
}
}));

setTabs(prev => {
const updated = [...prev];
updated[activeTabIndex] = {
...updated[activeTabIndex],
title: navState.title || 'Untitled'
};
return updated;
});

if (tabIndex === activeTabIndex) {
 if (onNavigationStateChange) {
onNavigationStateChange(navState.canGoBack, navState.canGoForward);
 }
 
 if (onUrlChange && navState.url) {
const shortUrl = getShortUrl(navState.url);
onUrlChange(navState.url, shortUrl);
 }

 const isGoogleSearch =
 navState.url?.startsWith("https://www.google.") &&
 (navState.url.includes("/search") || navState.url.includes("www.google.com/"));

 isOnGoogle.value = isGoogleSearch;

 if (isGoogleSearch) {
 showSearchHeader();
 } else {
 hideSearchHeader();
 }
}
};

 const animateIn = () => {
 scale.value = withTiming(0.85, { duration: 700, easing: reanimatedEasing });
 height.value = withTiming(SCREEN.height * 0.77, { duration: 700, easing: reanimatedEasing });
 radius.value = withTiming(35, { duration: 700, easing: reanimatedEasing });
 blurVal.value = withTiming(50, { duration: 700, easing: reanimatedEasing });
 breakPad.value = withTiming(0, { duration: 500, easing: reanimatedEasing });
 translateUp.value = withTiming(-20, { duration: 700, easing: reanimatedEasing });
 tabTitleOpacity.value = withTiming(1, { duration: 600, easing: reanimatedEasing });
 closeOpacity.value = withTiming(shouldShowTabCloser ? 1 : 0, { duration: 600, easing: reanimatedEasing });
 webViewBottomBarOpacity.value = withTiming(0, { duration: 500, easing: reanimatedEasing });
 webViewBottomBarY.value = withTiming(100, { duration: 500, easing: reanimatedEasing });

 RNAnimated.parallel([
 RNAnimated.timing(bottomBarContentOpacity, {
 toValue: 0,
 duration: 400,
 easing: rnAnimatedEasing,
 useNativeDriver: true,
 }),
 RNAnimated.timing(bottomBarContentY, {
 toValue: 100,
 duration: 900,
 easing: rnAnimatedEasing,
 useNativeDriver: true,
 }),
 ]).start();

 setIsTabOverviewActive(true);
 
 setTimeout(() => {
 const activeWebView = webViewRefs.current[activeTabIndex];
 if (activeWebView) {
 activeWebView.injectJavaScript(`
 if (window.resumeAllMedia) {
 window.resumeAllMedia();
 }
 true;
 `);
 }
 }, 300);
 };

 const pauseInactiveTabsMedia = (currentActiveIndex: number) => {
 Object.keys(webViewRefs.current).forEach(tabIndexStr => {
 const tabIndex = parseInt(tabIndexStr);
 if (tabIndex !== currentActiveIndex && webViewRefs.current[tabIndex]) {
 webViewRefs.current[tabIndex]?.injectJavaScript(`
 if (window.pauseAllMedia) {
 window.pauseAllMedia();
 }
 true;
 `);
 }
 });
 };

 useEffect(() => {
 pauseInactiveTabsMedia(activeTabIndex);
 }, [activeTabIndex]);

 const animateOut = () => {
 scale.value = withTiming(1, { duration: 700, easing: reanimatedEasing });
 height.value = withTiming(SCREEN.height, { duration: 700, easing: reanimatedEasing });
 radius.value = withTiming(0, { duration: 700, easing: reanimatedEasing });
 blurVal.value = withTiming(30, { duration: 700, easing: reanimatedEasing });
 breakPad.value = withTiming(25, { duration: 500, easing: reanimatedEasing });
 translateUp.value = withTiming(0, { duration: 700, easing: reanimatedEasing });
 tabTitleOpacity.value = withTiming(0, { duration: 400, easing: reanimatedEasing });
 closeOpacity.value = withTiming(0, { duration: 400, easing: reanimatedEasing });
 
 showBottomBar();

 setTimeout(() => {
 RNAnimated.parallel([
 RNAnimated.timing(bottomBarContentOpacity, {
 toValue: 1,
 duration: 600,
 easing: rnAnimatedEasing,
 useNativeDriver: true,
 }),
 RNAnimated.timing(bottomBarContentY, {
 toValue: 0,
 duration: 700,
 easing: rnAnimatedEasing,
 useNativeDriver: true,
 }),
 ]).start();
}, 200);

setIsTabOverviewActive(false);
 setTimeout(() => {
 const activeWebView = webViewRefs.current[activeTabIndex];
 if (activeWebView) {
 activeWebView.injectJavaScript(`
 if (window.resumeAllMedia) {
 window.resumeAllMedia();
 }
 true;
 `);
 }
 }, 300); 
};

const downloadsViewScale = useSharedValue(0.8);
const downloadsViewY = useSharedValue(-25);
const downloadsViewX = useSharedValue(40);
const downloadsViewOpacity = useSharedValue(0);
const [ downloadsViewZindex, setDownloadsViewZindex ] = useState(-99)
const [ downloadsViewHelperZindex, setDownloadsViewHelperZindex ] = useState(-999)
const [ donwloadsViewPointerEvents, setDownloadsViewPointerEvents ] = useState<"none" | "auto">('none')

const showDownloadsView = () => {
setDownloadsViewZindex(999999)
setDownloadsViewHelperZindex(99999)
setDownloadsViewPointerEvents('auto')
downloadsViewScale.value = withTiming(1, { duration: 400, easing: reanimatedEasing });
downloadsViewY.value = withTiming(0, { duration: 400, easing: reanimatedEasing });
downloadsViewX.value = withTiming(0, { duration: 400, easing: reanimatedEasing });
downloadsViewOpacity.value = withTiming(1, { duration: 400, easing: reanimatedEasing });
};

const hideDownloadsViewInternal = () => {
setDownloadsViewZindex(-99)
setDownloadsViewHelperZindex(-999);
setDownloadsViewPointerEvents('none')
downloadsViewScale.value = withTiming(0.8, { duration: 200, easing: reanimatedEasing });
downloadsViewY.value = withTiming(-25, { duration: 200, easing: reanimatedEasing });
downloadsViewX.value = withTiming(40, { duration: 200, easing: reanimatedEasing });
downloadsViewOpacity.value = withTiming(0, { duration: 200, easing: reanimatedEasing });
};

useEffect(() => {
globalHideDownloadsView = hideDownloadsViewInternal;
globalShowDownloadsView = showDownloadsView;
globalHideBottomBar = hideBottomBar;
globalDisplayBottomBar = restoreBottomBar;
return () => {
globalHideDownloadsView = null;
globalShowDownloadsView = null;
globalHideBottomBar = null;
globalDisplayBottomBar = null;
};
}, []);

useEffect(() => {
if (typeof window !== 'undefined') {
(window as any).downloadsViewHelperZindex = downloadsViewHelperZindex;
(window as any).setDownloadsViewHelperZindex = setDownloadsViewHelperZindex;
}
}, [downloadsViewHelperZindex]);

 const handleTabPress = (index: number) => {
 if (!isUserScrolling.current && !isScrollingRef.current) {
 onTabSelect(index);
 targetScrollX.current = index * SCREEN.width;
 if (scrollRef.current) {
 scrollRef.current.scrollTo({ x: targetScrollX.current, animated: true });
 }
 }
 };

 const handleCloseTab = (index: number) => {
 onTabClose(index);
 };

 const panResponder = useRef(
 PanResponder.create({
 onStartShouldSetPanResponder: () => true,
 onPanResponderMove: (_, gesture) => {
 if (gesture.dy < -150) {
 runOnJS(handleCloseTab)(activeTabIndex);
 }
 },
 })
 ).current;

 const handleScrollBeginDrag = () => {
 isUserScrolling.current = true;
 isScrollingRef.current = true;
 
 if (scrollTimeoutRef.current) {
 clearTimeout(scrollTimeoutRef.current);
 }
 if (scrollEndTimer.current) {
 clearTimeout(scrollEndTimer.current);
 }
 };

 const handleScrollEndDrag = (event: any) => {
 const scrollX = event.nativeEvent.contentOffset.x;
 currentScrollX.current = scrollX;
 
 scrollTimeoutRef.current = setTimeout(() => {
 isUserScrolling.current = false;
 }, 300);
 };

 const handleMomentumScrollEnd = (event: any) => {
 const scrollX = event.nativeEvent.contentOffset.x;
 const newIndex = Math.round(scrollX / SCREEN.width);
 
 currentScrollX.current = scrollX;
 targetScrollX.current = newIndex * SCREEN.width;
 
 if (newIndex >= 0 && newIndex < tabs.length && newIndex !== activeTabIndex) {
 setActiveTabIndex(newIndex);
 }

 scrollEndTimer.current = setTimeout(() => {
 isScrollingRef.current = false;
 isUserScrolling.current = false;
 }, 100);
 
 if (scrollTimeoutRef.current) {
 clearTimeout(scrollTimeoutRef.current);
 }
 };

 const handleScroll = (event: any) => {
 currentScrollX.current = event.nativeEvent.contentOffset.x;
 };

 useEffect(() => {
 if (!isUserScrolling.current && !isScrollingRef.current && scrollRef.current) {
 const expectedX = activeTabIndex * SCREEN.width;
 if (Math.abs(currentScrollX.current - expectedX) > 10) {
 targetScrollX.current = expectedX;
 scrollRef.current.scrollTo({ x: expectedX, animated: true });
 }
 }
 }, [activeTabIndex]);

 useEffect(() => {
 if (isTabOverview) {
 closeOpacity.value = withTiming(shouldShowTabCloser ? 1 : 0, { duration: 300, easing: reanimatedEasing });
 }
 }, [tabs.length, isTabOverview, shouldShowTabCloser]);

 useEffect(() => {
 return () => {
 if (scrollTimeoutRef.current) {
 clearTimeout(scrollTimeoutRef.current);
 }
 if (scrollEndTimer.current) {
 clearTimeout(scrollEndTimer.current);
 }
 };
 }, []);

 const layoutStyle = useAnimatedStyle(() => ({ 
 opacity: viewFade.value
 }));
 const searchHeaderStyle = useAnimatedStyle(() => ({
opacity: searchHeaderOpacity.value,
transform: [{ translateY: searchHeaderTranslateY.value }],
 }));
 const contentStyle = useAnimatedStyle(() => ({ opacity: contentFade.value }));
 const tabStyle = useAnimatedStyle(() => ({
 transform: [{ scale: scale.value }, { translateY: translateUp.value }],
 height: height.value,
 }));
 const tabMainStyle = useAnimatedStyle(() => ({ borderRadius: radius.value }));
 const breakStyle = useAnimatedStyle(() => ({ paddingVertical: breakPad.value }));
 const blurProps = useAnimatedProps(() => ({ intensity: blurVal.value }));
 const titleStyle = useAnimatedStyle(() => ({ opacity: tabTitleOpacity.value }));
 const closerStyle = useAnimatedStyle(() => ({ opacity: closeOpacity.value }));

 const webViewStyle = useAnimatedStyle(() => ({
 height: `${webViewHeight.value}%`,
 }));

 const [tabInputFocused, setTabInputFocused] = useState<{[key: number]: boolean}>({});

const getDisplayValue = (tabIndex: number) => {
const currentValue = globalSearchSync.externalSearchValue || tabSearchValues[tabIndex] || '';
const isFocused = tabInputFocused[tabIndex];

if (isFocused || currentValue.length <= 20) {
return currentValue;
}
return currentValue.substring(0, 20) + '...';
};

const gradientStyle = useAnimatedStyle(() => ({
transform: [{ translateY: gradientTranslateY.value }],
}));

const [gradientHeight, setGradientHeight] = useState(195);
useEffect(() => {
const interval = setInterval(() => {
if (typeof window !== 'undefined' && (window as any).globalGradientHeight) {
const newHeight = (window as any).globalGradientHeight;
if (newHeight !== gradientHeight) {
setGradientHeight(newHeight);
}
}
}, 100);

return () => clearInterval(interval);
}, [gradientHeight]);

const [currentTitle, setCurrentTitle] = useState('Untitled');
useEffect(() => {
const unsubscribe = globalTitleStore.subscribe((titles) => {
if (activeTabId) {
setCurrentTitle(titles[activeTabId] || 'Untitled');
}
})

if (activeTabId) {
setCurrentTitle(globalTitleStore.getTitle(activeTabId));
}

return unsubscribe;
}, [activeTabId]);

const getFileIcon = (fileName: string) => {
 const extension = fileName.split('.').pop()?.toLowerCase() || '';
 const iconProps = StyleSheet.create({icon:{width:'100%',height:'100%'}});
 
 if (['pdf'].includes(extension)) return <PdfIcon style={iconProps.icon} />;
 if (['svg'].includes(extension)) return <SvgIcon style={iconProps.icon} />;
 if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'tiff'].includes(extension)) return <ImageIcon style={iconProps.icon} />;
 if (['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'].includes(extension)) return <AudioIcon style={iconProps.icon} />;
 if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'].includes(extension)) return <VideoIcon style={iconProps.icon} />;
 if (['html', 'htm'].includes(extension)) return <HtmlIcon style={iconProps.icon} />;
 if (['js', 'ts', 'jsx', 'tsx', 'css', 'json', 'xml', 'py', 'java', 'cpp', 'c'].includes(extension)) return <CodeIcon style={iconProps.icon} />;
 return <FileIcon style={iconProps.icon} />;
};

const formatFileSize = (bytes: number): string => {
 if (bytes === 0) return '0 Bytes';
 const k = 1024;
 const sizes = ['Bytes', 'KB', 'MB', 'GB'];
 const i = Math.floor(Math.log(bytes) / Math.log(k));
 return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const handleDownload = async (url: string, filename?: string) => {
 try {
 const downloadId = Date.now().toString();
 const name = filename || url.split('/').pop() || 'download';
 const fileExtension = name.split('.').pop()?.toLowerCase() || 'unknown';

 const newDownload = {
 id: downloadId,
 name,
 url,
 size: 'Calculating...',
 type: fileExtension,
 date: new Date(),
 progress: 0
 };
 
 setDownloads(prev => [newDownload, ...prev]);

 const progressInterval = setInterval(() => {
 setDownloads(prev => prev.map(download => {
 if (download.id === downloadId && download.progress !== undefined) {
 const newProgress = download.progress + Math.random() * 20;
 if (newProgress >= 100) {
 clearInterval(progressInterval);
 return { ...download, progress: 100, size: formatFileSize(Math.random() * 10000000) };
 }
 return { ...download, progress: newProgress };
 }
 return download;
 }));
 }, 300);
 
 } catch (error) {
 console.error('Download failed:', error);
 }
};

const openDownloadedFile = async (download: any) => {
 try {
 console.log('Opening file:', download.name);
 const fileExtension = download.name.split('.').pop()?.toLowerCase();
 
 switch (fileExtension) {
 case 'pdf':
 console.log('Opening PDF:', download.name);
 break;
 case 'jpg':
 case 'jpeg':
 case 'png':
 case 'webp':
 case 'gif':
 console.log('Opening image:', download.name);
 break;
 case 'mp4':
 case 'mov':
 case 'avi':
 console.log('Opening video:', download.name);
 break;
 default:
 console.log('Opening file with system default:', download.name);
 break;
 }
 
 } catch (error) {
 console.error('Error opening file:', error);
 }
};

const setupContextMenuActions = () => {
 globalContextMenuStore.setActions({
 onOpenNewTab: (url: string) => {
 const newTabId = Date.now();
 const newTab = { id: newTabId, url };
 setTabs(prev => [...prev, newTab]);
 setActiveTabIndex(tabs.length);
 },
 onDownload: (url: string, filename?: string) => {
 handleDownload(url, filename);
 },
 onCopy: (url: string) => {
 console.log('Copy URL:', url);
 },
 onShare: (url: string) => {
 console.log('Share URL:', url);
 },
 onAddToReadingList: async (url: string) => {
 const activeTab = tabs[activeTabIndex];
 const currentTitle = globalTitleStore.getTitle(activeTab.id);
 
 await ReadingListManager.addToReadingList({
 title: currentTitle || 'Untitled',
 url: url,
 favicon: 'https://www.google.com/s2/favicons?domain=' + new URL(url).hostname, // Get favicon URL
 });
 }
 });
};

const clearDownloads = () => {
 setDownloads([]);
};

useEffect(() => {
 setupContextMenuActions();
}, [tabs.length]);

 const { bluryIntensity, bluryBackground } = useMeter();
 const [isTabOverviewActive, setIsTabOverviewActive] = useState(false);
 const mediaControlScript = `
 (function() {
 window.pauseAllMedia = function() {
 // Pause all video elements
 const videos = document.querySelectorAll('video');
 videos.forEach(video => {
 if (!video.paused) {
 video.dataset.wasPaused = 'false';
 video.pause();
 }
 });
 
 // Pause all audio elements
 const audios = document.querySelectorAll('audio');
 audios.forEach(audio => {
 if (!audio.paused) {
 audio.dataset.wasPaused = 'false';
 audio.pause();
 }
 });
 
 // YouTube specific - pause YouTube videos
 if (window.location.hostname.includes('youtube.com')) {
 try {
 const ytPlayer = document.querySelector('#movie_player');
 if (ytPlayer && ytPlayer.pauseVideo) {
 ytPlayer.pauseVideo();
 }
 } catch (e) {
 console.log('YouTube pause failed:', e);
 }
 }
 };
 
 window.resumeAllMedia = function() {
 // Resume videos that were playing
 const videos = document.querySelectorAll('video');
 videos.forEach(video => {
 if (video.dataset.wasPaused === 'false') {
 video.play().catch(() => {});
 delete video.dataset.wasPaused;
 }
 });
 
 // Resume audios that were playing
 const audios = document.querySelectorAll('audio');
 audios.forEach(audio => {
 if (audio.dataset.wasPaused === 'false') {
 audio.play().catch(() => {});
 delete audio.dataset.wasPaused;
 }
 });
 };
 })();
`;

 return (
 <>
 <Animated.View style={[types.layout, layoutStyle, { zIndex: layoutZIndex }]}>
 <Shadows />
 <Animated.View style={[types.mainContent, contentStyle]}>
 <ScrollView
 ref={scrollRef}
 horizontal
 pagingEnabled={true}
 decelerationRate="fast"
 scrollEnabled={scrollEnabled}
 showsHorizontalScrollIndicator={false}
 bounces={true}
 bouncesZoom={false}
 directionalLockEnabled={true}
 scrollsToTop={false}
 automaticallyAdjustContentInsets={false}
 contentInsetAdjustmentBehavior="never"
 overScrollMode="never"
 keyboardDismissMode="on-drag"
 contentContainerStyle={{ alignItems: 'center' }}
 onScrollBeginDrag={handleScrollBeginDrag}
 onScrollEndDrag={handleScrollEndDrag}
 onMomentumScrollEnd={handleMomentumScrollEnd}
 onScroll={handleScroll}
 scrollEventThrottle={16}
 >

 {tabs.map((tab, i) => (
 <TouchableOpacity
 key={tab.id}
 activeOpacity={1}
 onPress={() => scrollEnabled && handleTabPress(i) && hideSearchHeader()}>
 <Animated.View
 style={[types.tab, tabStyle]}
 {...(activeTabIndex === i && isTabOverview ? panResponder.panHandlers : {})}>

 {shouldShowTabCloser && (
 <Animated.View style={[types.tabCloser, closerStyle]} onTouchStart={() => handleCloseTab(i)}>
 <TouchableOpacity onPress={() => handleCloseTab(i)} style={types.tabClose}>
 <CrossIcon width={12} height={12} opacity={0.5} />
 </TouchableOpacity>
 </Animated.View>
 )}

 <Animated.View style={[types.tabTitle, titleStyle]}>
 <Image source={favicon} style={types.favicon} />
 <Text style={types.tabTitleText}>
 {tab.url ? getShortUrl(tab.url) : 'Start Page'}
 </Text>
 </Animated.View>

{isTabOverview && (
<Pressable
onPress={() => {
onTabOverviewExit();
if (typeof window !== 'undefined' && window.resetBottomBarScrollController) {
window.resetBottomBarScrollController();
}
}}
style={types.tapOverlay}
android_disableSound={true}
hitSlop={0}
/>
)}

 <Animated.View style={[types.mainTab, tabMainStyle]}>
 <BlurView intensity={40} tint='light' style={types.layCover}/>
 <Animated.View style={breakStyle}>
 <Break py={0} />
 </Animated.View>
 {tab.url ? (
 <View style={types.webContainer}>
 <Animated.View style={[types.searchHeader, searchHeaderStyle]}>
 <Blury parentRadius={0} radius={0} height='100%' intensity={bluryIntensity} bottom={15} background={bluryBackground} zindex={0} scaleX={1}/>
 <Break py={22}/>
 <Pad direction='row' align='center' justify='center' px={20}>
 <TouchableOpacity style={[styles.justify,{zIndex:99999,transform:[{translateX:12}]}]}>
 <GoogleIcon width={22} height={22} style={[styles.absolute,{zIndex:9999}]}/>
 </TouchableOpacity>
 <TouchableOpacity style={[styles.justify,{zIndex:99999,transform:[{translateX:48},{rotate:'180deg'}]}]}>
 <ArrowDownIcon width={10} height={10} opacity={.6} style={[styles.absolute,{zIndex:9999}]}/>
 </TouchableOpacity>
 <View style={styles.searchedBar}>
<TextInput 
style={styles.searchedInput}
placeholder='Search Anything'
value={getDisplayValue(i) || currentTitle}
onFocus={() => {
setTabInputFocused(prev => ({ ...prev, [i]: true }));
}}
onBlur={() => {
setTabInputFocused(prev => ({ ...prev, [i]: false }));
}}
onChangeText={(text) => {
setTabSearchValues(prev => ({ ...prev, [i]: text }));
globalSearchSync.updateExternal(text);
}}
onSubmitEditing={() => {
 const searchText = (globalSearchSync.externalSearchValue || tabSearchValues[i])?.trim();
 if (searchText) {
 console.log('📝 Submitting from TextInput:', searchText);
 handleSearch(searchText, i);
 }
}}
returnKeyType="search"
autoCapitalize="none"
autoCorrect={false}
/>
</View>
<TouchableOpacity style={[styles.justify,{zIndex:99999,transform:[{translateX:-35}]}]} onPress={showDownloadsView}>
<DownloadIcon width={20} height={20} strokeWidth={.3} opacity={.8} style={[styles.absolute,{zIndex:9999}]}/>
</TouchableOpacity>
</Pad>
</Animated.View>
<Animated.View style={[types.downloadsView,
{zIndex:downloadsViewZindex,transform:
[{scale:downloadsViewScale},
{translateX:downloadsViewX},
{translateY:downloadsViewY}],
opacity:downloadsViewOpacity}]} pointerEvents={donwloadsViewPointerEvents}>
<Blury parentRadius={24} radius={24} height='100%' intensity={9} bottom={0} background='rgba(0, 0, 0, .01)'zindex={0} scaleX={1}/>
<View style={{paddingTop:10,paddingHorizontal:15,height:210,width:'100%'}}>
<Pad direction='row' style={styles.alignStart}>
<View style={[styles.alignStart,{width:'50%'}]}>
<TextBold size={15} color='#000000'>Downloads</TextBold>
</View>
<View style={[styles.alignEnd,{width:'50%'}]}>
<TouchableOpacity style={types.clearTouchHelper} onPress={clearDownloads}>
<TextMed size={14} color='#000000'>Clear</TextMed>
</TouchableOpacity>
</View>
</Pad>
<ScrollView showsVerticalScrollIndicator={false}>
<Break py={10}/>
{downloads.length === 0 ? (
 <View style={newStyles.emptyDownloads}>
 <TextMed size={14} color='#00000060'>No downloads yet</TextMed>
 </View>
) : (
 downloads.map((download) => (
 <TouchableOpacity 
 key={download.id} 
 style={newStyles.downloadItem}
 onPress={() => openDownloadedFile(download)}
 >
 <View style={newStyles.downloadIcon}>
 {getFileIcon(download.name)}
 </View>
 <View style={newStyles.downloadInfo}>
 <TextBold size={13} color='#000000'>{download.name}</TextBold>
 <TextMed size={11} color='#00000080'>
 {download.size} • {download.date.toLocaleDateString()}
 </TextMed>
 {download.progress !== undefined && download.progress < 100 && (
 <View style={newStyles.progressBar}>
 <View style={[newStyles.progressFill, { width: `${download.progress}%` }]} />
 </View>
 )}
 </View>
 </TouchableOpacity>
 ))
)}
</ScrollView>
</View>
</Animated.View>
<Animated.View style={[types.shadowHelper,{zIndex:99999,
opacity:downloadsViewOpacity,
transform:[{scale:downloadsViewScale},
{translateX:downloadsViewX},{
translateY:downloadsViewY}]}]} pointerEvents={donwloadsViewPointerEvents}>
<Shadowy distance={50} height={190} color="#00000025"/>
</Animated.View>
<Animated.View style={types.webview}>
<WebView
pointerEvents={globalContextMenuStore.getContextMenu().visible ? 'none' : 'auto'}
ref={(ref) => {
webViewRefs.current[i] = ref;
}}
source={{ uri: tab.url }}
onNavigationStateChange={(navState) => {
handleNavigationStateChange(navState, i);
setTabs(prev => {
const updated = [...prev];
updated[i] = {
...updated[i],
title: navState.title || 'Untitled'
};
return updated;
});

globalTitleStore.updateTitle(tab.id, navState.title || 'Untitled');
}}
onLoadStart={() => handleLoadStart(i)}
onLoadEnd={() => handleLoadEnd(i)}
onLoadProgress={(event) => {
console.log(`📈 WebView ${i} progress:`, event.nativeEvent.progress);
}}
onError={(event) => {
console.log(`❌ WebView ${i} error:`, event.nativeEvent);
handleLoadEnd(i);
}}
startInLoadingState={false}
showsVerticalScrollIndicator={false}
showsHorizontalScrollIndicator={false}
scrollEnabled={true}
overScrollMode='never'
nestedScrollEnabled={true}
javaScriptEnabled={true}
domStorageEnabled={true}
allowsInlineMediaPlayback={true}
mediaPlaybackRequiresUserAction={false}
contextMenuHidden={true}
androidLayerType="hardware"
mixedContentMode="compatibility"
style={{ opacity: loadingStates[i] ? 0.3 : 1 }}
injectedJavaScript={`
${mediaControlScript}
(function() {
 console.log('🚀 Context menu script loaded');
 
 // Title change handler
 const sendTitle = () => {
 window.ReactNativeWebView.postMessage(JSON.stringify({
 type: 'TITLE_CHANGE',
 title: document.title
 }));
 };

 sendTitle();

 const observer = new MutationObserver(() => {
 sendTitle();
 });

 const titleElement = document.querySelector('title');
 if (titleElement) {
 observer.observe(titleElement, {
 childList: true,
 subtree: true
 });
 }

 // CONTEXT MENU HANDLER - Replace default with custom
 document.addEventListener('contextmenu', (e) => {
 e.preventDefault(); // Prevent default context menu
 e.stopPropagation();
 
 const element = e.target;
 let contextType = null;
 let url = '';
 let text = '';
 
 console.log('🎯 Context menu triggered on:', element.tagName);
 
 // Check if it's a link
 if (element.tagName === 'A' || element.closest('a')) {
 const linkEl = element.tagName === 'A' ? element : element.closest('a');
 contextType = 'link';
 url = linkEl.href;
 text = linkEl.textContent || linkEl.innerText || 'Link';
 }
 // Check if it's an image
 else if (element.tagName === 'IMG') {
 contextType = 'image';
 url = element.src;
 text = element.alt || 'Image';
 }
 
 // Only show context menu for links and images
 if (contextType && url) {
 console.log('✅ Showing context menu for:', contextType, url);
 
 // Add visual feedback
 element.style.backgroundColor = 'rgba(0, 123, 255, 0.2)';
 element.style.transform = 'scale(0.98)';
 
 // Send message to React Native
 window.ReactNativeWebView.postMessage(JSON.stringify({
 type: 'CONTEXT_MENU',
 contextType: contextType,
 url: url,
 text: text,
 x: e.clientX,
 y: e.clientY
 }));
 
 // Remove visual feedback after a short delay
 setTimeout(() => {
 element.style.backgroundColor = '';
 element.style.transform = '';
 }, 300);
 }
 
 return false;
 }, true);

 // Handle scroll for header visibility
 let lastScrollY = 0;
 window.addEventListener('scroll', () => {
 const currentScrollY = window.scrollY || document.documentElement.scrollTop;
 if (currentScrollY > lastScrollY) {
 window.ReactNativeWebView.postMessage("scroll-down");
 } else if (currentScrollY < lastScrollY) {
 window.ReactNativeWebView.postMessage("scroll-up");
 }
 lastScrollY = currentScrollY;
 });
 
 console.log('✅ Context menu setup complete');
 return true;
})();
`}

onMessage={(event) => {
 const message = event.nativeEvent.data;
 console.log('📨 WebView message received:', message);

 if (message === "scroll-down") {
 runOnJS(hideSearchHeader)();
 } else if (message === "scroll-up") {
 runOnJS(showSearchHeader)();
 } else {
 try {
 const data = JSON.parse(message);
 console.log('📦 Parsed message data:', data);
 
 if (data.type === 'TITLE_CHANGE') {
 runOnJS(() => {
 setTabs(prev => {
 const updated = [...prev];
 updated[i] = {
 ...updated[i],
 title: data.title || 'Untitled'
 };
 return updated;
 });
 globalTitleStore.updateTitle(tab.id, data.title || 'Untitled');
 })();
 } else if (data.type === 'CONTEXT_MENU') {
 console.log('🎯 Context menu triggered for:', data.contextType);
 
 runOnJS(() => {
 globalContextMenuStore.show({
 x: data.x,
 y: data.y,
 type: data.contextType,
 url: data.url,
 text: data.text || ''
 });
 })();
}
 } catch (error) {
 console.log('❌ Error parsing message:', error);
 }
 }
}}/>
<Animated.View style={[types.loadingContainer, loadingStyle]} pointerEvents="none">
<Blury parentRadius={0} radius={0} intensity={20} bottom={0} background='rgba(255, 255, 255, .0)' zindex={0} height='100%' scaleX={1}/>
<Animated.Image 
source={favicon} 
style={[types.loadingImage, { transform: [{ scale: loadingScale }] }]} 
/>
</Animated.View>
<Animated.View 
style={[
types.shadowy, 
gradientStyle,
{ height: gradientHeight }
]} 
pointerEvents='auto'
>
<LinearGradient
colors={['#00000000', '#000000c3', '#000000']}
start={{ x: 0.5, y: 0 }}
end={{ x: 0.5, y: 1 }}
style={{ width: '100%', height: '100%' }}
/>
</Animated.View>
</Animated.View>
<Animated.View style={[{ zIndex: 999 }, searchHeaderStyle]}>
<Shadowy distance={120} color="#00000060" height={100}/>
</Animated.View>
 </View>
 ) : (
 <StartPage />
 )}
 </Animated.View>
 </Animated.View>
 </TouchableOpacity>
 ))}
 </ScrollView>
 </Animated.View>
 </Animated.View>
 </>
 );
};

const types = StyleSheet.create({
 layout: {
 flex: 1,
 position: 'absolute',
 bottom: 0,
 height: '90%',
 },
 mainContent: { flex: 1 },
 tab: {
 width: SCREEN.width,
 height: '100%',
 alignItems: 'center',
 position: 'relative',
 justifyContent: 'flex-start',
 },
 tabTitle: {
 flexDirection: 'row',
 alignItems: 'center',
 gap: 6,
 transform: [{ translateY: -50 }],
 },
 favicon: { width: 28, height: 28 },
 tabTitleText: {
 fontSize: 19,
 color: '#fff',
 fontFamily: 'Font-Regular',
 },
 mainTab: {
 width: '100%',
 height: '110%',
 top: -10,
 overflow: 'hidden',
 position: 'absolute',
 borderWidth: 1.5,
 backgroundColor: '#ffffff40',
 borderColor: '#ffffff80',
 alignItems: 'center',
 },
 layCover: {
 ...StyleSheet.absoluteFillObject,
 },
 webContainer: {
 width: '100%',
 height: '100%',
 paddingTop: 20,
 position: 'absolute',
 zIndex: 9999,
 backgroundColor: '#202020',
 },
 webview: {
 width: '100%',
 height: '100%',
 position: 'absolute',
 paddingTop: 30,
 backgroundColor: '#ffffff'
 },
 tabCloser: {
 width: '100%',
 position: 'absolute',
 zIndex: 99999999,
 transform: [{ translateY: -20 }, { translateX: 10 }],
 alignItems: 'flex-end',
 },
 tabClose: {
 width: 40,
 height: 40,
 borderRadius: 100,
 borderWidth: 1.5,
 alignItems: 'center',
 justifyContent: 'center',
 borderColor: '#fffffff5',
 backgroundColor: '#ffffffe5',
 },
 tapOverlay: {
 width: '100%',
 height: '110%',
 borderRadius: 30,
 transform: [{ translateY: -45 }],
 zIndex: 999999,

 },
 shadowy: {
 width: '100%',
 height: 195,
 bottom: 0,
 left: 0,
 zIndex: 9,
 opacity: .7,
 position: 'absolute',
 },
 searchHeader: {
 width: '100%',
 height: 120,
 top: 0,
 left: 0,
 zIndex: 99999,
 position: 'absolute',

 },
loadingContainer: {
position: 'absolute',
top: 0,
left: 0,
right: 0,
width: '100%',
height: '100%',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#ffffffd5',
},
loadingImage: {
width: 100,
height: 100,
},
downloadsView: {
width: 350,
right: 20,
top: 100,
borderRadius: 25,
position: 'absolute',
backgroundColor: '#ffffffc5',
borderWidth: 1.5,
borderColor: '#ffffffd3'
},
shadowHelper: {
width: 350,
height: 200,
right: 20,
top: 100,
borderRadius: 25,
position: 'absolute',
borderWidth: 1.5,
borderColor: '#ffffff00'
},
clearTouchHelper: {
paddingHorizontal: 8,
borderRadius: 9,
borderWidth: 1.5,
borderColor: '#00000020',
backgroundColor: '#00000019'
},
clearDownloadsHelper: {
width: '100%',
height: '100%',
position: 'absolute',
top: 0,
left: 0,
}
});

const newStyles = StyleSheet.create({
 contextMenuOverlay: {
 position: 'absolute',
 top: 0,
 left: 0,
 right: 0,
 bottom: 0,
 width: '100%',
 height: '100%',
 zIndex: 99999998, // Just below the context menu
 backgroundColor: 'transparent', // Make it transparent so it's invisible but catches touches
 },
 contextMenu: {
 position: 'absolute',
 backgroundColor: '#ffffffd0',
 borderRadius: 12,
 borderWidth: 1,
 borderColor: '#ffffff80',
 zIndex: 99999999, // Highest z-index
 width: 200,
 overflow: 'hidden',
 // Add shadow for better visibility
 shadowColor: '#000',
 shadowOffset: {
 width: 0,
 height: 4,
 },
 shadowOpacity: 0.3,
 shadowRadius: 8,
 elevation: 10, // For Android
 },
 contextMenuItem: {
 paddingHorizontal: 16,
 paddingVertical: 12,
 borderBottomWidth: 0.5,
 borderBottomColor: '#00000020',
 // Add hover-like effect
 backgroundColor: 'red',
 },
 // ... rest of your existing styles
 downloadItem: {
 flexDirection: 'row',
 alignItems: 'center',
 paddingVertical: 8,
 paddingHorizontal: 4,
 borderRadius: 8,
 marginBottom: 4,
 },
 downloadIcon: {
 width: 40,
 height: 40,
 borderRadius: 8,
 alignItems: 'center',
 justifyContent: 'center',
 marginRight: 12,
 },
 downloadInfo: {
 flex: 1,
 },
 progressBar: {
 width: '100%',
 height: 3,
 backgroundColor: '#e0e0e0',
 borderRadius: 1.5,
 marginTop: 4,
 overflow: 'hidden',
 },
 progressFill: {
 height: '100%',
 backgroundColor: '#007AFF',
 borderRadius: 1.5,
 },
 emptyDownloads: {
 alignItems: 'center',
 paddingVertical: 40,
 },
})

Object.assign(types, newStyles);