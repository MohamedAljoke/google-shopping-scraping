import { writeExcelFile } from './generate-csv';
import { getProductName } from './prompt-user';
import { scrappGoogleShopping } from './scrapp-data';

(async () => {
  const questionText = 'Insira nome do produto que deseja pesquisar:';
  const questionTextYellowColor = `\x1b[33m ${questionText} \x1b[0m`;
  const choosenProduct = await getProductName(`${questionTextYellowColor}`);
  const productData = await scrappGoogleShopping(`${choosenProduct}`);
  writeExcelFile(choosenProduct, productData);
  //TODO: wright product data to excel file
})();
