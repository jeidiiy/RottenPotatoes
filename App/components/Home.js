import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import Movie from './Movie';
import MovieProfile from './MovieProfile'
import { GET_MOVIE_REQUEST, GET_MOVIE_MORE_REQUEST } from '../reducer/movie';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const stack = createStackNavigator();

function Home() {
  const { loading, movies, movieId, page, moreLoading } = useSelector(state => state.movie);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_MOVIE_REQUEST,
      page
    });
  }, []);


  const getMorePage = useCallback((e) => {
    if ((e.nativeEvent.contentSize.height - e.nativeEvent.contentOffset.y) < 950) {
      dispatch({
        type: GET_MOVIE_MORE_REQUEST,
        page
      });
    }
  }, [movies, page, moreLoading]);

  if (loading) {
    return (
      <>
        <View style={styles.loadingScreen} >
          <ActivityIndicator size="large" color="#ec524b" />
          <Text style={styles.loadingFont} >지용과 은기가 영화데이터를 불러오고 있습니다...</Text>
        </View>
      </>
    );
  } 

  return (
    <View>
        <View style={styles.headerTitle} >
          <Text>은지 영화 앱</Text>
        </View>
        <ScrollView 
          contentContainerStyle={styles.container}
          onScroll={(e) => {
            getMorePage(e)
          }} 
          >
            {movies.map((movie) => (
              <Movie
                poster={movie.medium_cover_image}
                key={movie.id}
                id={movie.id}
              />
            ))}
        {moreLoading && (
          <View>
            <ActivityIndicator size="large" color="#ec524b" />
          </View>
        )}
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    backgroundColor: '#ec524b',
  },
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
    fontSize: 18
  },
  moreLoadingMovie: {
    padding: "auto",
  },
});

export default Home;