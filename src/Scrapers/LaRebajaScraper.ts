import AbstractScraper from "./AbstractScraper";
import { Browser, LaunchOptions } from "puppeteer";
import LaRebajaProductsUI from "../UI/LarebajaProductsUI";
import { IProductData } from "../Models/IProductData";

export default class LaRebajaScraper extends AbstractScraper {
  constructor(url: string, options: LaunchOptions = {}) {
    super(url, options);
  }

  protected async executeScrapingLogic(): Promise<IProductData[]> {
    try {
      let counter = 1;
      const products = await this.ui.getProductsData();
      console.log(`Page ${counter}`.underline.yellow);
      let [previous, next] = await this.ui.nextPage();
      while (previous !== next) {
        counter += 1;
        const newPageProducts = await this.ui.getProductsData();
        products.push(...newPageProducts);
        console.log(`Page ${counter}`.underline.yellow);
        [previous, next] = await this.ui.nextPage();
      }
      return products;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async scrape(): Promise<IProductData[]> {
    await this.initialize((browser: Browser) => LaRebajaProductsUI.navigate(browser, this.url, 500));
    const products = await this.executeScrapingLogic();
    await this.end();
    return products;
  }
}