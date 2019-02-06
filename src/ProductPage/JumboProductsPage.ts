import AbstractProductPage from "../Shared/AbstractProductPage";
import JumboProduct from "../ProductBox/JumboProduct";
import By from "../Enum/By";
import { Browser, Page } from "puppeteer";
import AbstractProductBox from "../ProductBox/AbstractProductBox";

export default class JumboProductsPage extends AbstractProductPage {
  protected scrollElementLocator: string = "div.product-shelf.n18colunas ul li.last";
  protected productListLocator: string = "//div[contains(@class, 'product-shelf n18colunas')]/ul/li[@class='' or @class=' last']";

  constructor(browser: Browser, page: Page) {
    super(browser, page);
  }

  public async getProductList(): Promise<AbstractProductBox[]> {
    this.productList = await this.findElements(JumboProduct, By.XPATH, this.productListLocator);
    return this.productList;
  }

  public async nextPage(delay?: number): Promise<number[]> {
    let previousHeight = 0;
    let nextHeight = 0;
    try {
      previousHeight = (await this.page.evaluate('document.body.scrollHeight')) as number;
      await this.scrollToElement();
      await this.page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`, { timeout: 10000 });
      await this.page.waitFor(delay || 1000);
    } catch (error) {
      console.error("timeout expired");
    }
    finally {
      nextHeight = (await this.page.evaluate('document.body.scrollHeight')) as number;
    }
    return [previousHeight, nextHeight];
  }
}