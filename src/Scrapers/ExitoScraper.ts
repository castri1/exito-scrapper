import IProduct from "../Models/IProduct";
import puppeteer, { LaunchOptions, Browser } from "puppeteer";
import ExitoProductsPage from "../ProductPage/ExitoProductsPage";
import AbstractScraper from "./AbstractScraper";
import ProductsUI from "../UI/ProductsUI";
import ExitoProductsUI from "../UI/ExitoProductsUI";


export default class ExitoScraper extends AbstractScraper {
  constructor(url: string, options: LaunchOptions = {}) {
    super(url, options);
  }

  protected async executeScrapingLogic(): Promise<IProduct[]> {
    try {
      let counter = 1;
      const products: IProduct[] = await this.ui.getProductsData();
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
      console.log(error.message.red);
      throw error;
    }
  }

  public async scrape(): Promise<IProduct[]> {
    await this.initialize((browser: Browser) => ExitoProductsUI.navigate(browser, this.url, 2000));
    const products = await this.executeScrapingLogic();
    await this.end();
    return products;
  } 
}

