import fs from 'fs';
import { IProductData } from '../Models/IProductData';

const writer = async (path: string, fileName: string, productData: IProductData[]): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    if (!productData || productData.length == 0) {
      return reject("No data provided");
    }
    const file = fs.createWriteStream(`${path}/${fileName}`);
    file.on('error', err => {
      reject(err);
    });
    productData.forEach(prod => {
      file.write(`${JSON.stringify(prod)}\n`)
    });
    file.end();
    resolve(true);
  });  
}

export default writer;