import React, { forwardRef } from 'react';
import {
Text,
TextInput,
TextInput as RNTextInput,
View,
} from 'react-native';
import { styles } from '../styles/computed/styles';
import { CancelIcon } from '../icons/Icons';

type Props = {
value: string;
onTextChanged: (text: string) => void;
onCancel: () => void;
onFocus: () => void;
onBlur: () => void;
};

export const PrivacySearchBar = forwardRef<RNTextInput, Props>(
({ value, onTextChanged, onCancel, onFocus, onBlur }, ref) => {
return (
<View style={styles.PrivacySearchBar}>
{value === '' && (
<Text style={styles.PrivacySearchPlaceHolder}>Search anything..</Text>
)}

<TextInput
ref={ref}
value={value}
onFocus={onFocus}
onBlur={onBlur}
onChangeText={onTextChanged}
style={styles.PrivacySearchInput}
/>

{value.length > 0 && (
<View style={styles.searchCancel}>
<CancelIcon
width={19}
height={19}
opacity={0.3}
onPress={onCancel}
/>
</View>
)}
</View>
);
}
);

PrivacySearchBar.displayName = 'SearchBar';