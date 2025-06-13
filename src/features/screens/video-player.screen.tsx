import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator, Text } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackIcon from 'react-native-vector-icons/Ionicons';

import Colors from '../../core/constants/styles/colors';
import { fetchMovieTrailer } from '../../utils/api';
import { RootStackParamList } from '../../core/navigators/root.navigator';

type VideoPlayerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VideoPlayer'>;

interface VideoPlayerScreenProps {
    route: {
        params: {
            movie_id: string;
        };
    };
}

type PlayerState = 'playing' | 'paused' | 'ended' | 'buffering' | 'unstarted';

const LoadingOverlay: React.FC = () => (
    <View style={styles.overlayLoading}>
        <ActivityIndicator size="large" color={Colors.basic.white} />
        <Text style={styles.loadingText}>Loading Trailer...</Text>
    </View>
);

const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({ route }) => {
    const navigation = useNavigation<VideoPlayerScreenNavigationProp>();
    const { movie_id } = route.params;
    const [videoId, setVideoId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const data = await fetchMovieTrailer(movie_id);
                if (data?.results?.[0]?.key) {
                    setVideoId(data.results[0].key);
                } else {
                    setError('No video available for this movie');
                }
            } catch (error) {
                setError('Failed to load video. Please try again later.');
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [movie_id]);

    const handleDone = () => {
        setIsPlaying(false);
        navigation.goBack();
    };

    const handleStateChange = (state: PlayerState) => {
        if (state === 'ended') {
            handleDone();
        }
        if (state === 'buffering') {
            setVideoLoading(true);
        } else {
            setVideoLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <LoadingOverlay />
            </View>
        );
    }

    if (error || !videoId) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error || 'No video available'}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            {(loading || videoLoading) && <LoadingOverlay />}
            
            <YoutubePlayer
                height={300}
                play={isPlaying}
                videoId={videoId}
                fullscreen={true}
                onChangeState={handleStateChange}
            />
            
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <BackIcon name="chevron-back" size={24} color={Colors.basic.white} />
            </TouchableOpacity>
            
            <TouchableOpacity
                style={styles.doneButton}
                onPress={handleDone}
            >
                <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.basic.black,
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: Colors.basic.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayLoading: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    loadingText: {
        color: Colors.basic.white,
        marginTop: 10,
        fontSize: 16,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
        padding: 8,
    },
    doneButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
        padding: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
    },
    doneButtonText: {
        color: Colors.basic.white,
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: Colors.basic.white,
        fontSize: 16,
    },
});

export default VideoPlayerScreen; 
