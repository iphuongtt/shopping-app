import {ADD_TO_CART, CartActionTypes} from '../types';
import {Product} from '../../models';

export const addToCart = (product: Product): CartActionTypes => {
  return {
    type: ADD_TO_CART,
    product: product,
  };
};
