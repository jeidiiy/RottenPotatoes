import { handleActions, createActions } from 'redux-actions';

const initialState = {
  loading: false,
  movies: [],
  lastId: 10,
  getMovieLoading: false,
  getMovieDone: false,
  getMovieError: null,
}

export const GET_MOVIE_REQUEST = 'GET_MOVIE_REQUEST';
export const GET_MOVIE_SUCCESS = 'GET_MOVIE_SUCCESS';
export const GET_MOVIE_FAILURE = 'GET_MOVIE_FAILURE';

const movieReducer = handleActions(
  {
    [GET_MOVIE_REQUEST]: (state, dispatch) => {
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
        movies,
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
  },
  initialState
);

export default movieReducer;