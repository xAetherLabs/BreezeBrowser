import { StyleSheet } from 'react-native';
import { Themes } from './themes';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  layout: {
   width: '100%',
   height: '100%',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: Themes.light,
  },
  wFull: {
   width: '100%',
   display: 'flex',
  },
  wHalf: {
   width: '50%',
   display: 'flex',
  },
  sizeFull: {
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   position: 'absolute',
  },
  center: {
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center'
  },
  centerFill: {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center'
  },
  align: {
   display: 'flex',
   alignItems: 'center'
  },
  justify: {
   display: 'flex',
   justifyContent: 'center'
  },
  alignStart: {
  //  width: '100%',
   display: 'flex',
   alignItems: 'flex-start'
  },
  alignEnd: {
  //  width: '100%',
   display: 'flex',
   alignItems: 'flex-end'
  },
  absolute: {
   position: 'absolute'
  },
  shadowPurple: {
   top: 100,
   left: 10,
   height: 100,
   borderRadius: 100,
   transform: 'scaleX(1.3)',
   position: 'absolute',
   boxShadow: '0 0 50em 7em purple'
  },
  shadowRed: {
   top: 100,
   right: 10,
   height: 100,
   borderRadius: 100,
   transform: 'scaleX(1.5) scaleY(1.1)',
   position: 'absolute',
   boxShadow: '0 0 50em 7em red'
  },
  shadowBlue: {
   bottom: 100,
   left: 10,
   height: 100,
   zIndex: 9,
   borderRadius: 100,
   transform: 'scaleX(1.2) scaleY(1.2)',
   position: 'absolute',
   boxShadow: '0 0 50em 7em blue'
  },
  shadowSkyBlue: {
   bottom: 100,
   right: 10,
   height: 100,
   borderRadius: 100,
   transform: 'scaleX(1.3)',
   position: 'absolute',
   boxShadow: '0 0 50em 7em skyblue'
  },
  focusLayer: {
   top: 0,
   left: 0,
   zIndex: 0,
   width: '100%',
   height: '100%',
   position: 'absolute',
   backgroundColor: '#00000070'
  },
  layCover: {
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   position: 'absolute',
  },
  layerTint: {
   top: 0,
   left: 0,
   zIndex: 9,
   width: '100%',
   height: '100%',
   position: 'absolute',
   opacity: .9,
  //  backgroundColor: '#11131F'
  },
  mainView: {
   top: 0,
   left: 0,
   zIndex: 9,
   width: '100%',
   height: '100%',
   display: 'flex',
   alignItems: 'center',
   position: 'absolute',

  },
  mainContent: {
   top: 0,
   left: 0,
   zIndex: 9,
   width: '100%',
   height: '100%',
   display: 'flex',
   alignItems: 'center',
   position: 'absolute',
   backgroundColor: '#ffffff50'
  },
  startPage: {
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   display: 'flex',
   alignItems: 'center',
   position: 'absolute',
  },

  PrivacyBottomBar: {
   bottom: 0,
   paddingTop: .15,
   zIndex: 999,
  //  borderTopStartRadius: 30,
  //  borderTopEndRadius: 30,
   overflow: 'hidden',
   display: 'flex',
   justifyContent: 'center',
   position: 'absolute',
  },
  PrivateBottomLayer: {
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   borderTopWidth: 0,
   paddingTop: 14,
   paddingHorizontal: 15,
  //  borderTopStartRadius: 32,
  //  borderTopEndRadius: 32,
   borderTopColor: '#ffffffac',
  },
  PrivateBottomBlur: {
   width: '100%',
   height: '140%',
   bottom: 0,
   paddingTop: .15,
   paddingBottom: 25,
   filter: [{blur: 100}],
  //  borderTopStartRadius: 30,
  //  borderTopEndRadius: 30,
   overflow: 'hidden',
   display: 'flex',
   justifyContent: 'center',
   position: 'absolute',
  },
  PrivacyActions: {
   paddingVertical: 23,
   borderRadius: 100,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
  },
  PrivacyActionsInactive: {
   backgroundColor: '#ffffff20',
  },
  PrivacyActionsActive: {
   backgroundColor: '#0025c8'
  },
  PrivacyActionsDiscover: {
   width: 115,
   paddingVertical: 23,
   paddingHorizontal: 10,
   backgroundColor: '#070a1a'
  },
  bottomBar: {
   width: '100%',
   bottom: 10,
   zIndex: 999,
   borderWidth: 1.5,
   borderColor: '#ffffffc5',
   overflow: 'hidden',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
  },
  bottomLayer: {
   width: '100%',
   display: 'flex',
   borderWidth: 3,
   borderColor: '#00000009',
   justifyContent: 'center',
   paddingTop: 9,
   paddingBottom: 12,
   paddingLeft: 10,
   paddingRight: 10,
   borderRadius: 40,
  //  borderTopStartRadius: 32,
  //  borderTopEndRadius: 32,
  },
  bottomBlur: {
   width: '100%',
   height: '140%',
   bottom: 0,
   paddingTop: .15,
   paddingBottom: 25,
   filter: [{blur: 100}],
  //  borderTopStartRadius: 30,
  //  borderTopEndRadius: 30,
   overflow: 'hidden',
   display: 'flex',
   justifyContent: 'center',
   position: 'absolute',
  },
  bottomActionsHolder: {
   paddingVertical: 10,
   paddingHorizontal: 10,
   borderRadius: 100,
   backgroundColor: '#fffffff4',
   borderWidth: 1.5,
   borderColor: '#ffffff'
  },
  shadower: {
   width: '100%',
   bottom: 0,
   position: 'absolute',
   zIndex: 99
  },
  PrivacySearchBar: {
   width: '100%',
   paddingTop: 2,
   paddingLeft: 15,
   paddingRight: 15,
   paddingBottom: 2,
   borderRadius: 100,
   borderTopWidth: 1.5,
   borderLeftWidth: 1.5,
   borderRightWidth: 1.5,
   display: 'flex',
   justifyContent: 'center',
   borderColor: '#ffffff40',
   backgroundColor: '#ffffff30',
  },
  searchBar: {
   width: '100%',
   height: 48,
   paddingTop: 2,
   paddingLeft: 15,
   paddingRight: 15,
   paddingBottom: 2,
   borderRadius: 100,
   borderWidth: 1.5,
   display: 'flex',
   justifyContent: 'center',
   borderColor: '#00000020',
   backgroundColor: '#00000019',
  },
  searchedBar: {
   width: '100%',
   paddingTop: 0,
   paddingLeft: 15,
   paddingRight: 15,
   paddingBottom: 0,
   borderRadius: 100,
   borderWidth: 1.5,
   zIndex: 999,
   height: 47,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   borderColor: '#ffffffe8',
   backgroundColor: '#ffffffc6',
  },
  PrivacySearchInput: {
   width: '100%',
   padding: 10,
   fontSize: 16,
   color: '#ffffffe5',
   fontFamily: 'Font-bold',
  },
  searchInput: {
   height: 100,
   fontSize: 16,
   fontFamily: 'Font-Bold',
  },
  searchedInput: {
   transform: [{translateX:5}],
   height: 50,
   fontSize: 16,
   zIndex: 999,
   fontFamily: 'Font-Regular',
  },
  PrivacySearchPlaceHolder: {
    opacity: .4,
    fontSize: 15,
    marginLeft: 24,
    color: '#ffffff',
    fontFamily: 'Font-Regular',
    position: 'absolute',
  },
  searchPlaceHolder: {
    opacity: .5,
    fontSize: 15,
    marginLeft: 20,
    fontFamily: 'Font-Regular',
    position: 'absolute',
  },
  searchPlaceHolderCover: {
   width: '100%',
   height: '100%',
   position: 'absolute',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center'
  },
  searchedPlaceHolder: {
    opacity: .7,
    fontSize: 15,
    marginLeft: 20,
    color: "#000000",
    fontFamily: 'Font-Bold',
    // textTransform: 'capitalize',
  },
  searchTaber: {
   height: '100%',
   position: 'absolute',
   transform: [{translateY:1}],
   display: 'flex',
   paddingLeft: 10,
   zIndex: 9,
   left: 0,
   alignItems: 'flex-start',
   justifyContent: 'center',
  },
  searchRefresh: {
   height: '100%',
   display: 'flex',
   paddingRight: 12,
   zIndex: 9,
   right: 0,
   position: 'absolute',
   alignItems: 'flex-start',
   justifyContent: 'center',
  },
  searchCancel: {
   width: '100%',
   display: 'flex',
   alignItems: 'flex-end',
   justifyContent: 'center',
   position: 'absolute',
   zIndex: 9999,
   marginLeft: 16
  },
  PrivateTabButton: {
  paddingTop: 15,
  paddingBottom: 15,
  paddingLeft: 16,
  paddingRight: 16,
  borderWidth: 1.5,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopStartRadius: 7,
  borderTopEndRadius: 7,
  borderBottomStartRadius: 7,
  borderBottomEndRadius: 7,
  borderColor: '#ffffff18',
  transform: [
  { translateX: 13 },
  { translateY: -4 },
  { rotate: '13deg' },
  ],
  backgroundColor: '#ffffff15',
  },
  PrivateActiveTab: {
  paddingTop: 16,
  paddingBottom: 17,
  paddingLeft: 16,
  paddingRight: 16,
  borderWidth: 1.5,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopStartRadius: 8,
  borderTopEndRadius: 8,
  borderBottomStartRadius: 8,
  borderBottomEndRadius: 8,
  transform: [
  { translateX: -5 },
  { translateY: 11 },
  { rotate: '-20deg' },
  ],
  borderColor: '#ffffff70',
  backgroundColor: '#ffffff55',
  },
  tabButton: {
  paddingTop: 15,
  paddingBottom: 15,
  paddingLeft: 16,
  paddingRight: 16,
  borderWidth: 1.5,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopStartRadius: 7,
  borderTopEndRadius: 7,
  borderBottomStartRadius: 7,
  borderBottomEndRadius: 7,
  borderColor: '#00000018',
  transform: [
  { translateX: 13 },
  { translateY: -4 },
  { rotate: '13deg' },
  ],
  backgroundColor: '#00000015',
  },
  activeTab: {
  paddingTop: 16,
  paddingBottom: 17,
  paddingLeft: 16,
  paddingRight: 16,
  borderWidth: 1.5,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopStartRadius: 8,
  borderTopEndRadius: 8,
  borderBottomStartRadius: 8,
  borderBottomEndRadius: 8,
  transform: [
  { translateX: -5 },
  { translateY: 11 },
  { rotate: '-20deg' },
  ],
  borderColor: '#ffffffc9',
  backgroundColor: '#ffffffb9',
  },
  startView: {
  width: '100%',
  paddingTop: 7,
  paddingBottom: 12,
  paddingLeft: 16,
  paddingRight: 16,
  borderTopWidth: 1.2,
  borderLeftWidth: 1.2,
  borderRightWidth: 1.2,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
  borderColor: '#ffffff75',
  backgroundColor: '#ffffff55',
  },
  suggestView: {
  width: '100%',
  paddingTop: 9,
  paddingBottom: 9,
  paddingLeft: 16,
  paddingRight: 10,
  borderTopWidth: 1.5,
  borderLeftWidth: 1.5,
  borderRightWidth: 1.5,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 100,
  borderColor: '#ffffff50',
  backgroundColor: '#ffffff40',
  },
  privateView: {
  width: '100%',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 16,
  paddingRight: 16,
  borderWidth: 1.2,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
  borderColor: '#ffffffc2',
  backgroundColor: '#ffffffc5',
  },
  clearTouch: {
  width: 30,
  height: 30,
  position: 'absolute',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1.5,
  borderRadius: 100,
  overflow:'hidden',
  borderColor: '#ffffffd1',
  backgroundColor: '#ffffff20'
  },
  linkCard: {
   width: 60,
   height: 60,
   borderRadius: 15,
   borderWidth: 1,
   overflow: 'hidden',
   position: 'absolute',
   borderColor: '#ffffffac',
   backgroundColor: '#ffffff70'
  },
  switchContainer: {
  top: 18,
  height: 100,
  zIndex: 1,
  right: 0,
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end'
  },
  switchSlide: {
  width: 90,
  height: 43,
  zIndex: 999,
  paddingTop: 6,
  paddingBottom: 5,
  paddingLeft: 2,
  borderRadius: 100,
  // borderTopWidth: 1.5,
  // borderLeftWidth: 1.5,
  // borderRightWidth: 1.5,
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  flexDirection: 'row',
  // borderColor: '#ffffffd5',
  backgroundColor: '#070a1a'
  },
  switchHandle: {
   width: '50%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center'
  },
  switchToggle: {
   width: '45%',
   height: '100%',
   borderRadius: 100,
   transform: [{translateX:'15%'}],
   zIndex: -9,
   position: 'absolute',
   backgroundColor: '#0025c8'
  },
  viewIcon: {
   padding: 8,
   borderRadius: 100,
  //  borderWidth: 1.5,
   borderColor: '#00000060',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#00000030',
  },
  tabHeader: {
  width: '100%',
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 20,
  paddingRight: 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 12,
  borderBottomWidth: 1,
  borderColor: '#00000015',
  backgroundColor: '#ffffffe4',
},

