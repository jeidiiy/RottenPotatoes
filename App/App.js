import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import initStore from './store';
import Movie from './Movie';

const store = initStore();

export default class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  getMovies = async () => {
    // 순위 순으로 영화 정보 가져오기
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      'https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating'
    );
    this.setState({ movies, isLoading: false });
  };
  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {movies.map((movie) => (
          <Movie
            poster={movie.medium_cover_image}
            key={movie.id}
            id={movie.id}
          />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
