import ProductsUI from "./ProductsUI";
import AbstractProductPage from "../Shared/AbstractProductPage";
import { Browser, Page } from "puppeteer";
import ExitoProductsPage from "../ProductPage/ExitoProductsPage";

export default class ExitoProductsUI extends ProductsUI {
  constructor(productsPage: AbstractProductPage,
    browser: Browser,
    page: Page
  ) {
    super(productsPage, browser, page);
  }

  private static async setCity(page: Page, cityCode: string) {
    await page.select('#selectCitiesPick', cityCode);
    await page.waitFor(500);
  }

  private static async setDependency(page: Page, dependencyCode: string) {
    await page.select('#selectDependenciesPick', dependencyCode);
    await page.waitFor(500);
  }

  private static async setLocation(page: Page, ): Promise<void> {
    await this.setCity(page, "1");
    await this.setDependency(page, "033");
    await page.click("#btnContinuarPick");
    await page.waitForNavigation();
  }

  static async navigate(browser: Browser, url: string, delay?: number): Promise<ProductsUI> {
    const page = await this.startPage(browser, url, delay);
    await this.setLocation(page);
    delay = delay ? delay : 100;
    const productsPageInstance = new ExitoProductsPage(browser, page);
    return new ExitoProductsUI(productsPageInstance, browser, page);
  }
}