tabFavicon: {
  width: 22,
  height: 22,
  borderRadius: 6,
  backgroundColor: '#dddddd',
  overflow: 'hidden',
},

tabHeaderText: {
  flexDirection: 'column',
  justifyContent: 'center',
},

tabTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#000000',
},

tabSubtitle: {
  fontSize: 13,
  color: '#444444',
  opacity: 0.7,
},
PullButton: {
  paddingTop: 17,
  paddingBottom: 17,
  paddingLeft: 17,
  paddingRight: 17,
  borderWidth: 1.5,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopStartRadius: 100,
  borderTopEndRadius: 100,
  borderBottomStartRadius: 100,
  borderBottomEndRadius: 100,
  borderColor: '#ffffffc5',
  backgroundColor: '#ffffffb2'
},
PulledButton: {
  paddingVertical: 19,
  paddingHorizontal: 19,
  borderWidth: 1.5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopStartRadius: 100,
  borderTopEndRadius: 100,
  borderBottomStartRadius: 100,
  borderBottomEndRadius: 100,
  borderColor: '#ffffff',
  backgroundColor: '#ffffffe4'
},
objectPad: {
  width: '100%',
  paddingTop: 7,
  paddingBottom: 14,
  paddingHorizontal: 5,
  borderRadius: 24,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  backgroundColor: '#ffffff'
},
ViewPad: {
  width: '100%',
  paddingHorizontal: 5,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  backgroundColor: '#ffffff'
},
descButton: {
  width: '50%',
  paddingVertical: 8,
  paddingHorizontal: 3,
},
wInfoButton: {
  width: '50%',
  paddingVertical: 8,
  paddingHorizontal: 20,
  borderRadius: 100
},
customizeView: {
  width: '100%',
  paddingTop: 5,
  backgroundColor: '#ffffffc5',
  borderTopStartRadius: 40,
  borderTopEndRadius: 40,
  borderTopWidth: 1.5,
  borderLeftWidth: 1.5,
  borderRightWidth: 1.5,
  borderColor: '#ffffffe4',
  position: 'absolute',
  bottom: 0,
  zIndex: 999999999
},
customizeViewHelper: {
  width: '100%',
  height: '100%',
  backgroundColor: '#00000070',
  position: 'absolute',
  bottom: 0,
  left: 0,
  top: 0,
  right: 0
},
themeToggle: {
  width: 140,
  height: 38,
  borderRadius: 100,
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#00000015'
},
themeToggleHelper: {
  width: '50%',
  height: '100%',
  position: 'absolute',
  borderRadius: 100,
  backgroundColor: '#ffffff',
  borderWidth: 3.5,
  borderColor: '#00000001'
},
meterBar: {
  width: '100%',
  height: 40,
  borderRadius: 100,
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'flex-start',
  justifyContent: 'center',
  backgroundColor: '#00000015',
},
meterHelper: {
  height: '100%',
  paddingLeft: 10,
  backgroundColor: '#ffffffe9',
  borderWidth: 1,
  borderRadius: 100,
  borderColor: '#ffffff'
}
});
export const PrivateAddButton = styled.View `
  paddingTop: 6;
  paddingLeft: 23;
  paddingRight: 23;
  paddingBottom: 6;
  display: flex;
  alignItems: center;
  justifyContent: center;
  borderTopStartRadius: 100;
  borderTopEndRadius: 100;
  borderBottomStartRadius: 100;
  borderBottomEndRadius: 100;
  borderWidth: 1.5;
  borderColor: #ffffff70;
  backgroundColor: #ffffff55;
`

