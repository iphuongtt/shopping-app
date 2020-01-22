import {Product} from '../../models';
import {PropType} from '../../types';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

interface CreateProductAction {
  type: typeof CREATE_PRODUCT;
  productData: {
    title: PropType<Product, 'title'>;
    description: PropType<Product, 'description'>;
    imageUrl: PropType<Product, 'imageUrl'>;
    price: PropType<Product, 'price'>;
  };
}

interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT;
  pid: PropType<Product, 'id'>;
  productData: {
    title: PropType<Product, 'title'>;
    description: PropType<Product, 'description'>;
    imageUrl: PropType<Product, 'imageUrl'>;
  };
}

export interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  productId: PropType<Product, 'id'>;
}

export interface ProductState {
  availableProducts: Product[];
  userProducts: Product[];
}

export type ProductActionTypes =
  | CreateProductAction
  | DeleteProductAction
  | UpdateProductAction;
