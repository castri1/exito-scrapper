import { Browser, Page, ElementHandle } from "puppeteer";
import By from "../Enum/By";

export default abstract class AbstractPage {
  protected browser: Browser;
  protected page: Page;
  
  constructor(browser: Browser, page: Page) {
    this.browser = browser;
    this.page = page;
  }

  private findBy(by: By, expression: string): Promise<Array<ElementHandle>> {
    if(!by) {
      throw new Error('No selector function provided');
    }
    switch(by) {
      case By.XPATH:
        return this.page.$x(expression);
      case By.CSS:
      default:
        return this.page.$$(expression);
    }
  }

  async findElement<T>(elementType: new (element: ElementHandle) => T, by: By, expression: string): Promise<T> {
    const elements = await this.findBy(by, expression);
    if(!elements || elements.length === 0) return null;

    return new elementType(elements[0]);
  }

  async findElements<T>(elementType: new (element: ElementHandle) => T, by: By, expression: string): Promise<T[]> {
    const elements = await this.findBy(by, expression);
    if(!elements || elements.length === 0) return null;
    
    return elements.map(e => new elementType(e));
  }
}