export const AddButton = styled.View `
  paddingTop: 6;
  paddingLeft: 23;
  paddingRight: 23;
  paddingBottom: 6;
  display: flex;
  alignItems: center;
  justifyContent: center;
  borderTopStartRadius: 100;
  borderTopEndRadius: 100;
  borderBottomStartRadius: 100;
  borderBottomEndRadius: 100;
  borderWidth: 1.5;
  borderColor: #ffffffc9;
  backgroundColor: #ffffffb2;
`

export const PrivatePullButton = styled.TouchableOpacity `
  paddingTop: 18;
  paddingBottom: 18;
  paddingLeft: 18;
  paddingRight: 18;
  borderTopWidth: 1.5;
  borderLeftWidth: 1.5;
  borderRightWidth: 1.5;
  display: flex;
  alignItems: center;
  justifyContent: center;
  borderTopStartRadius: 100;
  borderTopEndRadius: 100;
  borderBottomStartRadius: 100;
  borderBottomEndRadius: 100;
  borderColor: #ffffff40;
  backgroundColor: #ffffff30;
`

export const PullButton = styled.TouchableOpacity `
  paddingTop: 15;
  paddingBottom: 15;
  paddingLeft: 15;
  paddingRight: 15;
  borderWidth: 1.5;
  position: absolute;
  display: flex;
  alignItems: center;
  justifyContent: center;
  borderTopStartRadius: 100;
  borderTopEndRadius: 100;
  borderBottomStartRadius: 100;
  borderBottomEndRadius: 100;
  borderColor: #ffffffc5;
  backgroundColor: #ffffffb2;
`

