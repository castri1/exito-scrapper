import { ElementHandle } from 'puppeteer';
import IImageProps from "../Models/IImageProps";
import AbstractElement from '../Shared/AbstractElement';

export default class Image extends AbstractElement {
  constructor(elementHandle: ElementHandle) {
    super(elementHandle);
  }

  async getImageData(): Promise<any> {
    const propsResult = await this.getElementProperties(['src', 'width', 'height']);

    const props: IImageProps = {
      src: propsResult.get('src'),
      height: parseFloat(propsResult.get('height')),
      width: parseFloat(propsResult.get('width'))
    }
    return props;
  }
}