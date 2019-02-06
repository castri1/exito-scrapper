import ProductsUI from "./ProductsUI";
import AbstractProductPage from "../Shared/AbstractProductPage";
import { Page, Browser } from "puppeteer";
import MerqueoProductsPage from "../ProductPage/MerqueoProductPage";


export default class MerqueoProductsUI extends ProductsUI {
  constructor(productsPage: AbstractProductPage,
    browser: Browser,
    page: Page
  ) {
    super(productsPage, browser, page);
  }

  static async navigate(browser: Browser, url: string, delay?: number): Promise<ProductsUI> { 
    const page = await this.startPage(browser, url, delay);
    const productsPageInstance = new MerqueoProductsPage(browser, page);
    return new MerqueoProductsUI(productsPageInstance, browser, page);
  }
}