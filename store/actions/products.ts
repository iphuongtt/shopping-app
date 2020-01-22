import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  ProductActionTypes,
} from '../types';
import {Product} from '../../models';
import {PropType} from '../../types';

export const createProduct = (
  title: PropType<Product, 'title'>,
  description: PropType<Product, 'description'>,
  imageUrl: PropType<Product, 'imageUrl'>,
  price: PropType<Product, 'price'>,
): ProductActionTypes => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      description,
      imageUrl,
      price,
    },
  };
};

export const updateProduct = (
  productId: PropType<Product, 'id'>,
  title: PropType<Product, 'title'>,
  description: PropType<Product, 'description'>,
  imageUrl: PropType<Product, 'imageUrl'>,
): ProductActionTypes => {
  return {
    type: UPDATE_PRODUCT,
    pid: productId,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};

export const deleteProduct = (
  productId: PropType<Product, 'id'>,
): ProductActionTypes => {
  return {
    type: DELETE_PRODUCT,
    productId,
  };
};
