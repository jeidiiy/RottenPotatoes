import { all, call, put, throttle, fork } from "redux-saga/effects";
import axios from 'axios';
import { 
  GET_MOVIE_REQUEST, GET_MOVIE_FAILURE, GET_MOVIE_SUCCESS,
  GET_MOVIE_MORE_REQUEST, GET_MOVIE_MORE_FAILURE, GET_MOVIE_MORE_SUCCESS,
} from "../reducer/movie";


function getMovieAPI(page) {
  return axios.get(`https://yts-proxy.nomadcoders1.now.sh/list_movies.json?limit=15&page=${page}`);
  // let urls = [];
  // let result = [];
  // for (let i = movieId; i < movieId + 10; i++) {
  //   urls.push(`https://yts-proxy.nomadcoders1.now.sh/movie_details.json?movie_id=${i}`);
  // }
  // console.log(urls);
  // await Promise.all(urls.map((url) => {
  //   axios
  //     .get(url)
  //     .then(res => res.data.data.movie)
  //     .then(movie => result.push(movie))
  //     .then(() => console.log(result)); 
  //   }))
  //     .then(() => result)
  //     .then(() => console.log('Promise is done'));
  // return result;
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
      movies: movies
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

function* watchGetMovies() {
  yield throttle(3000, GET_MOVIE_REQUEST, getMovies);
};

function* watchgetMoreMovies() {
  yield throttle(3000, GET_MOVIE_MORE_REQUEST, getMovieMores);
};

export default function* movieSaga() {
  yield all([
    fork(watchGetMovies),
    fork(watchgetMoreMovies),
  ]);
};