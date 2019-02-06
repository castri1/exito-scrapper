import AbstractElement from "../Shared/AbstractElement";
import { ElementHandle } from "puppeteer";

export default class Link extends AbstractElement {
  constructor(elementHandle: ElementHandle) {
    super(elementHandle);
  }
  
  private _href : string;
  public async getHref() : Promise<string> {
    this._href = await this.getElementProperty('href');
    return this._href;
  }
}