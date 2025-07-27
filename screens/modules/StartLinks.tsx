import { ImageBackground, Text, Touchable, TouchableOpacity, View } from "react-native"
import { Break, Pad } from "../../components/elements/Components"
import { Shadow } from "react-native-shadow-2"
import { styles } from "../../components/styles/computed/styles"
import ggle from '../../assets/images/google.jpeg'
import bing from '../../assets/images/bing.png'
import yandex from '../../assets/images/yandex.png'
import yahoo from '../../assets/images/yahoo.png'
import { TextMed } from "../../components/fonts/TextBox"

export const StartLinks = () => {
  return (
  <Pad direction="column">
  <Pad gap={55} direction="row">
  <Pad direction="column">
  <Shadow distance={50} offset={[-5, 0]} startColor="#00000015" style={styles.center}>
  <TouchableOpacity style={styles.center}>
  <ImageBackground source={ggle} resizeMode="center" style={styles.linkCard}/>
  </TouchableOpacity>
  </Shadow>
  <Break py={17}/>
  <TextMed size={15} color="#000000b5">Google</TextMed>
  </Pad>

  <Pad direction="column">
  <Shadow distance={50} offset={[-5, 0]} startColor="#00000015" style={styles.center}>
  <TouchableOpacity style={styles.center}>
  <ImageBackground source={bing} resizeMode="center" style={styles.linkCard}/>
  </TouchableOpacity>
  </Shadow>
  <Break py={17}/>
  <TextMed size={15} color="#000000b5">Bing</TextMed>
  </Pad>

  <Pad direction="column">
  <Shadow distance={50} offset={[-5, 0]} startColor="#00000015" style={styles.center}>
  <TouchableOpacity style={styles.center}>
  <ImageBackground source={yandex} resizeMode="center" style={styles.linkCard}/>
  </TouchableOpacity>
  </Shadow>
  <Break py={17}/>
  <TextMed size={15} color="#000000b5">Yandex</TextMed>
  </Pad>

  <Pad direction="column">
  <Shadow distance={50} offset={[-5, 0]} startColor="#00000015" style={styles.center}>
  <TouchableOpacity style={styles.center}>
  <ImageBackground source={yahoo} resizeMode="cover" style={styles.linkCard}/>
  </TouchableOpacity>
  </Shadow>
  <Break py={17}/>
  <TextMed size={15} color="#000000b5">Yahoo</TextMed>
  </Pad>
  </Pad>
  </Pad>
  )
}