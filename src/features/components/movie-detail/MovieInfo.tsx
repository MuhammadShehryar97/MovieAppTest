import { View, Text, StyleSheet } from "react-native";

import Colors from "../../../core/constants/styles/colors";
import MovieInterface from "../../interfaces/movie-list.interface";

const genres = [
    { color: Colors.primary.brightTeal },
    { color: Colors.primary.coralRose },
    { color: Colors.primary.purple },
    { color: Colors.primary.sunflowerGold },
];

type MovieInfoProps = {
    movie: MovieInterface | null;
};

const MovieInfo = ({ movie }: MovieInfoProps) => {
    return (
        <>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{'Genres'}</Text>
                <View style={styles.genresRow}>
                    {movie?.genres.map((genre, index) => (
                        <View
                            key={genre.id}
                            style={[
                                styles.genrePill,
                                { backgroundColor: genres[index % genres.length].color }
                            ]}
                        >
                            <Text style={styles.genreText}>{genre.name}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.divider} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Overview</Text>
                <Text style={styles.overviewText}>
                    {movie?.overview}
                </Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    section: {
        marginTop: 24,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        color: Colors.primary.shadowBlue,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        fontWeight: '500',
        marginBottom: 12,
    },
    genresRow: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
    },
    genrePill: {
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginBottom: 8,
    },
    genreText: {
        color: Colors.basic.white,
        fontSize: 12,
        lineHeight: 20,
        fontFamily: "Poppins-Medium",
        fontWeight: '600',
    },
    overviewText: {
        color: Colors.primary.midGray,
        fontSize: 12,
        lineHeight: 16,
        fontFamily: "Poppins-Regular",
        fontWeight: '400',
        letterSpacing: 0.5
    },
    divider: {
        height: 1,
        backgroundColor: Colors.primary.lightGray,
        marginVertical: 12
    }
});

export default MovieInfo; 