import Product from './product';
import {PropType} from '../types';

export class CartItem {
  constructor(
    public quanity: number,
    public productPrice: number,
    public productTitle: string,
    public sum: number,
    public productId?: PropType<Product, 'id'>,
  ) {
    this.quanity = quanity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
    this.productId = productId;
  }
}

export default CartItem;
