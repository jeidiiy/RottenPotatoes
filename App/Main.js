import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import Movie from './Movie';
import { GET_MOVIE_REQUEST } from './reducer/movie';


function Main() {
  const { loading, movies } = useSelector(state => state.movie);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_MOVIE_REQUEST,
    })
  }, [dispatch]);

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
      <ScrollView contentContainerStyle={styles.container}>
        {movies.map((movie) => (
          <Movie
            poster={movie.medium_cover_image}
            key={movie.id}
            id={movie.id}
          />
        ))}
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