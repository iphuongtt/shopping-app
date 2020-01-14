import {Product} from '../../models';
import {PropType} from '../../types';

export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

interface AddNewProductAction {
  type: typeof ADD_NEW_PRODUCT;
  product: Product;
}

interface DeleteProduct {
  type: typeof DELETE_PRODUCT;
  productId: PropType<Product, 'id'>;
}

export interface ProductState {
  availableProducts: Product[];
  userProducts: Product[];
}

export type ProductActionTypes = AddNewProductAction | DeleteProduct;
