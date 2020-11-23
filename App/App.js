import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import React, { useCallback, useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import initStore from './store';
import Movie from './Movie';
import Main from './Main';

const store = initStore();

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}



export default App;