import {
  CartState,
  CartActionTypes,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_ORDER,
  DELETE_PRODUCT,
} from '../types';
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
    case REMOVE_FROM_CART: {
      const currentQty = state.items[action.pid].quanity;
      const selectedItem = state.items[action.pid];
      let updatedCartItems;
      if (currentQty > 1) {
        // reduce it
        const updatedCartItem = new CartItem(
          selectedItem.quanity - 1,
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.sum - selectedItem.productPrice,
        );
        updatedCartItems = {...state.items, [action.pid]: updatedCartItem};
      } else {
        // ease it
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedItem.productPrice,
      };
    }
    case ADD_ORDER: {
      return initialState;
    }
    case DELETE_PRODUCT: {
      if (!state.items[action.productId]) {
        return state;
      }
      const updatedItems = {...state.items};
      const itemTotal = updatedItems[action.productId].sum;
      delete updatedItems[action.productId];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
