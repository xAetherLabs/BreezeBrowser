import React, { forwardRef, useEffect } from 'react';
import {
Pressable,
Text,
TextInput,
TextInput as RNTextInput,
ViewStyle,
View,
} from 'react-native';
import Animated, {
AnimateStyle,
useSharedValue,
useAnimatedStyle,
withTiming,
Easing,
} from 'react-native-reanimated';
import { styles } from '../styles/computed/styles';
import { CancelIcon } from '../icons/Icons';

type Props = {
value: string;
onTextChanged: (text: string) => void;
onCancel: () => void;
onPress: () => void;
onFocus: () => void;
onBlur: () => void;
onSubmitEditing: () => void;
style?: AnimateStyle<ViewStyle>;
isSubmitted?: boolean;
shortUrl?: string;
isFocused?: boolean;
tabSearchValue?: string;
onTabSearchSync?: (text: string) => void; 
};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const SearchBar = forwardRef<RNTextInput, Props>(
(
{
value,
onTextChanged,
onCancel,
onFocus,
onBlur,
onSubmitEditing,
onPress,
style,
isSubmitted = false,
shortUrl = '',
isFocused = false,
tabSearchValue = '',
onTabSearchSync,
},
ref
) => {
const inputWidth = useSharedValue(0);
const reanimatedEasing = Easing.bezier(0.16, 1, 0.29, 0.99);
 const displayValue = tabSearchValue || value;

const handleFocus = () => {
inputWidth.value = withTiming(1, {
duration: 800,
easing: reanimatedEasing,
});
onFocus();
};

const handleBlur = () => {
inputWidth.value = withTiming(0, {
duration: 800,
easing: reanimatedEasing,
});
onBlur();
};

const handleSubmit = () => {
onSubmitEditing();
};

const handleCancel = () => {
onTextChanged('');
};

useEffect(() => {
if (isFocused) {
inputWidth.value = withTiming(1, {
duration: 800,
easing: reanimatedEasing,
});
} else if (isSubmitted) {
inputWidth.value = withTiming(0.5, {
duration: 500,
easing: reanimatedEasing,
});
} else {
inputWidth.value = withTiming(0, {
duration: 800,
easing: reanimatedEasing,
});
}
}, [isFocused, isSubmitted]);

const animatedInputStyle = useAnimatedStyle(() => {
if (inputWidth.value === 0) {
return { width: undefined };
} else if (inputWidth.value === 1) {
return { width: '100%' };
} else {
return { width: 'auto' };
}
});

useEffect(() => {
if (typeof window !== 'undefined' && (window as any).globalSearchSync) {
const sync = (window as any).globalSearchSync;
sync.externalSearchCallback = onTextChanged;

return () => {
sync.externalSearchCallback = null;
};
}
}, [onTextChanged]);

const handleTextChange = (text: string) => {
onTextChanged(text);
if (typeof window !== 'undefined' && (window as any).globalSearchSync) {
(window as any).globalSearchSync.externalSearchValue = text;
}
};
const showPlaceholder = value === '' && isFocused && !isSubmitted;
const showCancel = value.length > 0 && !isSubmitted;

return (
<Animated.View style={[styles.searchBar, style]}>
{/* {showPlaceholder && (
<Text style={styles.searchPlaceHolder}>Type to search</Text>
)} */}
<View style={styles.align}>
<AnimatedTextInput
ref={ref}
value={isSubmitted && shortUrl ? shortUrl : value}
onFocus={handleFocus}
onBlur={handleBlur}
onPress={onPress}
onTouchStart={onPress}
onChangeText={(text) => {
onTextChanged(text);
if (typeof window !== 'undefined' && (window as any).globalSearchSync) {
(window as any).globalSearchSync.externalSearchValue = text;
}
}}
onSubmitEditing={handleSubmit}
style={[styles.searchInput, animatedInputStyle]}
returnKeyType="search"
blurOnSubmit={true}
editable={true}
placeholder="Search or enter URL"/>
</View>
</Animated.View>
);
}
);

SearchBar.displayName = 'SearchBar';