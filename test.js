
const puppeteer = require('puppeteer');

class GenericElement {
  constructor(element) {
    this._element = element;
  }

  getText() {
    return this._element.getProperty('textContent').then(res => res.jsonValue());
  }
}

class Product {
  constructor(element) {
    this._element = element;
    this._nameSelector = "./div//div[@class='product-item__info']/a";
    this._priceSelector = "./div//div[@class='product-item__bottom']/div[contains(@class, 'product-prices__wrapper')]/div/span[contains(@class, 'product-prices__value')]";

    this.nameElement = null;
  }

  async get nameElement() {
    
  }

  async getName() {
    const element = (await this._element.$x(this._nameSelector))[0];
    return element ? await (await element.getProperty("textContent")).jsonValue() : '';
  }

  async getPrice() {
    const element = (await this._element.$x(this._priceSelector))[0];
    return element ? await (await element.getProperty("textContent")).jsonValue() : '';
  }

  getProductData() {
    return Promise.all([
      this.getName(),
      this.getPrice()
    ]).then(([name, price]) => ({
      name,
      price
    }));
  }
}

class AbstractPage {
  constructor(page) {
    this._page = page;
  }

  findBy(by, selector) {
    if (!by) {
      throw new Error('No selector function provided');
    }
    switch (by) {
      case 'css':
        return this._page.$(selector);
      case 'xpath':
      default:
        return this._page.$x(selector);
    }
  }

  async findElement(by, selector, asObject) {
    const elementHandler = await this.findBy(by, selector)[0];
    return new asObject(elementHandler);
  }

  async findElements(by, selector, asObject) {
    const elementHandlerList = await this.findBy(by, selector);
    return elementHandlerList.map(element => new asObject(element))
  }
}

class ProductsPage extends AbstractPage {
  constructor(page) {
    super(page);
    this._page = page;
  }

  get products() {
    return this.findElements('xpath', "//div[@class='shelf-content']//div[@class='product-shelf']/div/ul/li", Product);
  }

  async scrollDown() {
    this._page.evaluate(() => window.scrollBy(0, window.innerHeight));
  }

  static async navigate(browser, url, options = { headless: true }) {
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(100);
    return new ProductsPage(page);
  }
}


const scrape = async () => {
  const options = {}
  const browser = await puppeteer.launch(options);
  const page = await ProductsPage.navigate(browser, "https://www.tiendasjumbo.co/supermercado/despensa?PS=20", { headless: false });
  const products = await page.products;
  const productsData = await Promise.all(products.map(prod => prod.getProductData()));
  console.log(productsData);
};

scrape();
