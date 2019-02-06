import AbstractElement from "../Shared/AbstractElement";
import { ElementHandle } from "puppeteer";

export default class Button extends AbstractElement {
  constructor(elementHandle: ElementHandle) {
    super(elementHandle);
  }
}