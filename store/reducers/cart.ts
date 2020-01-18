import {CartState, CartActionTypes, ADD_TO_CART} from '../types';
import {CartItem} from '../../models';

const initialState: CartState = {
  items: {},
  totalAmount: 0,
};

export const cartReducer = (
  state = initialState,
  action: CartActionTypes,
): CartState => {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let udpatedOrNewCartItem: CartItem;
      if (state.items[addedProduct.id]) {
        udpatedOrNewCartItem = state.items[addedProduct.id];
        udpatedOrNewCartItem.quanity++;
        udpatedOrNewCartItem.sum += prodPrice;
      } else {
        udpatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: {...state.items, [addedProduct.id]: udpatedOrNewCartItem},
        totalAmount: state.totalAmount + prodPrice,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
