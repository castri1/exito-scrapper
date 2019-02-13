import AbstractProductPage from "../Shared/AbstractProductPage";
import AbstractProductBox from "../ProductBox/AbstractProductBox";
import LaRebajaProduct from "../ProductBox/LaRebajaProduct";
import By from "../Enum/By";
import Button from "../Controls/Button";
import Link from "../Controls/Link";
import ICategoryLevels from "../Models/ICategoryLevels";
import LaRebajaCategoryBox from "../CategoryBox/LaRebajaCategoryBox";

export default class LaRebajaProductsPage extends AbstractProductPage{
  protected categoryboxLocator: string = "//ol[@class='breadcrumb']";
  protected productListLocator: "//ul[@class='listaProductos']/div/li";  
  protected scrollElementLocator: string;
  
  async getProductList(): Promise<AbstractProductBox[]> {
    this.productList = await this.findElements(LaRebajaProduct, By.CSS, "li.border-left");
    return this.productList;
  }
  
  public async getCategoryLevels(): Promise<ICategoryLevels> {
    const categoryBox = await this.findElement(LaRebajaCategoryBox, By.XPATH, this.categoryboxLocator);
    return await categoryBox.getCategorydata();
  }

  async nextPage(delay?: number): Promise<number[]> {
    const currentElement = await this.findElement(Button, By.CSS, "li.page.selected");
    const nextElement = await this.findElement(Button, By.XPATH, "//li[@class='page selected']/following-sibling::li[@class='page']");

    if (currentElement && nextElement) {
      const nextPage = await (await this.findElement(Link, By.CSS, "li.page.selected + li a")).getHref();
      await this.page.goto(nextPage);
      delay && this.page.waitFor(delay);
      return [0, 1];
    }

    return [0, 0];
  }
}