
import AbstractProductBox from "./AbstractProductBox";
import { ElementHandle } from "puppeteer";

class JumboProduct extends AbstractProductBox {
  protected nameLocator: string = "./div//div[@class='product-item__info']/a/span";
  protected priceLocator: string = "./div//div[contains(@class, 'product-prices__wrapper')]/div[contains(@class, 'product-prices__price')]/span[contains(@class, 'value')]";
  protected brandLocator: string = "./div//div[@class='product-item__info']/div[@class='product-item__brand']";
  protected imageLocator: string = "./div/div[@class='product-item__image-wrapper']/a/img";

  constructor(elementHandle: ElementHandle) {
    super(elementHandle);
  }
}

export default JumboProduct;