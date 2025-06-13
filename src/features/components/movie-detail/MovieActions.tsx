import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PlayIcon from "react-native-vector-icons/Entypo";
import Colors from "../../../core/constants/styles/colors";
import MovieInterface from "../../interfaces/movie-list.interface";

type MovieActionsProps = {
    movie: MovieInterface | null;
    onGetTickets: () => void;
    onWatchTrailer: () => void;
};

const MovieActions = ({ movie, onGetTickets, onWatchTrailer }: MovieActionsProps) => {
    return (
        <View style={styles.posterContent}>
            <Text style={styles.movieTitle}>{movie?.title}</Text>
            <Text style={styles.releaseDate}>
                In Theaters {movie?.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
            </Text>
            <TouchableOpacity style={styles.getTicketsButton} onPress={onGetTickets}>
                <Text style={styles.getTicketsText}>Get Tickets</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.watchTrailerButton}
                onPress={onWatchTrailer}
            >
                <PlayIcon name="controller-play" size={20} color={Colors.basic.white} />
                <Text style={styles.watchTrailerText}> Watch Trailer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    posterContent: {
        paddingBottom: 30,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal: 24,
        paddingVertical: 16,
        zIndex: 1000,
    },
    movieTitle: {
        color: Colors.basic.white,
        fontSize: 18,
        marginBottom: 8,
        fontFamily: "Poppins-Bold",
    },
    getTicketsButton: {
        backgroundColor: Colors.primary.skyBlue,
        borderRadius: 10,
        paddingVertical: 12,
        marginBottom: 12,
        width: "60%",
        justifyContent: "center",
        alignItems: "center"
    },
    getTicketsText: {
        color: Colors.basic.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    watchTrailerButton: {
        borderColor: Colors.primary.skyBlue,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 12,
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    watchTrailerText: {
        color: Colors.basic.white,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.2,
        fontFamily: "Poppins-Regular",
    },
    releaseDate: {
        color: Colors.basic.white,
        fontFamily: "Poppins-Bold",
        fontWeight: '500',
        letterSpacing: 0.5,
        fontSize: 16,
        marginBottom: 16,
    },
});

export default MovieActions; 