import {Product, CartItem} from '../../models';
import {PropType} from '../../types';
import {ADD_ORDER} from './orders';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  product: Product;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  pid: PropType<Product, 'id'>;
}

interface AddOrderAction {
  type: typeof ADD_ORDER;
}

export interface CartState {
  items: {[key in PropType<Product, 'id'>]: CartItem};
  totalAmount: number;
}

export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | AddOrderAction;
