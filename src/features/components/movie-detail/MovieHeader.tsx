import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import BackIcon from "react-native-vector-icons/Ionicons";

import { alpha } from "../../../core/constants/utils/alpha.util";
import Colors from "../../../core/constants/styles/colors";
import { WINDOW_WIDTH } from "../../../core/constants/dimentions.constants";
import MovieInterface from "../../interfaces/movie-list.interface";
import MovieActions from "./MovieActions";
import { RootScreens } from "../../../core/constants/screens.constants";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../core/navigators/root.navigator";

const IMAGE_HEADER_HEIGHT = WINDOW_WIDTH * 1.2;

type MovieHeaderProps = {
    movie: MovieInterface | null;
    onBackPress: () => void;
};

const MovieHeader = ({ movie, onBackPress }: MovieHeaderProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();  

    const handleGetTickets = useCallback(() => {
        if (movie) {
            navigation.navigate(RootScreens.SEAT_MAPPING, { movie_data: movie });
        }
    }, [movie, navigation]);

    const handleWatchTrailer = useCallback(() => {
        if (movie) {
            console.log("movie", movie.id);
            navigation.navigate(RootScreens.VIDEO_PLAYER, {
                movie_id: movie.id
            });
        }
    }, [movie, navigation]);    
    
    return (
        <View style={styles.posterContainer}>
            <ImageBackground
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}` }}
                style={styles.posterImage}
            >
                <LinearGradient
                    colors={[alpha(Colors.basic.black, 0), alpha(Colors.basic.black, 1)]}
                    style={styles.gradient}
                />
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={onBackPress}
                    >
                        <BackIcon name="chevron-back" size={24} color={Colors.basic.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Watch</Text>
                </View>
            </ImageBackground>
            <MovieActions
                movie={movie}
                onGetTickets={handleGetTickets}
                onWatchTrailer={handleWatchTrailer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    posterContainer: {
        height: IMAGE_HEADER_HEIGHT,
        position: 'relative',
        justifyContent: 'flex-end',
    },
    posterImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        resizeMode: "contain"
    },
    gradient: {
        flex: 1,
        justifyContent: "flex-end",
    },
    headerContainer: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        zIndex: 10,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        color: Colors.basic.white,
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "Poppins-Regular",
        paddingLeft: 10,
    },
});

export default MovieHeader; 