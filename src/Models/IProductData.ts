import IImageProps from "./IImageProps";

export interface IProductData {
  name: string;
  brand: string;
  price: string;
  image: IImageProps
  level1: string,
  level2: string,
  level3: string
}

export interface IProductResult {
  product_data: IProductData
}