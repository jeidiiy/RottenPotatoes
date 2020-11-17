import { handleActions, createActions } from 'redux-actions';

const initialState = {
  getMovieLoading: false,
  getMovieDone: false,
  getMovieError: false,
}

export const GET_MOVIE_REQUEST = 'GET_MOVIE_REQUEST';
export const GET_MOVIE_SUCCESS = 'GET_MOVIE_SUCCESS';
export const GET_MOVIE_FAILURE = 'GET_MOVIE_FAILURE';


const movieReducer = handleActions(
  {
    [GET_MOVIE_REQUEST]: (state, dispatch) => {

    },
    [GET_MOVIE_SUCCESS]: (state, dispatch) => {

    },
    [GET_MOVIE_FAILURE]: (state, dispatch) => {

    },
  },
  initialState
);

export default movieReducer;