import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../core/navigators/root.navigator';

import { fetchUpcomingMovies } from "../../utils/api";
import Colors from "../../core/constants/styles/colors";
import { RootScreens } from "../../core/constants/screens.constants";
import Movie from "../interfaces/movie-list.interface";
import Icon from 'react-native-vector-icons/MaterialIcons';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingMovies().then((data: { results: Movie[] }) => {
      setMovies(data.results || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" color={Colors.primary.charcoalPurple}/>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{'Watch'}</Text>
          <TouchableOpacity onPress={() => navigation.navigate(RootScreens.SEARCH, { movies })}>
            <Icon name="search" size={24} color={Colors.primary.charcoalPurple} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.movieCard} 
              activeOpacity={0.8} 
              onPress={() => navigation.navigate(RootScreens.MOVIE_DETAIL, { movie_id: item.id })}
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
                style={styles.movieImage}
                resizeMode="cover"
              />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1, 
    backgroundColor: Colors.basic.white
  },
  mainContainer: {
    flex: 1, 
    backgroundColor: Colors.primary.icyGray
  },
  movieCard: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Colors.basic.white,
    elevation: 2,
    shadowColor: Colors.basic.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  loadingView: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: Colors.basic.white
  },
  movieImage: {
    width: "100%",
    height: 180,
  },
  movieTitle: {
    position: "absolute",
    left: 16,
    bottom: 16,
    color: Colors.basic.white,
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor:Colors.basic.white,
    shadowColor:Colors.basic.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.primary.shadowBlue,
    fontFamily: "Poppins-Regular",
  },
  flatListContent: {
    paddingHorizontal: 8,
    paddingTop: 16,
  },
})

export default React.memo(DashboardScreen);