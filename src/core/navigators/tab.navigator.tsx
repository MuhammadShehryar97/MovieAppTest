import React, { useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";

import { TabScreens } from "../constants/screens.constants";
import { BarIconSelectorParams, BarScreenOptions, BarSelectorRoute } from './types';
import { isIOS } from "../constants/platform.constants";
import { BOTTOM_TAB_HEIGHT } from "../constants/dimentions.constants";
import BottomTabIcon from '../components/icons/bottom-tab-icon.component';
import DashboardScreen from "../../features/screens/dashboard.screen";
import Colors from "../constants/styles/colors";

const MediaLibraryScreen = () => (
  <View style={styles.container}>
    <Text>{'Media Library Screen'}</Text>
  </View>
);
const MoreScreen = () => (
  <View style={styles.container}>
    <Text>{'More Screen'}</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {

  const barIconSelectorHandler = useCallback(
    (route: BarSelectorRoute) => (params: BarIconSelectorParams) => {
      return <BottomTabIcon tab={route.name} isActive={params.focused} />;
    },
    []
  );

  const screenOptions = useCallback<BarScreenOptions>(
    ({ route }) => ({
      tabBarIcon: barIconSelectorHandler(route),
      tabBarStyle: styles.tabBar,
      tabBarItemStyle: styles.tabBarItem,
      headerShown: false,
      lazy: isIOS,
      tabBarActiveTintColor: Colors.basic.white,
      tabBarInactiveTintColor: Colors.primary.ashViolet,
      tabBarLabelStyle: styles.tabBarLabelStyle,
    }),
    [barIconSelectorHandler]
  );
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={screenOptions}
    >
      <Tab.Screen name={TabScreens.DASHBOARD} component={DashboardScreen} options={{ tabBarLabel: "Dashboard" }} />
      <Tab.Screen name={TabScreens.WATCH} component={DashboardScreen} options={{ tabBarLabel: "Watch" }} />
      <Tab.Screen name={TabScreens.MEDIA_LIBRARY} component={MediaLibraryScreen} options={{ tabBarLabel: "Media Library" }} />
      <Tab.Screen name={TabScreens.MORE} component={MoreScreen} options={{ tabBarLabel: "More" }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: BOTTOM_TAB_HEIGHT,
    backgroundColor: Colors.primary.charcoalPurple,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: Colors.primary.charcoalPurple,
    position: "absolute"
  },
  tabBarItem: {
    paddingTop: 10,
  },
  tabBarLabelStyle: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: '400',
    fontFamily: "Poppins-Regular",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.basic.white
  }
})

export default React.memo(TabNavigator);