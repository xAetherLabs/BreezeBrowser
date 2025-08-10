import { Animated, Easing } from 'react-native';

type TabOverviewParams = {
  isTabOverview: boolean;
  setIsTabOverview: (val: boolean) => void;
  tabOverviewTrigger: Animated.Value;
  bottomTabActionOpacity: Animated.Value;
  bottomTabActionY: Animated.Value;
};

const tabOverviewExit = ({
  isTabOverview,
  setIsTabOverview,
  tabOverviewTrigger,
  bottomTabActionOpacity,
  bottomTabActionY,
}: TabOverviewParams) => {
  if (isTabOverview) {
    setIsTabOverview(false);

    // Animate tabOverviewTrigger to 0
    Animated.timing(tabOverviewTrigger, {
      toValue: 0,
      duration: 0,
      easing: Easing.bezier(0.16, 1, 0.29, 0.99),
      useNativeDriver: false,
    }).start();

    // Animate BottomTabAction opacity and Y
    Animated.parallel([
      Animated.timing(bottomTabActionOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(bottomTabActionY, {
        toValue: 100,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }
};

export const tabOverviewClicker = {
  tabOverviewExit,
};