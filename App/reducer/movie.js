import { handleActions, createActions } from 'redux-actions';

const initialState = {
  loading: false,
  moreLoading: false,
  movies: [],
  movieId: 1,
  page: 1,
  getMovieLoading: false,
  getMovieDone: false,
  getMovieError: null,
}

export const GET_MOVIE_REQUEST = 'GET_MOVIE_REQUEST';
export const GET_MOVIE_SUCCESS = 'GET_MOVIE_SUCCESS';
export const GET_MOVIE_FAILURE = 'GET_MOVIE_FAILURE';

export const GET_MOVIE_MORE_REQUEST = 'GET_MOVIE_MORE_REQUEST';
export const GET_MOVIE_MORE_SUCCESS = 'GET_MOVIE_MORE_SUCCESS';
export const GET_MOVIE_MORE_FAILURE = 'GET_MOVIE_MORE_FAILURE';

const movieReducer = handleActions(
  {
    [GET_MOVIE_REQUEST]: state => {
      console.log('GET_MOVIE_REQUEST');
      return {
        ...state,
        loading: true,
        getMovieError: null,
        getMovieDone: false,
      };
    },
    [GET_MOVIE_SUCCESS]: (state, { movies }) => {
      console.log('GET_MOVIE_SUCCESS');
      return {
        ...state,
        loading: false,
        getMovieDone: true,
        movies: state.movies.concat(movies),
        page: state.page + 1,
      };
    },
    [GET_MOVIE_FAILURE]: (state, { payload: getMovieError }) => {
      console.log('GET_MOVIE_FAILURE');
      return {
        ...state,
        loading: false,
        getMovieError,
        getMovieDone: false,
      };
    },
    [GET_MOVIE_MORE_REQUEST]: (state, dispatch) => {
      console.log('GET_MOVIE_MORE_REQUEST');
      return {
        ...state,
        moreLoading: true,
        getMovieError: null,
        getMovieDone: false,
      };
    },
    [GET_MOVIE_MORE_SUCCESS]: (state, { movies }) => {
      console.log('GET_MOVIE_MORE_SUCCESS');
      return {
        ...state,
        moreLoading: false,
        getMovieDone: true,
        movies: state.movies.concat(movies),
        page: state.page + 1,
      };
    },
    [GET_MOVIE_MORE_FAILURE]: (state, { payload: getMovieError }) => {
      console.log('GET_MOVIE_MORE_FAILURE');
      return {
        ...state,
        moreLoading: false,
        getMovieError,
        getMovieDone: false,
      };
    },
  },
  initialState
);

export default movieReducer;