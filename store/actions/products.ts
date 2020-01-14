import {ADD_NEW_PRODUCT, DELETE_PRODUCT, ProductActionTypes} from '../types';
import {Product} from '../../models';
import {PropType} from '../../types';

export const addNewProduct = (product: Product): ProductActionTypes => {
  return {
    type: ADD_NEW_PRODUCT,
    product: product,
  };
};

export const deleteProduct = (
  productId: PropType<Product, 'id'>,
): ProductActionTypes => {
  return {
    type: DELETE_PRODUCT,
    productId,
  };
};
