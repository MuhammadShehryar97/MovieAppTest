import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import SplashScreen from "react-native-splash-screen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from './core/constants/styles/colors';

import RootNavigator from './core/navigators/root.navigator';

export const navigationRef = createNavigationContainerRef();
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen?.hide();
    }, 3000);
  }, []);

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar backgroundColor={Colors.basic.white} barStyle="dark-content" />
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
export default App;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: Colors.basic.black,
  },
});