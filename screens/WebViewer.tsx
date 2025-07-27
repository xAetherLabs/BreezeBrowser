import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

export const WebViewer = () => {
return (
<View style={styles.container}>
<WebView
source={{ uri: 'https://www.google.com' }}
style={styles.webview}
/>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
},
webview: {
flex: 1,
backgroundColor: '#fff',
},
});