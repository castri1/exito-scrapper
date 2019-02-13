import colors from 'colors';
import puppeteer, { LaunchOptions, Browser, Page } from "puppeteer";
import ProductsUI from "../UI/ProductsUI";
import { IProductResult, IProductData } from '../Models/IProductData';
colors.enable();

export default abstract class AbstractScraper {
  protected _options: LaunchOptions = { headless: true, args: ['--start-maximized', '--window-size=1920,1080'] };
  protected ui: ProductsUI;
  protected browser: Browser;

  constructor(protected url: string, options: LaunchOptions = {}) {
    this._options = { ...this._options, ...options };
  }

  protected async initialize(navigate: (browser: Browser) => Promise<ProductsUI>): Promise<void> {
    try {
      this.browser = await puppeteer.launch(this._options);
      this.ui = await navigate(this.browser);
    } catch (error) {
      console.log(error);
      this.browser.close();
    }
  }

  protected async end(): Promise<void> {
    await this.browser.close();
  }

  protected abstract executeScrapingLogic(): Promise<IProductData[]>;
  abstract scrape(): Promise<IProductData[]>;
}