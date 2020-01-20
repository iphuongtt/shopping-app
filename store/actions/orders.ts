import {ADD_ORDER, OrdersActionTypes} from '../types';

export const addOrder = (cartItems, totalAmount): OrdersActionTypes => {
  return {
    type: ADD_ORDER,
    orderData: {
      cartItems: cartItems,
      totalAmount: totalAmount,
    },
  };
};
