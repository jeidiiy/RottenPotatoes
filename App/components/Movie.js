import React from 'react';
import { Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Proptypes from 'prop-types';
import MovieProfile from './MovieProfile';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 13) / 16);
const imageWidth = dimensions.width / 2;

export default function Movie({ navigation, ...movieInfo }) {
  return (
    <TouchableOpacity
      onPress={() => {
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
