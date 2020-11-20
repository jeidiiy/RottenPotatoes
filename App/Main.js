import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, ScrollView, View, Text, ActivityIndicator, Dimensions } from 'react-native';
import Movie from './Movie';
import { GET_MOVIE_REQUEST, GET_MOVIE_MORE_REQUEST } from './reducer/movie';

function Main() {
  const { loading, movies, page, moreLoading } = useSelector(state => state.movie);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_MOVIE_REQUEST,
      page
    });
  }, [dispatch]);


  const getMorePage = useCallback((e) => {
    if ((e.nativeEvent.contentSize.height - e.nativeEvent.contentOffset.y) < 950) {
      dispatch({
        type: GET_MOVIE_MORE_REQUEST,
        page
      });
    }
  }, [movies, page]);

  if (loading) {
    return (
      <>
        <View style={styles.loadingScreen} >
          <ActivityIndicator size="large" color="#ec524b" />
          <Text style={styles.loadingFont} >지용과 은기가 영화데이터를 불러오고 있습니다...</Text>

        </View>
      </>
    )
  } 

  return (
    <View>
      <View style={styles.headerTitle} >
        <Text>은지 영화 앱</Text>
      </View>
      <ScrollView 
        contentContainerStyle={styles.container}
        onContentSizeChange={(width, height) => console.log(width, height)}
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
  }
});

export default Main;