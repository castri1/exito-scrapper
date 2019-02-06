import { ElementHandle } from 'puppeteer';
import AbstractElement from '../Shared/AbstractElement';

export default class Label extends AbstractElement {
  private text: string = "";

  constructor(elementHandle: ElementHandle) {
    super(elementHandle);
  }

  async getText(): Promise<string> {
    if (this.text) return this.text;
    this.text = await this.getElementProperty('textContent');
    return this.text;
  }
}