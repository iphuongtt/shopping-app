import {Product, CartItem} from '../../models';

export const ADD_TO_CART = 'ADD_TO_CART';

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  product: Product;
}

export interface CartState {
  items: {[key: string]: CartItem};
  totalAmount: number;
}

export type CartActionTypes = AddToCartAction;
