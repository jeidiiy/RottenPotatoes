import { all, call } from 'redux-saga/effects';
import movieSaga from './movie';

export default function* rootSaga() {
  yield all([
    call(movieSaga),
  ]);
};