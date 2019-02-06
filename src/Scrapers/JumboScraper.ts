import IProduct from "../Models/IProduct";
import colors from 'colors';
import AbstractScraper from "./AbstractScraper";
import { Browser, LaunchOptions } from "puppeteer";
import JumboProductsUI from "../UI/JumboProductsUI";
colors.enable();

export default class JumboScraper extends AbstractScraper {
  constructor(url: string, options: LaunchOptions = {}) {
    super(url, options);
  }

  protected async executeScrapingLogic(): Promise<IProduct[]> {
    try {
      let counter = 1;
      let [previousHeight, nextHeight] = await this.ui.nextPage(500);
      while (previousHeight !== nextHeight) {
        counter += 1;
        console.log(`Page ${counter}`.underline.yellow);
        [previousHeight, nextHeight] = await this.ui.nextPage(500);
      }
      const productsData = await this.ui.getProductsData();
      console.log(`Total products scanned: ${productsData.length}`.underline.green);
      return productsData;
    } catch (error) {
      console.log(error.message.red);
      throw error;
    }
  }

  public async scrape(): Promise<IProduct[]> {
    await this.initialize((browser: Browser) => JumboProductsUI.navigate(browser, this.url, 2000));
    const products = await this.executeScrapingLogic();
    await this.end();
    return products;
  }
}