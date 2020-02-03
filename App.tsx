import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';

import {rootReducer} from './store/reducers';
import {ShopsNavigator} from './navigation';
import {rootSaga} from './store/sagas';

import {composeWithDevTools} from 'redux-devtools-extension';

enableScreens();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default function App() {
  return (
    <Provider store={store}>
      <ShopsNavigator />
    </Provider>
  );
}
