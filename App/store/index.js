import reducers from '../reducer';
import { applyMiddleware, createStore } from 'redux';

export default function initStore() {
  const store = createStore(
    reducers,
  );

  return store;
}


