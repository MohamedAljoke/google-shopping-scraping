import XLSX from 'xlsx';
import path from 'path';
import { IProductInfo } from './scrapp-data';
export const writeExcelFile = (productName: string, data: IProductInfo[]) => {
  var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = new Date(Date.now() - tzoffset).toISOString();
  const csvFileName = `${productName}-${localISOTime}`.replace(/[:.]/g, '-');
  const filePath = path.join(__dirname, '..', 'data', `${csvFileName}.xlsx`);
  const workSheet = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, workSheet, 'Sheet1'); // Sheet1 is the name of sheet that is created inside workbook
  const s = XLSX.writeFile(wb, filePath, {
    bookType: 'xlsx',
    type: 'file',
  });
};
