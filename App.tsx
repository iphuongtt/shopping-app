import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {rootReducer} from './store/reducers';
import {ShopsNavigator} from './navigation';

enableScreens();

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ShopsNavigator />
    </Provider>
  );
}
