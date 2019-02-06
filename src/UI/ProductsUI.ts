import IProduct from "../Models/IProduct";
import AbstractProductPage from "../Shared/AbstractProductPage";
import { Browser, Page } from "puppeteer";

export default abstract class ProductsUI {
  constructor(protected productsPage: AbstractProductPage,
    protected browser: Browser,
    protected page: Page) { }

  public async getProductsData(): Promise<IProduct[]> {
    try {
      const products = await this.productsPage.getProductList();
      const productsPromises = products.map((p, i) => p.getProductData());
      const productData = await Promise.all(productsPromises);
      return productData;
    } catch (error) {
      console.log("Error reading products data");
    }
  }

  public async nextPage(delay?: number): Promise<number[]> {
    return this.productsPage.nextPage(delay);
  }

  protected static async startPage(browser: Browser, url: string, delay?: number): Promise<Page> {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    delay = delay ? delay : 100;
    // await page.waitFor(delay);
    return page;
  }
}
