import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import Movie from './Movie';
import { GET_MOVIE_REQUEST, GET_MOVIE_MORE_REQUEST } from '../reducer/movie';


function Home({ navigation }) {
  const { loading, movies, page, moreLoading } = useSelector(
    (state) => state.movie
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_MOVIE_REQUEST,
      page,
    });
  }, []);

  const getMorePage = useCallback(
    (e) => {
      if (
        e.nativeEvent.contentSize.height - e.nativeEvent.contentOffset.y <
        900
      ) {
        dispatch({
          type: GET_MOVIE_MORE_REQUEST,
          page,
        });
      }
    },
    [movies, page, moreLoading]
  );

  if (loading) {
    return (
      <>
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" color="#ec524b" />
          <Text style={styles.loadingFont}>
            지용과 은기가 영화데이터를 불러오고 있습니다...
          </Text>
        </View>
      </>
    );
  }

  return (
    <View>
      <StatusBar barStyle={'default'} />
      <ScrollView
        contentContainerStyle={styles.container}
        onScroll={(e) => {
          getMorePage(e);
        }}
      >
        {movies.map((movie) => (
          <Movie
            navigation={navigation}
            poster={movie.medium_cover_image}
            largePoster={movie.large_cover_image}
            key={movie.id}
            id={movie.id}
            title={movie.title}
            summary={movie.summary}
            year={movie.year}
            genres={movie.genres}
            runtime={movie.runtime}
          />
        ))}
        {moreLoading && (
          <View>
            <ActivityIndicator
              size="large"
              color="#ec524b"
              style={styles.moreLoadingMovie}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingFont: {
    marginTop: 20,
    fontWeight: '600',
    fontSize: 18,
  },
  moreLoadingMovie: {
    paddingVertical: 100,
    paddingHorizontal: 100,
  },
});

export default Home;
