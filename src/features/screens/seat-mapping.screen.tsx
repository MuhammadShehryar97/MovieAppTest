import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from '../../core/navigators/root.navigator';
import { RootScreens } from '../../core/constants/screens.constants';
import Colors from '../../core/constants/styles/colors';
import { alpha } from '../../core/constants/utils/alpha.util';

const SeatsImage = require('../../../assets/images/seats.png');

type SeatMappingRouteProp = RouteProp<RootStackParamList, typeof RootScreens.SEAT_MAPPING>;

const DATES = [
    { label: '5 Mar', value: '2022-03-05' },
    { label: '6 Mar', value: '2022-03-06' },
    { label: '7 Mar', value: '2022-03-07' },
    { label: '8 Mar', value: '2022-03-08' },
    { label: '9 Mar', value: '2022-03-09' },
];

const SEAT_IMAGES = [
    { id: '1', src: SeatsImage },
    { id: '2', src: SeatsImage },
    { id: '3', src: SeatsImage },
    { id: '4', src: SeatsImage },
    { id: '5', src: SeatsImage },
];

const SeatMappingScreen = () => {
    const navigation = useNavigation();
    const { params } = useRoute<SeatMappingRouteProp>();
    const { movie_data } = params;

    const [selectedDate, setSelectedDate] = useState(DATES[0].value);

    const handleBack = () => {
        navigation.goBack();
    };

    const renderSeatItem = ({ item }: { item: { id: string; src: any } }) => (
        <View style={styles.seatItemContainer}>
            <View style={styles.seatTimeRow}>
                <Text style={styles.seatTimeText}>12:30</Text>
                <Text style={styles.seatHallText}>Cinetech + hall 1</Text>
            </View>
            <View style={styles.seatsImageContainer}>
                <Image source={item.src} style={styles.seatsImage} />
            </View>
            <View style={styles.seatPriceRow}>
                <Text style={styles.seatPriceText}>
                    From <Text style={styles.seatPriceValue}>50$</Text> or <Text style={styles.seatPriceValue}>2500</Text> bonus
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={28} color={Colors.basic.black} />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.title}>{movie_data?.title}</Text>
                        <Text style={styles.subtitle}>
                            In Theaters {movie_data?.release_date ? new Date(movie_data.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                        </Text>
                    </View>
                </View>

                <View style={styles.dateSection}>
                    <Text style={styles.dateLabel}>Date</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
                        {DATES.map(date => (
                            <TouchableOpacity
                                key={date.value}
                                style={[styles.dateButton, selectedDate === date.value && styles.selectedDateButton]}
                                onPress={() => setSelectedDate(date.value)}
                            >
                                <Text style={[styles.dateButtonText, selectedDate === date.value && styles.selectedDateButtonText]}>{date.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.seatsContainer}>
                    <FlatList
                        data={SEAT_IMAGES}
                        horizontal
                        keyExtractor={item => item.id}
                        renderItem={renderSeatItem}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContent}
                        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Select Seats</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.basic.white,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.primary.icyGray,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        backgroundColor: Colors.basic.white,
        shadowColor: Colors.basic.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    backButton: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.basic.black,
        fontFamily: 'Poppins-Medium',
        lineHeight: 24,
    },
    subtitle: {
        color: Colors.primary.skyBlue,
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'center',
        marginBottom: 24,
        fontWeight: '500',
        fontFamily: 'Poppins-Medium',
        paddingTop: 5,
    },
    dateSection: {
        paddingHorizontal: 20,
        marginTop: 60,
    },
    dateLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.basic.black,
        marginBottom: 12,
        fontFamily: 'Poppins-Medium',
    },
    dateScroll: {
        flexGrow: 0,
    },
    dateButton: {
        backgroundColor: alpha(Colors.primary.silverGray, 0.1),
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 18,
        marginRight: 10,
    },
    selectedDateButton: {
        backgroundColor: Colors.primary.skyBlue,
    },
    dateButtonText: {
        color: Colors.basic.black,
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 20,
        fontFamily: 'Poppins-Medium',
    },
    selectedDateButtonText: {
        color: Colors.basic.white,
    },
    seatsContainer: {
        paddingHorizontal: 10,
        marginTop: 60,
    },
    flatListContent: {
        paddingHorizontal: 10,
    },
    seatsImage: {
        width: 150,
        height: 120,
    },
    seatsImageContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.primary.skyBlue,
        paddingHorizontal: 60,
        paddingVertical: 20,
    },
    button: {
        backgroundColor: Colors.primary.skyBlue,
        padding: 16,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.basic.white,
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Poppins-Medium',
        lineHeight: 24,
    },
    seatItemContainer: {
        flex: 1,
        minWidth: 200,
    },
    seatTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    seatTimeText: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.primary.shadowBlue,
        fontFamily: 'Poppins-Medium',
        marginRight: 8,
    },
    seatHallText: {
        fontSize: 12,
        fontWeight: '400',
        color: Colors.primary.midGray,
        fontFamily: 'Poppins-Regular',
    },
    seatPriceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    seatPriceText: {
        fontSize: 12,
        fontWeight: '400',
        color: Colors.primary.midGray,
        fontFamily: 'Poppins-Regular',
    },
    seatPriceValue: {
        fontWeight: '600',
        color: Colors.primary.shadowBlue,
        fontFamily: 'Poppins-Bold',
    },
});

export default SeatMappingScreen; 