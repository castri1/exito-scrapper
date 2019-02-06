import fs from 'fs';
import IProduct from '../Models/IProduct';

const writer = async (path: string, fileName: string, productData: IProduct[]): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    if (!productData || productData.length == 0) {
      return reject("No data provided");
    }
    await fs.writeFile(`${path}/${fileName}`, JSON.stringify(productData, null, 2), (err) => {
      if (err) {
        return reject(false);
      }
      return resolve(true);
    });
  });  
}

export default writer;