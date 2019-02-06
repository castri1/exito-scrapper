import AbstractProductPage from "../Shared/AbstractProductPage";
import { Browser, Page, ElementHandle } from 'puppeteer';
import AbstractProductBox from "../ProductBox/AbstractProductBox";
import ExitoProduct from "../ProductBox/ExitoProduct";
import By from "../Enum/By";
import Button from "../Controls/Button";
import Link from "../Controls/Link";

export default class ExitoProductsPage extends AbstractProductPage {
  protected scrollElementLocator: string;
  protected productListLocator: string = "//div[@id='productList']/div";
  protected productList: AbstractProductBox[] = null;

  constructor(browser: Browser, page: Page) {
    super(browser, page);
  }

  public async getProductList(): Promise<AbstractProductBox[]> {
    this.productList = await this.findElements(ExitoProduct, By.XPATH, this.productListLocator);
    return this.productList;
  }

  async nextPage(delay?: number): Promise<number[]> {
    const currentElement = await this.findElement(Button, By.CSS, "ul.pagination li.active");
    const nextElement = await this.findElement(Button, By.XPATH, "//ul[@class='pagination']/li[@class='active']/following-sibling::li[not(@class='disabled')][1]");

    if (currentElement && nextElement) {
      const nextPage = await (await this.findElement(Link, By.CSS, "ul.pagination li.active + li a")).getHref();
      await this.page.goto(nextPage);
      delay && this.page.waitFor(delay);
      return [0, 1];
    }

    return [0, 0];
  }
}
