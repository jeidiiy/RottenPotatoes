import React from 'react';
import { Provider } from 'react-redux';
import initStore from './store';
import Home from './components/Home';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

const store = initStore();

function App() {
  return (
    <Provider store={store} >
      <NavigationContainer>
        <Home key="root" />
      </NavigationContainer>
    </Provider>
  );
}

export default App;