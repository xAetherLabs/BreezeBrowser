import { View } from "react-native"
import { styles } from "../styles/computed/styles"
import { LayerShadow } from "./LayerShadow"
import layer from '../../assets/images/def.png'

export const Shadows = () => {
  return (
  <>
  <LayerShadow fill={layer}/>
  <View style={styles.shadowPurple}/>
  <View style={styles.shadowRed}/>
  <View style={styles.shadowBlue}/>
  <View style={styles.shadowSkyBlue}/>
  </>
  )
}