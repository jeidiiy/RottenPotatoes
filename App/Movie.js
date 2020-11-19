import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import Protypes from 'prop-types';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 13) / 16);
const imageWidth = dimensions.width / 2;

export default function Movie({ poster, id }) {
  return <Image style={styles.poster} source={{ uri: poster }} />;
}

const styles = StyleSheet.create({
  poster: {
    width: imageWidth,
    height: imageHeight,
  },
});
