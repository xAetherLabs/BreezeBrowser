import { Image, ImageBackground, ImageSourcePropType } from "react-native"
import { styles } from "../styles/computed/styles"

interface LayerShadowProps {
  fill: ImageSourcePropType;
}

export const LayerShadow: React.FC<LayerShadowProps> = ({ fill }) => {
  return (
  <Image source={fill} resizeMode="cover" style={styles.sizeFull}/>
  )
}