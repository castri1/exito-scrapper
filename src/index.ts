import program from 'commander';
import ICommands from './Utilities/ICommands';
import colors from 'colors';
import scrapperApp from './app';
import { getElapsedTime } from './Utilities/timeUtilities';
colors.enable();

// program
//   .version('0.0.1')
//   .option('-s --scraper <scraper>', 'Select scraper', /^(exito|jumbo|merqueo)$/i)
//   .option('--no-headless', 'Hadless mode off')
//   .option('-t --type <type>', 'Results file type', /^(json|txt)$/i, 'json')
//   .option('-r --results <results>', 'Set the folder name to save the results in the current working directory', 'results')
//   .option('-i --input <input>', 'Set the name of the file that contains the urls to scrape')
//   .parse(process.argv);

// if (typeof program.scraper === 'undefined' || typeof program.scraper !== 'string') {
//   console.log('No scraper selected'.red);
//   process.exit();
// }

// if (typeof program.results === 'undefined') {
//   console.log('No results folder provided'.red);
//   process.exit();
// }

// if (typeof program.input === 'undefined') {
//   console.log('No input file name provided'.red);
//   process.exit();
// }

const commands: ICommands = {
  scraper: program.scraper,
  headless: program.headless,
  type: program.type,
  results: program.results,
  input: program.input
};

const startTime = Date.now();
const underline = '_'.repeat(30);
console.log(underline.blue);

const deguggingCommands: ICommands = {
  scraper: 'exito',
  headless: false,
  type: 'json',
  results: 'test',
  input: 'exito.csv'
};

(async () => {
  try {
    await scrapperApp(deguggingCommands);
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log(`Elapsed time ${getElapsedTime(duration)}`.yellow);
    console.log(underline.blue);
  } catch (error) {
    console.log(error);
    console.log('Scraping failed'.red);
  }
})();
