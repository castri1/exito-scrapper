import AbstractProductPage from "../Shared/AbstractProductPage";
import AbstractProductBox from "../ProductBox/AbstractProductBox";
import { Browser, Page } from "puppeteer";
import MerqueoProduct from "../ProductBox/MerqueoProduct";
import By from "../Enum/By";
import ICategoryLevels from "../Models/ICategoryLevels";
import MerqueoCategoryBox from "../CategoryBox/MerqueoCategoryBox";

export default class MerqueoProductsPage extends AbstractProductPage {
  protected categoryboxLocator: string = "//ol[@class='breadcrumb']";
  protected productListLocator: "div.product-column";
  protected scrollElementLocator: string;

  constructor(browser: Browser, page: Page) {
    super(browser, page);
  }

  async getProductList(): Promise<AbstractProductBox[]> {
    this.productList = await this.findElements(MerqueoProduct, By.CSS, "div.product-column");
    return this.productList;
  }

  public async getCategoryLevels(): Promise<ICategoryLevels> {
    const categoryBox = await this.findElement(MerqueoCategoryBox, By.XPATH, this.categoryboxLocator);
    return await categoryBox.getCategorydata();
  }
  
  async nextPage(delay?: number): Promise<number[]> {
    await this.page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    delay && await this.page.waitFor(delay);
    return [0, 0];
  }
}