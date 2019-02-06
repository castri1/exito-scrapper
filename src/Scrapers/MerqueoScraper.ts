import AbstractScraper from "./AbstractScraper";
import { LaunchOptions, Browser } from "puppeteer";
import IProduct from "../Models/IProduct";
import MerqueoProductsUI from "../UI/MerqueoProductsUI";

export default class MerqueoScraper extends AbstractScraper {
  constructor(url: string, options: LaunchOptions = {}) {
    super(url, options);
  }

  protected async executeScrapingLogic(): Promise<IProduct[]> {
    try {
      await this.ui.nextPage(10);
      const productsData = await this.ui.getProductsData();
      console.log(`Total products scanned: ${productsData.length}`.underline.green);
      return productsData;
    } catch (error) {
      console.log(error.message.red);
      throw error;
    }
  }

  async scrape(): Promise<IProduct[]> {
    await this.initialize((browser: Browser) => MerqueoProductsUI.navigate(browser, this.url, 2000));
    const products = await this.executeScrapingLogic();
    await this.end();
    return products;
  }
}