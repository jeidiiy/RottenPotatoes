import React, { useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { GET_MOVIE_INFO_REQUEST } from '../reducer/movie';

const MovieProfile = ({ route }) => {
  const { title, summary, year, poster, id } = route.params;

  const { getMovieInfoLoading } = useSelector(state => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_MOVIE_INFO_REQUEST,
      id,
    });
  }, []);

  return (
    <View style={styles.profile}>
      <ScrollView>
        <Text>{JSON.stringify(title)}</Text>
        <Text>{JSON.stringify(summary)}</Text>
        <Text>{JSON.stringify(year)}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'coral',
  },
  poster: {
    width: 50,
    height: 50,
  },
});

export default MovieProfile;
