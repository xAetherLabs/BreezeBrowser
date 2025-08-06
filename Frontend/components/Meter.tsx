import React, { useRef } from "react";
import { View, PanResponder } from "react-native";
import { styles } from "./styles/computed/styles";
import { LeafIcon } from "./icons/Icons";
import { useMeter } from "../context/MeterContext";

interface MeterProps {
  minValue?: number;
  maxValue?: number;
}

export const Meter: React.FC<MeterProps> = ({ 
  minValue = 0,
  maxValue = 100 
}) => {
  const { meterValue, setMeterValue } = useMeter();
  const meterBarRef = useRef<View>(null);
  const meterBarWidth = useRef<number>(0);

  const updateValue = (newValue: number) => {
    const clampedValue = Math.max(minValue, Math.min(maxValue, Math.round(newValue)));
    setMeterValue(clampedValue);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    
    onPanResponderGrant: (event) => {
      if (meterBarWidth.current > 0) {
        const touchX = event.nativeEvent.locationX;
        const percentage = Math.max(0, Math.min(100, (touchX / meterBarWidth.current) * 100));
        updateValue(percentage);
      }
    },
    
    onPanResponderMove: (event) => {
      if (meterBarWidth.current > 0) {
        const touchX = event.nativeEvent.locationX;
        const percentage = Math.max(0, Math.min(100, (touchX / meterBarWidth.current) * 100));
        updateValue(percentage);
      }
    },
  });

  const handleLayout = (event: any) => {
    meterBarWidth.current = event.nativeEvent.layout.width;
  };

  return (
    <View 
      ref={meterBarRef}
      style={styles.meterBar}
      onLayout={handleLayout}
      {...panResponder.panHandlers}
    >
      <View style={[styles.meterHelper, styles.justify, { width: `${meterValue}%` }]}>
        <LeafIcon width={23} height={23} opacity={0.65} />
      </View>
    </View>
  );
};