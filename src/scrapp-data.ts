import chalk from 'chalk';
import puppeteer, { Page } from 'puppeteer';

export interface IProductInfo {
  name: string;
  price: string;
  shop: string;
  url: string;
}

export const scrappGoogleShopping = async (
  productName: string
): Promise<IProductInfo[]> => {
  const browser = await puppeteer.launch({ headless: true });
  // default is true
  const page = await browser.newPage();
  await page.goto('https://shopping.google.com.br/');

  await searchBoxFillIn(page, productName);

  await page.evaluate(async () => {
    await new Promise(function (resolve) {
      setTimeout(resolve, 1000);
    });
  });
  const productData = await productOnSaleInfo(page, productName);
  console.log(chalk.magenta(`data scrapped`));

  await browser.close();
  return productData;
};

const searchBoxFillIn = async (page: Page, productName: string) => {
  const searchInputClass = '.yyJm8b';
  const searchButtonClass = '.FrV7Ge';
  await page.waitForSelector(searchInputClass);
  await page.type(searchInputClass, productName);

  await page.waitForSelector(searchButtonClass);
  await page.click(searchButtonClass);
};
const productOnSaleInfo = async (
  page: Page,
  productName: string
): Promise<IProductInfo[]> => {
  const productCardClass = '.i0X6df';
  const priceClass = '.a8Pemb';
  const productNameClass = '.tAxDx';
  const shopNameClass = '.aULzUe';
  const productUrlClass = '.shntl';
  const cardsSection = await page.$$(productCardClass);
  const listOfPrices: IProductInfo[] = [];
  for (let card of cardsSection) {
    const price = await card.$eval(priceClass, (priceClass) => {
      return priceClass.innerHTML;
    });
    const productName = await card.$eval(
      productNameClass,
      (productNameClass) => {
        return productNameClass.innerHTML;
      }
    );
    const shopName = await card.$eval(shopNameClass, (shopNameClass) => {
      return shopNameClass.innerHTML;
    });
    const linkSpan = await card.$('span.eaGTj');
    const productLink = await linkSpan?.$eval(productUrlClass, (data) =>
      data.getAttribute('href')
    );
    const splitedPrice = price.split('&nbsp;');
    const formatedPrice = splitedPrice[1];
    const priceCurrency = splitedPrice[0];
    const productPrice = `${priceCurrency} ${formatedPrice}`;
    const formattedLink = productLink?.split('/url?url=')[1];
    listOfPrices.push({
      name: productName,
      shop: shopName,
      price: productPrice,
      url: formattedLink || '',
    });
  }
  return listOfPrices;
};
