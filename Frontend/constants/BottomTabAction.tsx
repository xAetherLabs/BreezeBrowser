import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import { PullButton } from "../components/styles/computed/styles";
import { PlusIcon } from "../components/icons/Icons";
import { Pad } from "../components/elements/Components";

type BottomTabActionProps = {
 onAddTab: () => void;
};

export const BottomTabAction: React.FC<BottomTabActionProps> = ({ onAddTab }) => {
 return (
 <View style={types.barContainer}>
 <Pressable onPress={onAddTab} style={{display:'flex',transform: [{translateY:20}], alignItems:'center'}}> 
  <PullButton>
 <Pad direction="row" style={{ paddingLeft: 40, paddingRight: 40,paddingVertical:3 }}>
 <TouchableOpacity
 onPress={onAddTab}
 activeOpacity={0.7}
 style={{ flexDirection: 'row', alignItems: 'center', gap: 3,position:'absolute' }}
 >
 <PlusIcon width={20} height={20} stroke="#000000" opacity={0.7} />
 <Text style={{ fontSize: 14, color: '#000' }}>New Tab</Text>
 </TouchableOpacity>
 </Pad>
 </PullButton>
 </Pressable>
 </View>
 );
};

const types = StyleSheet.create({
 barContainer: {
 left: 0,
 transform: [{translateY:-10}],
 width: '100%',
 zIndex: 999,
 overflow: 'hidden',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 position: 'absolute',
 paddingBottom: 100,
 },
});