// TabContext.tsx
import React, { createContext, useContext, useState, useRef } from 'react';
import { Animated } from 'react-native';

interface Tab {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
}

const TabContext = createContext(null);

export const useTabContext = () => {
  const context = useContext(TabContext);
  return context;
};

export const TabProvider = ({ children }) => {
  const [tabs, setTabs] = useState([
    { id: '1', title: 'Start Page', url: '', isActive: true }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [isTabViewVisible, setIsTabViewVisible] = useState(false);

  // Animation values
  const tabViewScale = useRef(new Animated.Value(1)).current;
  const bottomBarTranslateY = useRef(new Animated.Value(0)).current;
  const bottomTabActionTranslateY = useRef(new Animated.Value(100)).current;

  const showTabView = () => {
    setIsTabViewVisible(true);
    
    Animated.parallel([
      Animated.timing(tabViewScale, {
        toValue: 0.8,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(bottomBarTranslateY, {
        toValue: 100,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(bottomTabActionTranslateY, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const addNewTab = () => {
    const newTab = {
      id: Date.now().toString(),
      title: 'New Tab',
      url: '',
      isActive: true,
    };
    
    setTabs(prev => prev.map(tab => ({ ...tab, isActive: false })).concat(newTab));
    setActiveTabId(newTab.id);
    hideTabView();
  };

  return (
    <TabContext.Provider value={{
      tabs, activeTabId, isTabViewVisible, tabViewScale, 
      bottomBarTranslateY, bottomTabActionTranslateY,
      addNewTab, showTabView, hideTabView
    }}>
      {children}
    </TabContext.Provider>
  );
};