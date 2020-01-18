export class CartItem {
  constructor(
    public quanity: number,
    public productPrice: number,
    public productTitle: string,
    public sum: number,
  ) {
    this.quanity = quanity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
  }
}

export default CartItem;
