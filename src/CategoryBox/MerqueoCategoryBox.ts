import AbstractCategoryBox from "./AbstractCategoryBox";
import { ElementHandle } from "puppeteer";

export default class MerqueoCategoryBox extends AbstractCategoryBox {
  protected level1Locator: string = null;
  protected level2Locator: string = "./li[2]/a/span";
  protected level3Locator: string = "./li[3]/span";
  
  constructor(elementHandle: ElementHandle) {  
    super(elementHandle);
  }
}