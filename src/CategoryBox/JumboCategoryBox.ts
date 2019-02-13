import AbstractCategoryBox from "./AbstractCategoryBox";
import { ElementHandle } from "puppeteer";

export default class JumboCategoryBox extends AbstractCategoryBox {
  protected level1Locator: string = ".//li[2]//a";
  protected level2Locator: string = ".//li[3]//a";
  protected level3Locator: string = ".//li[4]//a";
  
  constructor(elementHandle: ElementHandle) {  
    super(elementHandle);
  }
}