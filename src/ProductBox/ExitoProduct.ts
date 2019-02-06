import { ElementHandle } from 'puppeteer';
import AbstractProductBox from "./AbstractProductBox";

class ExitoProduct extends AbstractProductBox{
  private rootLocator: string = "./div/div[contains(@class, 'col-data')]/a[1]";

  protected imageLocator: string = `./div/a/div[@class='image']/img`;
  protected nameLocator: string = `${this.rootLocator}/div[@class='col-name']/span[@class='name']`;
  protected priceLocator: string = `${this.rootLocator}/div[@class='col-price']/p[@class='price' or contains(@class, 'offer')]/span[@class='money']`;
  protected brandLocator: string = `${this.rootLocator}/div[@class='col-name']/span[@class='brand']`;
  
  constructor(elementHandle: ElementHandle) {  
    super(elementHandle);
  }
}

export default ExitoProduct;