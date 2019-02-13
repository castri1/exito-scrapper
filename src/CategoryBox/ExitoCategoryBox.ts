import AbstractCategoryBox from "./AbstractCategoryBox";
import { ElementHandle } from "puppeteer";

export default class ExitoCategoryBox extends AbstractCategoryBox {
  protected level1Locator: string = "./li[1]/a/span";
  protected level2Locator: string = "./li[2]/a/span";
  protected level3Locator: string = "./li[3]";
  
  constructor(elementHandle: ElementHandle) {  
    super(elementHandle);
  }
}