import React, { useCallback } from 'react';
import { Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { GET_MOVIE_INFO_REQUEST } from '../reducer/movie';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 13) / 16);
const imageWidth = dimensions.width / 2;

export default function Movie({ navigation, ...movieInfo }) {
  const dispatch = useDispatch();

  const postMovieId = useCallback(() => {
    dispatch({
      type: GET_MOVIE_INFO_REQUEST,
      movieId: movieInfo.id
    });
  }, [dispatch]);

  return (
    <TouchableOpacity
      onPress={() => {
        postMovieId();
        navigation.navigate('MovieProfile', movieInfo);
      }}
    >
      <Image style={styles.poster} source={{ uri: movieInfo.poster }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  poster: {
    width: imageWidth,
    height: imageHeight,
  },
});
  