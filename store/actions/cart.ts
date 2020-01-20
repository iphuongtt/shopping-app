import {ADD_TO_CART, REMOVE_FROM_CART, CartActionTypes} from '../types';
import {Product} from '../../models';
import {PropType} from '../../types';

export const addToCart = (product: Product): CartActionTypes => {
  return {
    type: ADD_TO_CART,
    product: product,
  };
};

export const removeFromCart = (
  productId: PropType<Product, 'id'>,
): CartActionTypes => {
  return {
    type: REMOVE_FROM_CART,
    pid: productId,
  };
};
