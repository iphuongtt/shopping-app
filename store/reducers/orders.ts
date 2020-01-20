import {OrdersState, OrdersActionTypes, ADD_ORDER} from '../types';
import {Order} from '../../models';

const initialState: OrdersState = {
  orders: [],
};

export const ordersReducer = (
  state = initialState,
  action: OrdersActionTypes,
): OrdersState => {
  switch (action.type) {
    case ADD_ORDER: {
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.cartItems,
        action.orderData.totalAmount,
        new Date(),
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    }
    default:
      return state;
  }
};

export default ordersReducer;
