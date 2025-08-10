import { Image, ImageBackground, Text, View } from "react-native"
import { Break, Pad } from "../components/elements/Components"
import { Button, ClearTouch, PullButton, styles } from "../components/styles/computed/styles"
import { Shadowy } from "../components/elements/Shadowy"
import { TextBold, TextHeavy } from "../components/fonts/TextBox"
import layer from '../assets/images/startimg.png'
import { CrossIcon } from "../components/icons/Icons"
import { BlurView } from "expo-blur"
import { Shadow } from "react-native-shadow-2"
import { StartLinks } from "./modules/StartLinks"

export const StartPage = () => {
  return (
  <Pad style={styles.wFull} px={27}>
  <Break py={30}/>
  <Shadow distance={25} offset={[-1, 0]} startColor="#00000010" style={styles.center}>
  <View style={styles.startView}>
  <View style={styles.alignEnd}>
  <View style={{transform:[{translateY: -17},{translateX: 155}]}}>
  <BlurView style={styles.clearTouch} intensity={100} tint="extraLight">
  <CrossIcon width={10} height={10} opacity={.5}/>
  </BlurView>
  </View>
  </View>
  <TextBold size={17} color="#000000">Start page</TextBold>
  <Image source={layer} style={{width: '90%', height: 100, position:'absolute'}}/>
  <Break py={60}/>
  <Text style={{
  opacity:.4,
  fontSize:13,
  textAlign:'center',}}>Customize your apperance
  and sections that appear when creating new tabs</Text>
  </View>
  </Shadow>
  <Break py={8}/>
  <View style={styles.align}>
  <Button><Text style={{opacity:.7,fontFamily:'Font-Regular'}}>Customize</Text></Button>
  </View>
  <Break py={18}/>
  <Pad style={styles.alignStart}>
  <TextBold size={15} color="#000000">Quick links</TextBold>
  </Pad>
  <Break py={17}/>
  <View style={styles.center}><StartLinks/></View>
  <Break py={30}/>
  <Pad style={styles.alignStart} px={0}>
  <TextBold size={15} color="#000000">Privacy Report</TextBold>
  </Pad>
  <Break py={3}/>
  <Shadow distance={25} offset={[-5, 0]} startColor="#00000009" style={styles.center}>
  <View style={styles.privateView}>
  <Pad direction="row" style={styles.justify} gap={7}>
  <Pad style={styles.justify}>
  <TextHeavy size={22} color="#000000">52</TextHeavy>
  </Pad>
  <Break px={1}/>
  <Text style={{textAlign:'left',opacity:.35,
  fontSize:12.5,fontFamily: 'Font-Regular',lineHeight:17,width:'85%'}}>
  Breeze has prevented 93 traackers from profiling you in the past 3 days,
  your IP address is hidden from unknown sites and domains. Your privacy comes fist!
  </Text>
  </Pad>
  </View>
  </Shadow>
  </Pad>
  )
}