import { all, call, put, throttle, fork, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import { 
  GET_MOVIE_REQUEST, GET_MOVIE_FAILURE, GET_MOVIE_SUCCESS,
  GET_MOVIE_MORE_REQUEST, GET_MOVIE_MORE_FAILURE, GET_MOVIE_MORE_SUCCESS,
  GET_MOVIE_INFO_REQUEST, GET_MOVIE_INFO_SUCCESS, GET_MOVIE_INFO_FAILURE,
} from "../reducer/movie";
import { serverHost } from '../config';


function getMovieAPI(page) {
  return axios.get(`https://yts-proxy.nomadcoders1.now.sh/list_movies.json?limit=15&page=${page}`);
};

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
  };
};

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
  };
};

function getMovieInfoAPI(id) {
  function getYts() {
    return axios(`https://yts-proxy.nomadcoders1.now.sh/movie_details.json?movie_id=${id}`);
  }

  function getComments() {
    return axios.get(`${serverHost}/movie/${id}`); 
  }
  return axios.all([getYts(), getComments()])
    .then(axios.spread((acct, perms) => {
      console.log(acct);
      console.log(perms);
    }));
};

function *getMovieInfo(action) {
  try {
    const movie = yield call(getMovieInfoAPI, action.movieId);
    yield put({
      type: GET_MOVIE_INFO_SUCCESS,
      movie
    });
  } catch (err) {
    console.log('getMovieInfoError');
    console.log(err);
    yield put({
      type: GET_MOVIE_INFO_FAILURE,
      error: err.response
    });
  };
}

function* watchGetMovies() {
  yield throttle(3000, GET_MOVIE_REQUEST, getMovies);
};

function* watchgetMoreMovies() {
  yield throttle(3000, GET_MOVIE_MORE_REQUEST, getMovieMores);
};

function* watchGetMovieInfo() {
  yield takeLatest(GET_MOVIE_INFO_REQUEST, getMovieInfo);
}

export default function* movieSaga() {
  yield all([
    fork(watchGetMovies),
    fork(watchgetMoreMovies),
    fork(watchGetMovieInfo),
  ]);
};