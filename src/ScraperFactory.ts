import { ExitoScraper, JumboScraper, MerqueoScraper } from "./Scrapers";
import { LaunchOptions } from "puppeteer";
import AbstractScraper from "./Scrapers/AbstractScraper";
import LaRebajaScraper from "./Scrapers/LaRebajaScraper";

export default function scraperFactory(scraper: string, url: string, options?: LaunchOptions): AbstractScraper {
  switch (scraper) {
    case 'exito':
      return new ExitoScraper(url, options);
    case 'jumbo':
      return new JumboScraper(url, options);
    case 'merqueo':
      return new MerqueoScraper(url, options);
    case 'larebaja':
      return new LaRebajaScraper(url, options);
    default:
      throw new Error('No scraper provided');
  }
}