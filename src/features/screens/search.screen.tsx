import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

import Colors from '../../core/constants/styles/colors';
import { searchMoviesByName } from '../../utils/api';
import MovieInterface from '../interfaces/movie-list.interface';
import { alpha } from '../../core/constants/utils/alpha.util';
import type { RootStackParamList } from '../../core/navigators/root.navigator';

const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, typeof import('../../core/constants/screens.constants').RootScreens.SEARCH>>();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MovieInterface[]>(route.params?.movies || []);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async (searchText: string) => {
    if (!searchText.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const data = await searchMoviesByName(searchText);
      setResults(data.results || []);
    } catch (e) {
      setResults([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    if (!query.trim()) {
      setResults(route.params?.movies || []);
      return;
    }
    debounceTimeout.current = setTimeout(() => {
      handleSearch(query);
    }, 400);
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    navigation.goBack();
  };

  const renderGridItem = ({ item }: { item: MovieInterface }) => (
    <View style={styles.resultItem}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
          style={styles.resultImage}
          resizeMode="cover"
        />
        <View style={styles.titleOverlay}>
          <Text style={styles.resultTitle} numberOfLines={1}>{item.title}</Text>
        </View>
      </View>
    </View>
  );

  const renderListItem = ({ item }: { item: MovieInterface }) => (
    <View style={styles.listItemRow}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
        style={styles.listImage}
        resizeMode="cover"
      />
      <View style={styles.listTextContainer}>
        <Text style={styles.listTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.listSubtitle} numberOfLines={1}>{item.genres && item.genres.length > 0 ? item.genres[0].name : 'Genre'}</Text>
      </View>
      <Icon name="more-horiz" size={24} color={Colors.primary.skyBlue} style={styles.moreIcon} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerContainer}>
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={24} color={Colors.primary.charcoalPurple} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="TV shows, movies and more"
          placeholderTextColor={Colors.primary.charcoalBlue}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          autoCapitalize='none'
        />
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Icon name="close" size={24} color={Colors.primary.shadowBlue} />
        </TouchableOpacity>
      </View>
      </View>
      {query && (
      <View style={styles.topResultsContainer}>
    <Text style={styles.topResults}>{'Top Results'}</Text>
    <View style={styles.divider} />
    </View>
    )}
        <FlatList
        key={query ? 'list' : 'grid'}
        data={results}
        keyExtractor={item => item.id.toString()}
        numColumns={query ? 1 : 2}
        renderItem={query ? renderListItem : renderGridItem}
        ListEmptyComponent={!loading && query ? <Text style={styles.noResults}>No results found.</Text> : null}
        contentContainerStyle={query ? styles.listResultsContainer : styles.resultsContainer}
        columnWrapperStyle={!query ? styles.columnWrapper : undefined}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.basic.white,
  },
  headerContainer: {
    paddingVertical: 10,
    backgroundColor: Colors.basic.white,
    shadowColor: Colors.basic.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.OffWhite,
    borderRadius: 30,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.shadowBlue,
  },
  clearButton: {
    marginLeft: 8,
  },
  resultsContainer: {
    padding: 8,
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  resultItem: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: Colors.primary.charcoalPurple,
    borderRadius: 12,
    marginHorizontal: 4,
    overflow: 'hidden',
    maxWidth: '49%',
  },
  resultImage: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 12,
    backgroundColor: Colors.primary.icyGray,
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: "flex-start",
    justifyContent: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  resultTitle: {
    fontSize: 16,
    color: Colors.basic.white,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    textAlign: 'center',
    flexShrink: 1,
    paddingHorizontal: 4,
  },
  noResults: {
    textAlign: 'center',
    color: Colors.basic.white,
    marginTop: 32,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  listResultsContainer: {
    padding: 8,
    paddingBottom: 16,
  },
  listItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: Colors.primary.charcoalPurple,
    borderRadius: 16,
    marginBottom: 18,
    padding: 8,
  },
  listImage: {
    width: 130,
    height: 100,
    borderRadius: 16,
    marginRight: 16,
    backgroundColor: Colors.primary.icyGray,
  },
  listTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  listTitle: {
    fontSize: 16,
    color: Colors.primary.shadowBlue,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    marginBottom: 2,
  },
  listSubtitle: {
    fontSize: 12,
    color: Colors.primary.icedGray,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  moreIcon: {
    marginLeft: 12,
    alignSelf: 'flex-start',
  },
  topResults: {
    fontSize: 12,
    color: Colors.primary.shadowBlue,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    marginBottom: 2,
    margin: 8,
  },  
  divider: {
    height: 1,
    backgroundColor: Colors.primary.icedGray,
    margin: 8,
  },
  topResultsContainer: {
    paddingTop: 20,
    marginHorizontal: 8
  },
});

export default SearchScreen; 