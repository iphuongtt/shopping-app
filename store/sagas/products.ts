import {takeEvery, put} from 'redux-saga/effects';

import {POST_PRODUCT, UPDATE_PRODUCT, PostProductAction} from '../types';
import {createProduct} from '../actions';

export function* postProduct(action: PostProductAction) {
  const response = yield fetch(
    'https://shopping-app-e60e5.firebaseio.com/products.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.productData),
    },
  );
  const resData = yield response.json();
  yield put(
    createProduct(
      resData.name,
      action.productData.title,
      action.productData.description,
      action.productData.imageUrl,
      action.productData.price,
    ),
  );
}

export function* updateProduct() {
  console.log('Update product!');
}

export function* fetchProducts() {}

export const productSagas = [
  takeEvery(POST_PRODUCT, postProduct),
  takeEvery(UPDATE_PRODUCT, updateProduct),
];
