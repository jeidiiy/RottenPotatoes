import React from 'react';
import { Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Proptypes from 'prop-types';
import MovieProfile from './MovieProfile';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 13) / 16);
const imageWidth = dimensions.width / 2;

export default function Movie({ poster, id, title, summary, year }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(MovieProfile({ title, summary, year }));
      }}
    >
      <Image
          style={styles.poster}
          source={{ uri: poster }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  poster: {
    width: imageWidth,
    height: imageHeight,
  },
});
