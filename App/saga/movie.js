import { all, call, put, throttle, fork } from "redux-saga/effects";
import axios from 'axios';
import { 
  GET_MOVIE_REQUEST, GET_MOVIE_FAILURE, GET_MOVIE_SUCCESS,
  GET_MOVIE_MORE_REQUEST, GET_MOVIE_MORE_FAILURE, GET_MOVIE_MORE_SUCCESS,
} from "../reducer/movie";


function getMovieAPI(page) {
  return axios.get(`https://yts-proxy.nomadcoders1.now.sh/list_movies.json?limit=15&page=${page}`);
}

function *getMovies(action) {
  try {
    const movies = yield call(getMovieAPI, action.page);
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

function *getMovieMores(action) {
  try {
    const movies = yield call(getMovieAPI, action.page);
    yield put({
      type: GET_MOVIE_MORE_SUCCESS,
      movies: movies.data.data.movies
    });
  } catch (err) {
    console.log('getMoviesSagaError');
    console.log(err);
    yield put({
      type: GET_MOVIE_MORE_FAILURE,
      error: err.response
    });
  }
}

function* watchGetMovies() {
  yield throttle(3000, GET_MOVIE_REQUEST, getMovies);
};

function* watchgetMoreMovies() {
  yield throttle(3000, GET_MOVIE_MORE_REQUEST, getMovieMores);
}

export default function* movieSaga() {
  yield all([
    fork(watchGetMovies),
    fork(watchgetMoreMovies),
  ]);
};