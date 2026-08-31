const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const q3Dir = 'C:\\Users\\TL\\Documents\\SSD cũ\\VNPIS\\Báo cáo thuế\\FY26 Q3';
const q2Dir = 'C:\\Users\\TL\\Documents\\SSD cũ\\VNPIS\\Báo cáo thuế\\FY26 - Q2';

function parseFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const wb = XLSX.readFile(filePath);
  const result = {};
  wb.SheetNames.forEach(name => {
    result[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1 });
  });
  return result;
}

console.log('--- GTGT Q2/Q3 2026 ---');
const gtgt = parseFile(path.join(q3Dir, '01_GTGT_TT80_2026.xls'));
if (gtgt) {
  Object.keys(gtgt).forEach(sheet => {
    console.log(`Sheet GTGT: ${sheet}`);
    gtgt[sheet].forEach((row, rIdx) => {
      const str = row.join(' ');
      if (str.includes('37.256') || str.includes('37256') || str.includes('phát sinh') || str.includes('khấu trừ') || str.includes('01/GTKT')) {
        console.log(`  Row ${rIdx}:`, row.filter(c => c !== null && c !== ''));
      }
    });
  });
}

console.log('\n--- TNCN Q2/Q3 2026 ---');
const tncn = parseFile(path.join(q3Dir, '05_KK_TNCN_TT80_2026.xls'));
if (tncn) {
  Object.keys(tncn).forEach(sheet => {
    console.log(`Sheet TNCN: ${sheet}`);
    tncn[sheet].forEach((row, rIdx) => {
      const str = row.join(' ');
      if (str.includes('6.107') || str.includes('6107') || str.includes('khấu trừ') || str.includes('nộp')) {
        console.log(`  Row ${rIdx}:`, row.filter(c => c !== null && c !== ''));
      }
    });
  });
}

console.log('\n--- LƯƠNG VNPIS Q2/2026 ---');
const luong = parseFile(path.join(q3Dir, 'LUONG VNPIS Q2.2026.xlsx'));
if (luong) {
  Object.keys(luong).forEach(sheet => {
    console.log(`Sheet Lương: ${sheet}`);
    luong[sheet].forEach((row, rIdx) => {
      if (rIdx < 20) {
        console.log(`  Row ${rIdx}:`, row.filter(c => c !== null && c !== ''));
      }
    });
  });
}
