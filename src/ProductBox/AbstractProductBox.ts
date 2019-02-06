import { ElementHandle } from 'puppeteer';
import Label from '../Controls/Label';
import By from '../Enum/By';
import IProduct from '../Models/IProduct';
import Image from '../Controls/Image';
import AbstractElement from '../Shared/AbstractElement';

export default abstract class AbstractProductBox extends AbstractElement {
  protected abstract nameLocator: string;
  protected abstract priceLocator: string;
  protected abstract brandLocator: string;
  protected abstract imageLocator: string;

  constructor(elementHandle: ElementHandle) {
    super(elementHandle);
  }

  private _nameLabel: Label = null;
  public async nameLabel(): Promise<Label> {
    if (this._nameLabel) return this._nameLabel;
    this._nameLabel = await this.findChild(Label, By.XPATH, this.nameLocator);
    return this._nameLabel;
  }

  private _priceLabel: Label = null;
  public async priceLabel(): Promise<Label> {
    if (this._priceLabel) return this._priceLabel;
    this._priceLabel = await this.findChild(Label, By.XPATH, this.priceLocator);
    return this._priceLabel;
  }

  private _brandLabel: Label = null;
  public async brandLabel(): Promise<Label> {
    if (this._brandLabel) return this._brandLabel;
    this._brandLabel = await this.findChild(Label, By.XPATH, this.brandLocator);
    return this._brandLabel;
  }

  private _productImage: Image = null;
  public async productImage(): Promise<Image> {
    if (this._productImage) return this._productImage;
    this._productImage = await this.findChild(Image, By.XPATH, this.imageLocator);
    return this._productImage;
  }


  public getProductData(): Promise<IProduct> {
    return Promise
      .all([
        this.nameLabel(),
        this.brandLabel(),
        this.priceLabel(),
        this.productImage()
      ])
      .then(([nameLabel, brandLabel, priceLabel, productImage]) => Promise.all([
        nameLabel.getText(),
        brandLabel.getText(),
        priceLabel.getText(),
        productImage.getImageData()
      ]))
      .then(([name, brand, price, image]) => {
        return {
          name: name ? name.replace(/\n|\r|\rn|/gi, '').trim() : "N/A",
          price: price.replace(/(\$|\.|\r|\n|\rn|\s)/g, ''),
          brand: brand ? brand.replace(/\n|\r|\rn|/gi, '').trim() : "N/A",
          image
        }
      })
  }
}