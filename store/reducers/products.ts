import {PRODUCTS} from '../../data/dummy-data';
import {
  ProductState,
  ProductActionTypes,
  DELETE_PRODUCT,
  ADD_NEW_PRODUCT,
} from '../types';

const initialState: ProductState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => (product.ownerId = 'u1')),
};

export const productsReducer = (
  state = initialState,
  action: ProductActionTypes,
): ProductState => {
  switch (action.type) {
    case ADD_NEW_PRODUCT: {
      return state;
    }

    case DELETE_PRODUCT: {
      return state;
    }
    default:
      return state;
  }
};

export default productsReducer;
