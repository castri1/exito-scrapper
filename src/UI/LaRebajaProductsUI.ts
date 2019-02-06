import ProductsUI from "./ProductsUI";
import AbstractProductPage from "../Shared/AbstractProductPage";
import { Browser, Page } from "puppeteer";
import LaRebajaProductsPage from "../ProductPage/LaRebajaProductsPage";

export default class LaRebajaProductsUI extends ProductsUI {
  constructor(productsPage: AbstractProductPage,
    browser: Browser,
    page: Page
  ) {
    super(productsPage, browser, page);
  }

  static async navigate(browser: Browser, url: string, delay?: number): Promise<ProductsUI> {
    const page = await this.startPage(browser, url, delay);
    delay = delay ? delay : 100;
    const productsPageInstance = new LaRebajaProductsPage(browser, page);
    return new LaRebajaProductsUI(productsPageInstance, browser, page);
  }
}