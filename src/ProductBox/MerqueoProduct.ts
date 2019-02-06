import AbstractProductBox from "./AbstractProductBox";
import { ElementHandle } from "puppeteer";

export default class MerqueoProduct extends AbstractProductBox {
  protected nameLocator: string = "./div/div/a/p[@class='product-name']";
  protected priceLocator: string = "./div/div/div[contains(@class, 'product-list-prize')][last()]";
  protected brandLocator: string = "./div/a/div[@class='product-list-img']/img";
  protected imageLocator: string = "./div/a/div[@class='product-list-img']/img";

  constructor(elementHandle: ElementHandle) {  
    super(elementHandle);
  }
}