import { Browser, Page, ElementHandle } from 'puppeteer';
import AbstractPage from './AbstractPage';
import AbstractProductBox from '../ProductBox/AbstractProductBox';

export default abstract class AbstractProductPage extends AbstractPage {
  protected abstract productListLocator: string;
  protected productList: AbstractProductBox[];
  protected abstract scrollElementLocator: string;

  constructor(browser: Browser, page: Page) {
    super(browser, page);
  }

  abstract getProductList(): Promise<AbstractProductBox[]>;
  abstract nextPage(delay?: number): Promise<number[]>;
  
  protected scrollToElement(): Promise<void> {
    return this.page.$$eval(this.scrollElementLocator, elements => {
      elements[elements.length - 1].scrollIntoView();
    });
  }
}