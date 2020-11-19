import { all, call, put, throttle, fork } from "redux-saga/effects";
import axios from 'axios';
import { 
  GET_MOVIE_REQUEST, GET_MOVIE_FAILURE, GET_MOVIE_SUCCESS, 
} from "../reducer/movie";


function getMovieAPI() {
  return axios.get('https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating');
}

function *getMovies(action) {
  try {
    const movies = yield call(getMovieAPI);
    yield put({
      type: GET_MOVIE_SUCCESS,
      movies: movies.data.data.movies
    });
  } catch (err) {
    console.log('getMoviesSagaError');
    console.log(err);
    yield put({
      type: GET_MOVIE_FAILURE,
      error: err.response
    });
  }
}

function* watchGetMovies() {
  yield throttle(3000, GET_MOVIE_REQUEST, getMovies);
};

export default function* movieSaga() {
  yield all([
    fork(watchGetMovies),
  ]);
};