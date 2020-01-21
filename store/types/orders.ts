import {CartItem, Order} from '../../models';

export const ADD_ORDER = 'ADD_ORDER';

export interface AddOrderAction {
  type: typeof ADD_ORDER;
  orderData: {
    cartItems: CartItem[];
    totalAmount: number;
  };
}

export interface OrdersState {
  orders: Order[];
}

export type OrdersActionTypes = AddOrderAction;
