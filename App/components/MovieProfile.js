import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';

const MovieProfile = ({ route }) => {
  const { title, summary, year, poster } = route.params;
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
