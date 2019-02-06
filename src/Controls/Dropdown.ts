import AbstractElement from "../Shared/AbstractElement";
import { ElementHandle } from "puppeteer";


export default class Dropdown extends AbstractElement {
  constructor(elementHandle: ElementHandle) {
    super(elementHandle);
  }
}