import AbstractProductBox from "./AbstractProductBox";
import { ElementHandle } from "puppeteer";

class LaRebajaProduct extends AbstractProductBox {
  
  protected priceLocator: string = "./div/div[@class='content_product']//div[@class='price' or @class='price text-center']";
  protected brandLocator: string = "./div/div[@class='content_product']/div[1]/a/div[1]";
  protected imageLocator: string = "./div/div[@class='img-list-products']/a/img";
  protected nameLocator: string = "./div/div[@class='content_product']/div[1]/a/div[1]";

  constructor(elementHandle: ElementHandle) {  
    super(elementHandle);
  }
}

export default LaRebajaProduct;