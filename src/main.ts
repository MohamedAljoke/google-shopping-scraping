import chalk from 'chalk';
import { writeExcelFile } from './generate-csv';
import { getProductName } from './prompt-user';
import { scrappGoogleShopping } from './scrapp-data';

(async () => {
  try {
    const questionText = 'Insira nome do produto que deseja pesquisar:';
    const questionTextYellowColor = `\x1b[33m ${questionText} \x1b[0m`;
    const choosenProduct = await getProductName(`${questionTextYellowColor}`);
    console.log(
      chalk.green(
        `choosen product is: ${choosenProduct}... wait scrapping data...`
      )
    );
    const productData = await scrappGoogleShopping(`${choosenProduct}`);
    writeExcelFile(choosenProduct, productData);
    console.log(chalk.green(`csv file generated with success in folder data`));
  } catch (e) {
    console.log(chalk.red(`Error: ${e}`));
  }
})();
