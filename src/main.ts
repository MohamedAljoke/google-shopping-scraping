import chalk from 'chalk';
import { writeExcelFile } from './generate-csv';
import { getProductName } from './prompt-user';
import { scrappGoogleShopping } from './scrapp-data';

(async () => {
  try {
    const questionProductNameText =
      'Insira nome do produto que deseja pesquisar:';
    const questionMaxPriceText =
      'Qual máximo valor esperado, aperte enter para n filtrar por preço';
    const questionProductNameTextYellowColor = `\x1b[33m ${questionProductNameText} \x1b[0m`;
    const questionMaxPriceTextTextYellowColor = `\x1b[33m ${questionMaxPriceText} \x1b[0m`;
    const choosenProduct = await getProductName(
      `${questionProductNameTextYellowColor}`
    );
    console.log(
      chalk.green(
        `choosen product is: ${choosenProduct}... wait scrapping data...`
      )
    );
    const choosenMaxValue = await getProductName(
      `${questionMaxPriceTextTextYellowColor}`
    );
    const productData = await scrappGoogleShopping(
      `${choosenProduct}`,
      `${choosenMaxValue}`
    );
    writeExcelFile(choosenProduct, productData);
    console.log(chalk.green(`csv file generated with success in folder data`));
  } catch (e) {
    console.log(chalk.red(`Error: ${e}`));
  }
})();
