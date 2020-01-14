import {PropType} from '../types';
export class Product {
  constructor(
    public id: string,
    public ownerId: string,
    public title: string,
    public imageUrl: string,
    public description: string,
    public price: number,
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

export interface ProductFilter {
  title?: PropType<Product, 'title'>;
}
export default Product;
