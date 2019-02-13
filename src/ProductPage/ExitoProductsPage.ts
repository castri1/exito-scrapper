import AbstractProductPage from "../Shared/AbstractProductPage";
import { Browser, Page, ElementHandle } from 'puppeteer';
import AbstractProductBox from "../ProductBox/AbstractProductBox";
import ExitoProduct from "../ProductBox/ExitoProduct";
import By from "../Enum/By";
import Button from "../Controls/Button";
import Link from "../Controls/Link";
import ICategoryLevels from "../Models/ICategoryLevels";
import ExitoCategoryBox from "../CategoryBox/ExitoCategoryBox";

export default class ExitoProductsPage extends AbstractProductPage {
  protected categoryboxLocator: string = "//ol[@class='breadcrumb']";
  protected scrollElementLocator: string;
  protected productListLocator: string = "//div[@id='productList']/div";
  protected productList: AbstractProductBox[] = null;
  protected categoryLevels: ICategoryLevels = null;

  constructor(browser: Browser, page: Page) {
    super(browser, page);
  }

  public async getProductList(): Promise<AbstractProductBox[]> {
    this.productList = await this.findElements(ExitoProduct, By.XPATH, this.productListLocator);
    return this.productList;
  }

  public async getCategoryLevels(): Promise<ICategoryLevels> {
    const categoryBox = await this.findElement(ExitoCategoryBox, By.XPATH, this.categoryboxLocator);
    return await categoryBox.getCategorydata();
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
