import { View } from "react-native"
import { styles } from "../styles/computed/styles"
import { LayerShadow } from "./LayerShadow"
import { useCustomView } from '../../context/CustomViewContext';

export const Shadows = () => {
 const { parentBackground } = useCustomView();
  return (
  <>
  <LayerShadow fill={parentBackground}/>
  <View style={styles.shadowPurple}/>
  <View style={styles.shadowRed}/>
  <View style={styles.shadowBlue}/>
  <View style={styles.shadowSkyBlue}/>
  </>
  )
}