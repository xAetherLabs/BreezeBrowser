import { StyleSheet, View } from "react-native";
import BlurView from "../BluryEffect/BluryEffect";

interface BluryProps {
 radius?: number;
 intensity?: number;
 bottom?: number;
 top?: number;
 height?: string;
 zindex?: number;
 scaleX?: number;
 parentRadius?: number;
 background?: string;
}

export const Blury: React.FC<BluryProps> = ({radius, intensity, bottom, top, background='rgba(0, 0, 0, .1)', zindex, height='88%', parentRadius, scaleX = 1,}) => {
 return (
 <View style={[ types.blury, { height: height, bottom, top, zIndex: zindex, borderRadius: parentRadius, transform: [{ scaleX }] }]}>
 <BlurView borderRadius={radius} backgroundColor={background} blurRadius={intensity}/>
 </View>
 );
};

const types = StyleSheet.create({
 blury: {
 width: "100%",
 position: "absolute",
 left: 0,
 },
});