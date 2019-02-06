 import { ElementHandle, JSHandle } from 'puppeteer';
import By from '../Enum/By';

export default abstract class AbstractElement {
  constructor(protected elementHandle: ElementHandle) { }

  private findBy(by: By, expression: string): Promise<Array<ElementHandle>> {
    if (!by) {
      throw new Error('No selector function provided');
    }

    if(!expression) {
      throw new Error('No selector expresion provided');
    }

    switch (by) {
      case By.XPATH:
        return this.elementHandle.$x(expression);
      case By.CSS:
      default:
        return this.elementHandle.$$(expression);
    }
  }

  protected async findChild<T>(elementType: new (element: ElementHandle) => T, by: By, locator: string): Promise<T> {
    const elements = await this.findBy(by, locator);
    if (elements && elements.length === 0) {
      throw new Error(`No element found. ${locator}`);
    }
    return new elementType(elements[0]);
  }

  protected async findChildren<T>(elementType: new (element: ElementHandle) => T, by: By, locator: string): Promise<T[]> {
    const elements = await this.findBy(by, locator);
    if (elements && elements.length === 0) {
      throw new Error(`No element found. ${locator}`);
    }
    return elements.map(e => new elementType(e));
  }

  protected async getElementProperties(props: string[]): Promise<Map<string, string>> {
    if (!props || props.length === 0) {
      throw new Error('Error getting element properties. \nNo properties passed');
    }
    
    const elementProperties = new Map<string, string>();
    for (let prop of props) {
      const elementProp =  await this.getElementProperty(prop);
      elementProperties.set(prop, elementProp);
    }
    return elementProperties;
  }

  protected async getElementProperty(prop: string): Promise<any> {
    const handle = await this.elementHandle.getProperty(prop);
    if (!handle) throw Error('No property found');
    return handle.jsonValue();
  }

  public click(): Promise<void> {
    return this.elementHandle.click();
  }
}

