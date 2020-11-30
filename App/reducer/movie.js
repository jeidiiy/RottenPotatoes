import { handleActions, createActions } from 'redux-actions';

const initialState = {
  loading: false,
  moreLoading: false,
  movies: [],
  movieInfo: {},
  commentInfo: [],
  // movieId: 1,
  page: 1,

  getMovieLoading: false,
  getMovieDone: false,
  getMovieError: null,

  getMovieInfoLoading: false,
  getMovieInfoDone: false,
  getMovieInfoError: null,

  getCommentLoading: false,
  getCommentSuccess: false,
  getCommentError: null,
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

export const GET_COMMENT_REQUEST = 'GET_COMMENT_REQUEST';
export const GET_COMMENT_SUCCESS = 'GET_COMMENT_SUCCESS';
export const GET_COMMENT_FAILURE = 'GET_COMMENT_FAILURE';

export const POST_COMMENT_REQUEST = 'POST_COMMENT_REQUEST';
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE';

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
      };
    },
    [GET_MOVIE_INFO_SUCCESS]: state => {
      return {
        ...state,
        getMovieInfoLoading: false,
        getMovieInfoError: null,
        getMovieInfoDone: true,
      };
    },
    [GET_MOVIE_INFO_FAILURE]: (state, { getMovieInfoError }) => {
      return {
        ...state,
        getMovieInfoLoading: false,
        getMovieInfoError,
        getMovieInfoDone: false,
      };
    },
    [GET_COMMENT_REQUEST]: (state) => {
      console.log('GET_COMMENT_REQUEST');
      return {
        ...state,
        getCommentLoading: true,
        getCommentError: null,
        getCommentSuccess: false,
      };
    },
    [GET_COMMENT_SUCCESS]: (state, { comments: commentInfo }) => {
      console.log('GET_COMMENT_SUCCESS');
      return {
        ...state,
        getCommentLoading: false,
        getCommentSuccess: false,
        commentInfo,
      };
    },
    [GET_COMMENT_FAILURE]: (state, { commentError }) => {
      console.log('GET_COMMENT_FAILURE');
      return {
        ...state,
        getCommentLoading: false,
        getCommentError,
        getCommentSuccess: false,
      };
    }
  },
  initialState
);

export default movieReducer;