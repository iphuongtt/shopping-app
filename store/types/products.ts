import {Product} from '../../models';
import {PropType} from '../../types';

export const POST_PRODUCT = 'POST_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

interface CreateProductAction {
  type: typeof CREATE_PRODUCT;
  productData: {
    id: PropType<Product, 'id'>;
    title: PropType<Product, 'title'>;
    description: PropType<Product, 'description'>;
    imageUrl: PropType<Product, 'imageUrl'>;
    price: PropType<Product, 'price'>;
  };
}

export interface PostProductAction {
  type: typeof POST_PRODUCT;
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

interface SetProductAction {
  type: typeof SET_PRODUCT;
  products: Product[];
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
  | UpdateProductAction
  | PostProductAction
  | SetProductAction;
