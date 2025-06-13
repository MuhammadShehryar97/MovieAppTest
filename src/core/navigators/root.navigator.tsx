import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./tab.navigator";
import { RootScreens } from "../constants/screens.constants";
import MovieDetailScreen from "../../features/screens/movie-detail.screen";
import VideoPlayerScreen from '../../features/screens/video-player.screen';
import SeatMappingScreen from '../../features/screens/seat-mapping.screen';
import MovieInterface from '../../features/interfaces/movie-list.interface';
import SearchScreen from '../../features/screens/search.screen.tsx';

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.MOVIE_DETAIL]: { movie_id: string };
  [RootScreens.VIDEO_PLAYER]: { movie_id: string };
  [RootScreens.SEAT_MAPPING]: { movie_data: MovieInterface };
  [RootScreens.SEARCH]: { movies: MovieInterface[] };
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={RootScreens.MAIN}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={RootScreens.MAIN}
        component={TabNavigator}
      />
      <Stack.Screen
        name={RootScreens.MOVIE_DETAIL}
        component={MovieDetailScreen}
      />
      <Stack.Screen
        name={RootScreens.VIDEO_PLAYER}
        component={VideoPlayerScreen}
      />
      <Stack.Screen
        name={RootScreens.SEAT_MAPPING}
        component={SeatMappingScreen}
      />
      <Stack.Screen
        name={RootScreens.SEARCH}
        component={SearchScreen}
      />
    </Stack.Navigator>
  )
};

export default RootNavigator;