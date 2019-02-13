import AbstractElement from "../Shared/AbstractElement";
import { ElementHandle } from "puppeteer";
import Label from "../Controls/Label";
import By from "../Enum/By";
import ICategoryLevels from "../Models/ICategoryLevels";

export default abstract class AbstractCategoryBox extends AbstractElement {
  protected abstract level1Locator: string;
  protected abstract level2Locator: string;
  protected abstract level3Locator: string;

  constructor(elementHandle: ElementHandle) {
    super(elementHandle);
  }

  private _level1Label: Label = null;
  public async level1(): Promise<Label> {
    if (!this.level1Locator) return null;
    if (this._level1Label) return this._level1Label;
    try {
      this._level1Label = await this.findChild(Label, By.XPATH, this.level1Locator);
      return this._level1Label;
    } catch (error) {
      return null;
    }
  }

  private _level2Label: Label = null;
  public async level2(): Promise<Label> {
    if (!this.level2Locator) return null;
    if (this._level2Label) return this._level2Label;
    try {
      this._level2Label = await this.findChild(Label, By.XPATH, this.level2Locator);
      return this._level2Label;
    } catch (error) {
      return null;
    }
  }

  private _level3Label: Label = null;
  public async level3(): Promise<Label> {
    if (!this.level3Locator) return null;
    if (this._level3Label) return this._level3Label;
    try {
      this._level3Label = await this.findChild(Label, By.XPATH, this.level3Locator);
      return this._level3Label;
    } catch (error) {
      return null;
    }
  }

  public async getCategorydata(): Promise<ICategoryLevels> {
    const [level1, level2, level3] = await Promise.all([
      this.level1(),
      this.level2(),
      this.level3(),
    ]);

    const [level1Text, level2Text, level3Text] = await Promise.all([
      level1 ? level1.getText() : null,
      level2 ? level2.getText() : null,
      level3 ? level3.getText() : null
    ]);

    const categoryLevel: ICategoryLevels = {
      level1: level1Text,
      level2: level2Text,
      level3: level3Text,
    };

    return categoryLevel;
  }
}