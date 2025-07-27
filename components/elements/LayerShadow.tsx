import { ImageBackground, ImageSourcePropType } from "react-native"
import { styles } from "../styles/computed/styles"

interface LayerShadowProps {
  fill: ImageSourcePropType;
}

export const LayerShadow: React.FC<LayerShadowProps> = ({ fill }) => {
  return (
  <ImageBackground source={fill} resizeMode="cover" style={styles.sizeFull}/>
  )
}