export const TabButtom = styled.TouchableOpacity `
  paddingTop: 18;
  paddingBottom: 18;
  paddingLeft: 20;
  paddingRight: 20;
  borderWidth: 1.5;
  position: absolute;
  display: flex;
  alignItems: center;
  justifyContent: center;
  borderTopStartRadius: 9;
  borderTopEndRadius: 9;
  borderBottomStartRadius: 9;
  borderBottomEndRadius: 9;
  borderColor: #00000017;
  backgroundColor: #00000010;
`

export const ClearTouch = styled.TouchableOpacity `
  width: 30;
  height: 30;
  position: absolute;
  zIndex: 1;
  display: flex;
  alignItems: center;
  justifyContent: center;
  borderTopStartRadius: 100;
  borderTopEndRadius: 100;
  borderBottomStartRadius: 100;
  borderBottomEndRadius: 100;
  borderColor: #ffffffd8;
  backgroundColor: #ffffffac;
`

export const Button = styled.TouchableOpacity `
  paddingTop: 3;
  paddingBottom: 3;
  paddingLeft: 13;
  paddingRight: 13;
  borderWidth: 1.5;
  display: flex;
  alignItems: center;
  justifyContent: center;
  borderTopStartRadius: 100;
  borderTopEndRadius: 100;
  borderBottomStartRadius: 100;
  borderBottomEndRadius: 100;
  borderColor: #ffffffd8;
  backgroundColor: #ffffffac;
`

export const LayerTint = styled.View `
  top: 0;
  letf: 0;
  zIndex: 9;
  width: 100%;
  height: 100%;
  position: absolute;
  backgroundColor: #00000090;
`