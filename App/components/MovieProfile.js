import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';

const MovieProfile = ({ route }) => {
  const {
    title,
    summary,
    year,
    poster,
    largePoster,
    genres,
    runtime,
  } = route.params;
  return (
    <View style={styles.profile}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView style={styles.scrollView}>
        <Image
          style={styles.poster}
          source={{ uri: largePoster }}
          resizeMode={'center'}
        />
        <View style={styles.info}>
          <Text style={styles.title}>
            {JSON.stringify(title).replace(/\"/g, '')}
          </Text>
          <Text style={styles.summary} numberOfLines={5} >
            {JSON.stringify(summary).replace(/\"/g, '')}
          </Text>
          <Text style={styles.runtime}>
            Runtime - {JSON.stringify(runtime)} minutes
          </Text>
          <Text style={styles.genres}>
            {JSON.stringify(...genres).replace(/\"/g, '')} /{' '}
            {JSON.stringify(year)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  poster: {
    width,
    height: 400,
  },
  info: {
    padding: 20,
    borderBottomColor: '#282828',
    borderBottomWidth: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  summary: {
    color: '#9E9E9E',
    fontSize: 16,
  },
  runtime: {
    color: '#8c8c8c',
    marginTop: 15,
  },
  genres: {
    color: '#8c8c8c',
  },
});

export default MovieProfile;
