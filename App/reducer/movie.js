import { handleActions, createActions } from 'redux-actions';

const initialState = {
  loading: false,
  moreLoading: false,
  movies: [],
  movieInfo: {},
  movieId: 1,
  page: 1,
  getMovieLoading: false,
  getMovieDone: false,
  getMovieError: null,

  getMovieInfoLoading: false,
  getMovieInfoDone: false,
  getMovieInfoError: null,

  commentLoading: false,
  commentSuccess: false,
  commentError: null,
}

export const GET_MOVIE_REQUEST = 'GET_MOVIE_REQUEST';
export const GET_MOVIE_SUCCESS = 'GET_MOVIE_SUCCESS';
export const GET_MOVIE_FAILURE = 'GET_MOVIE_FAILURE';

export const GET_MOVIE_MORE_REQUEST = 'GET_MOVIE_MORE_REQUEST';
export const GET_MOVIE_MORE_SUCCESS = 'GET_MOVIE_MORE_SUCCESS';
export const GET_MOVIE_MORE_FAILURE = 'GET_MOVIE_MORE_FAILURE';

export const GET_MOVIE_INFO_REQUEST = 'GET_MOVIE_INFO_REQUEST';
export const GET_MOVIE_INFO_SUCCESS = 'GET_MOVIE_INFO_SUCCESS';
export const GET_MOVIE_INFO_FAILURE = 'GET_MOVIE_INFO_FAILURE';

export const WRITE_COMMENT_REQUEST = 'WRITE_COMMENT_REQUEST';
export const WRITE_COMMENT_SUCCESS = 'WRITE_COMMENT_SUCCESS';
export const WRITE_COMMENT_FAILURE = 'WRITE_COMMENT_FAILURE';

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
    [GET_MOVIE_INFO_REQUEST]: state => {
      return {
        ...state,
        getMovieInfoLoading: true,
        getMovieInfoError: null,
        getMovieInfoDone: false,
      }
    },
    [GET_MOVIE_INFO_SUCCESS]: (state, { movie }) => {
      return {
        ...state,
        getMovieInfoLoading: false,
        getMovieInfoError: null,
        getMovieInfoDone: true,
        movieInfo: movie,
      }
    },
    [GET_MOVIE_INFO_FAILURE]: (state, dispatch) => {
      return {
        ...state,
        getMovieInfoLoading: false,
        getMovieInfoError: null,
        getMovieInfoDone: false,
      }
    },
  },
  initialState
);

export default movieReducer;