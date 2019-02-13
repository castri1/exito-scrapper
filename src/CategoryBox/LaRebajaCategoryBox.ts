import AbstractCategoryBox from "./AbstractCategoryBox";
import { ElementHandle } from "puppeteer";

export default class LaRebajaCategoryBox extends AbstractCategoryBox {
  protected level1Locator: string = null;
  protected level2Locator: string = "./li[2]/a";
  protected level3Locator: string = "./li[3]";
  
  constructor(elementHandle: ElementHandle) {  
    super(elementHandle);
  }
}