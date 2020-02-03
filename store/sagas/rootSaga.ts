import {all} from 'redux-saga/effects';
import {productSagas} from './products';
import {orderSagas} from './orders';

export function* rootSaga() {
  yield all([...productSagas, ...orderSagas]);
}
