import ProductsUI from "./ProductsUI";
import AbstractProductPage from "../Shared/AbstractProductPage";
import { Browser, Page } from "puppeteer";
import JumboProductsPage from "../ProductPage/JumboProductsPage";

export default class JumboProductsUI extends ProductsUI {
  constructor(productsPage: AbstractProductPage,
    browser: Browser,
    page: Page
  ) {
    super(productsPage, browser, page);
  }

  static async navigate(browser: Browser, url: string, delay?: number): Promise<ProductsUI> {
    const page = await this.startPage(browser, url, delay);
    const productsPageInstance = new JumboProductsPage(browser, page);
    return new JumboProductsUI(productsPageInstance, browser, page);
  }
}