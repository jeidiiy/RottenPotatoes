import React from 'react';
import { ScrollView, View } from 'react-native';

const MovieProfile = ({ title, summary, year }) => {
  return (
    <View>
      <ScrollView>
        <Text>{console.log(title)}</Text>
        <Text>{console.log(summary)}</Text>
        <Text>{console.log(year)}</Text>
      </ScrollView>
    </View>
  );
};

export default MovieProfile;
