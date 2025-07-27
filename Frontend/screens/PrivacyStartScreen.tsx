import React, { useEffect, useRef } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { Break, Pad } from '../components/elements/Components';
import { Button, PrivatePullButton, styles } from '../components/styles/computed/styles';
import { ArrowRightIcon, DotIcon, TabIcon } from '../components/icons/Icons';
import { Shadow } from 'react-native-shadow-2';
import favicon from '../assets/images/favico.png';

interface Props {
contentFade: Animated.Value;
}

export const PrivacyStartScreen: React.FC<Props> = ({ contentFade }) => {
const logoAnim = useRef(new Animated.Value(0)).current;
const headingAnim = useRef(new Animated.Value(0)).current;
const subtextAnim = useRef(new Animated.Value(0)).current;
const suggestionsAnim = useRef(new Animated.Value(0)).current;

const runAnimation = () => {
logoAnim.setValue(0);
headingAnim.setValue(0);
subtextAnim.setValue(0);
suggestionsAnim.setValue(0);

setTimeout(() => {
Animated.sequence([
Animated.timing(logoAnim, {
toValue: 1,
duration: 400,
useNativeDriver: true,
}),
Animated.timing(headingAnim, {
toValue: 1,
duration: 300,
useNativeDriver: true,
}),
Animated.timing(subtextAnim, {
toValue: 1,
duration: 300,
useNativeDriver: true,
}),
Animated.timing(suggestionsAnim, {
toValue: 1,
duration: 300,
useNativeDriver: true,
}),
]).start();
}, 300);
};

useEffect(() => {
requestAnimationFrame(() => {
contentFade.stopAnimation((value) => {
if (value === 1) runAnimation();
});
});

const listener = contentFade.addListener(({ value }) => {
if (value === 1) runAnimation();
});

return () => {
contentFade.removeListener(listener);
};
}, [contentFade]);

return (
<Pad style={styles.wFull} px={27}>
<Break py={25} />
<View style={styles.alignStart}>
<PrivatePullButton>
<View style={styles.absolute}>
<TabIcon width={32} height={32} opacity={0.7} />
</View>
</PrivatePullButton>
</View>

<Break py={50} />

<Animated.Image
source={favicon}
style={{
width: 80,
height: 80,
opacity: logoAnim,
transform: [{ scale: logoAnim }],
}}
/>

<Animated.View
style={{
opacity: headingAnim,
transform: [
{
translateY: headingAnim.interpolate({
inputRange: [0, 1],
outputRange: [20, 0],
}),
},
],
}}
>
<Text style={{ fontFamily: 'Font-Heavy', fontSize: 40, color: '#ffffff' }}>
Privacy <Text style={{ color: '#ffffff90' }}>Mode.</Text>
</Text>
</Animated.View>

<Animated.Text
style={{
fontFamily: 'Font-Regular',
fontSize: 17.7,
color: '#ffffff50',
textAlign: 'center',
marginTop: -5,
opacity: subtextAnim,
}}
>
Make privacy your habit and browse confidently at your own pace.
</Animated.Text>

<Break py={8} />

<Animated.View style={{ opacity: subtextAnim }}>
<Button>
<Text style={{ opacity: 1, fontFamily: 'Font-Regular' }}>Customize</Text>
</Button>
</Animated.View>

<Animated.View style={{ opacity: suggestionsAnim }}>
<Break py={10} />
<View style={styles.alignStart}>
<Text
style={{
fontFamily: 'Font-Regular',
fontSize: 15,
color: '#ffffff',
opacity: 0.8,
}}
>
Quick search
</Text>

<Break py={3} />

{[
'What is the meaning of Solana mobile',
'Generate an image of Solana',
'What is the current news on Solana network',
].map((text, index) => (
<React.Fragment key={index}>
<Shadow
distance={25}
offset={[-5, 0]}
startColor="#00000009"
style={styles.center}
>
<TouchableOpacity style={styles.suggestView}>
<Pad direction="row" style={styles.justify} gap={7}>
<Break px={1} />
<Text
style={{
textAlign: 'left',
fontSize: 14,
fontFamily: 'Font-Regular',
color: '#ffffff',
width: '85%',
}}
>
{text}
</Text>
<Pad style={styles.justify}>
<View style={styles.viewIcon}>
<ArrowRightIcon width={13} height={13} />
</View>
</Pad>
</Pad>
</TouchableOpacity>
</Shadow>
<Break py={8} />
</React.Fragment>
))}
</View>
</Animated.View>
</Pad>
);
};