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
import { ArrowLeftIcon, DotIcon } from '../icons/Icons';

interface PrivateBottomBarProps {
contentFade: Animated.Value;
}

const easing = Easing.bezier(0.16, 1, 0.29, 0.99);

export const PrivateBottomBar: React.FC<PrivateBottomBarProps> = ({ contentFade }) => {
const [searchValue, setSearchValue] = useState('');
const [isFocused, setIsFocused] = useState(false);
const inputRef = useRef<TextInput>(null);

const COLLAPSED_HEIGHT = 65;
const EXPANDED_HEIGHT = 500;
const COLLAPSED_RADIUS = 0;
const EXPANDED_RADIUS = 40;

const searcherHeight = useRef(new Animated.Value(COLLAPSED_HEIGHT)).current;
const radiusAnim = useRef(new Animated.Value(COLLAPSED_RADIUS)).current;
const focusLayerOpacity = useRef(new Animated.Value(0)).current;
const bgColorAnim = useRef(new Animated.Value(0)).current;
const searchWidthAnim = useRef(new Animated.Value(0)).current;
const iconFadeSlideAnim = useRef(new Animated.Value(1)).current;

const backgroundColorInterpolate = bgColorAnim.interpolate({
inputRange: [0, 1],
outputRange: ['#ffffff00', '#ffffff15'],
});

const animateExpand = () => {
Animated.parallel([
Animated.timing(searcherHeight, {
toValue: EXPANDED_HEIGHT,
duration: 700,
easing,
useNativeDriver: false,
}),
Animated.timing(radiusAnim, {
toValue: EXPANDED_RADIUS,
duration: 700,
easing,
useNativeDriver: false,
}),
Animated.timing(focusLayerOpacity, {
toValue: 1,
duration: 700,
easing,
useNativeDriver: true,
}),
Animated.timing(bgColorAnim, {
toValue: 1,
duration: 700,
easing,
useNativeDriver: false,
}),
Animated.timing(searchWidthAnim, {
toValue: 1,
duration: 700,
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
Animated.timing(searcherHeight, {
toValue: COLLAPSED_HEIGHT,
duration: 700,
easing,
useNativeDriver: false,
}),
Animated.timing(radiusAnim, {
toValue: COLLAPSED_RADIUS,
duration: 700,
easing,
useNativeDriver: false,
}),
Animated.timing(focusLayerOpacity, {
toValue: 0,
duration: 700,
easing,
useNativeDriver: true,
}),
Animated.timing(bgColorAnim, {
toValue: 0,
duration: 700,
easing,
useNativeDriver: false,
}),
Animated.timing(searchWidthAnim, {
toValue: 0,
duration: 700,
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

return (
<>
<Animated.View
style={[
styles.focusLayer,
{
opacity: focusLayerOpacity,
pointerEvents: isFocused ? 'auto' : 'none',
},
]}
>
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
borderTopLeftRadius: radiusAnim,
borderTopRightRadius: radiusAnim,
backgroundColor: backgroundColorInterpolate,
},
]}
>
<View style={styles.PrivateBottomLayer}>
<Animated.View style={{ height: searcherHeight, overflow: 'hidden' }}>
<Break py={5} />
<Pad direction="row" gap={290}>
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
}}
>
<PrivatePullButton>
<View style={styles.absolute}>
<ArrowLeftIcon width={17} height={17} opacity={0.7} />
</View>
</PrivatePullButton>
</Animated.View>

<Animated.View
style={{
width: searchWidthAnim.interpolate({
inputRange: [0, 1],
outputRange: ['100%', '140%'],
}),
display: 'flex',
alignItems: 'center',
position: 'absolute',
}}
>
<PrivacySearchBar
ref={inputRef}
value={searchValue}
onTextChanged={setSearchValue}
onCancel={handleCancel}
onFocus={handleFocus}
onBlur={handleBlur}
/>
</Animated.View>

<Animated.View
style={{
opacity: iconFadeSlideAnim,
transform: [
{
translateX: iconFadeSlideAnim.interpolate({
inputRange: [0, 1],
outputRange: [30, 0],
}),
},
],
}}
>
<TouchableOpacity>
<PrivatePullButton>
<View style={styles.absolute}>
<DotIcon width={23} height={23} opacity={0.7} />
</View>
</PrivatePullButton>
</TouchableOpacity>
</Animated.View>
</Pad>
</Animated.View>
</View>
</Animated.View>
</>
);
};