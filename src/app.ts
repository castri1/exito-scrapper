import uuid from 'uuid/v4';
import writer from "./FileWriter";
import path from 'path';
import fs from 'fs';
import csv from 'csvtojson';
import colors from 'colors';
import scraperFactory from './ScraperFactory';
import ICommands from './Utilities/ICommands';

colors.enable();

export default async function scrapperApp(commands: ICommands) {
  console.log(commands.results, commands.scraper);
  const filePath = path.join(process.cwd(), commands.results, commands.scraper);
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }

  const inputCsv = path.join(process.cwd(), 'inputdata', commands.input);
  const startTime = Date.now();
  const pagesToScrape = await csv().fromFile(inputCsv);

  for (let { url } of pagesToScrape) {
    console.log('Scraping:'.yellow + `${url}`.bgCyan);
    try {
      const scraper = scraperFactory(commands.scraper, url, { headless: commands.headless });
      const products = await scraper.scrape();
      if (!products || products.length === 0) {
        console.log(`Error scraping products for: ${url}`.red);
        continue;
      }
      const fileName = `${uuid()}.${commands.type}`;
      const writeResult = await writer(filePath, fileName, products);
      writeResult && console.log(`File successfully created for: ${url}`.green);
    } catch (error) {
      console.log(error);
    }
  }
}
