import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from "../../core/navigators/root.navigator";
import { RootScreens } from "../../core/constants/screens.constants";
import { fetchMovieDetails } from "../../utils/api";
import Movie from "../interfaces/movie-list.interface";

import MovieHeader from "../components/movie-detail/MovieHeader";
import MovieInfo from "../components/movie-detail/MovieInfo";
import Colors from "../../core/constants/styles/colors";

type MovieDetailRouteProp = RouteProp<RootStackParamList, RootScreens.MOVIE_DETAIL>;

const MovieDetailScreen = () => {
    const route = useRoute<MovieDetailRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { movie_id } = route.params;
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        fetchMovieDetails(movie_id.toString()).then((data: Movie) => {
            setMovie(data);
        }).catch((error) => {
            console.error("Error fetching movie details:", error);
        });
    }, [movie_id]);

    return (
        <ScrollView style={styles.container}>
            <MovieHeader
                movie={movie}
                onBackPress={() => navigation.goBack()}
            />
            
            <MovieInfo movie={movie} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.basic.white
    }
});

export default MovieDetailScreen;       