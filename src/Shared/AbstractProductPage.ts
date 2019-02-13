import { Browser, Page, ElementHandle } from 'puppeteer';
import AbstractPage from './AbstractPage';
import AbstractProductBox from '../ProductBox/AbstractProductBox';
import ICategoryLevels from '../Models/ICategoryLevels';

export default abstract class AbstractProductPage extends AbstractPage {
  protected abstract productListLocator: string;
  protected productList: AbstractProductBox[];
  protected abstract scrollElementLocator: string;
  protected abstract categoryboxLocator: string;

  constructor(browser: Browser, page: Page) {
    super(browser, page);
  }

  abstract getProductList(): Promise<AbstractProductBox[]>;
  abstract getCategoryLevels(): Promise<ICategoryLevels>;
  abstract nextPage(delay?: number): Promise<number[]>;
  
  protected scrollToElement(): Promise<void> {
    return this.page.$$eval(this.scrollElementLocator, elements => {
      elements[elements.length - 1].scrollIntoView();
    });
  }
}