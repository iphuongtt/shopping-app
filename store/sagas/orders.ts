import {takeEvery} from 'redux-saga/effects';

import {ADD_ORDER} from '../types';

function* addOrder() {
  console.log('add order');
}

export const orderSagas = [takeEvery(ADD_ORDER, addOrder)];
