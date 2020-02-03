import {PRODUCTS} from '../../data/dummy-data';
import {
  ProductState,
  ProductActionTypes,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT,
} from '../types';
import {Product} from '../../models';

const initialState: ProductState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => (product.ownerId = 'u1')),
};

export const productsReducer = (
  state = initialState,
  action: ProductActionTypes,
): ProductState => {
  switch (action.type) {
    case CREATE_PRODUCT: {
      const productData = action.productData;
      const newProduct = new Product(
        productData.id,
        'u1',
        productData.title,
        productData.imageUrl,
        productData.description,
        productData.price,
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    }

    case UPDATE_PRODUCT: {
      const productData = action.productData;
      const productIndex = state.userProducts.findIndex(
        product => product.id === action.pid,
      );
      const updatedProduct = new Product(
        action.pid,
        'u1',
        productData.title,
        productData.imageUrl,
        productData.description,
        state.userProducts[productIndex].price,
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        product => product.id === action.pid,
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProducts: updatedAvailableProducts,
      };
    }

    case DELETE_PRODUCT: {
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.productId,
        ),
        userProducts: state.userProducts.filter(
          product => product.id !== action.productId,
        ),
      };
    }

    case SET_PRODUCT: {
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products.filter(
          product => product.ownerId === 'u1',
        ),
      };
    }
    default:
      return state;
  }
};

export default productsReducer;
