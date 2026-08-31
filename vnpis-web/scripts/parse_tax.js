const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const q3Dir = 'C:\\Users\\TL\\Documents\\SSD cũ\\VNPIS\\Báo cáo thuế\\FY26 Q3';
const q2Dir = 'C:\\Users\\TL\\Documents\\SSD cũ\\VNPIS\\Báo cáo thuế\\FY26 - Q2';
const baseDir = 'C:\\Users\\TL\\Documents\\SSD cũ\\VNPIS\\Báo cáo thuế';

function inspectFolder(dirPath, folderName) {
  if (!fs.existsSync(dirPath)) return;
  console.log(`\n==================================================`);
  console.log(`INSPECTING FOLDER: ${folderName} (${dirPath})`);
  console.log(`==================================================`);
  
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    if (file.endsWith('.xlsx') || file.endsWith('.xls')) {
      if (file.startsWith('~$')) return;
      const fullPath = path.join(dirPath, file);
      try {
        const workbook = XLSX.readFile(fullPath);
        console.log(`\n📄 FILE: ${file}`);
        console.log(`Sheets: ${workbook.SheetNames.join(', ')}`);
        
        workbook.SheetNames.forEach(sheetName => {
          const sheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          console.log(`   --> Sheet [${sheetName}]: ${json.length} rows`);
          
          // Print key content lines
          const nonNullRows = json.filter(r => r && r.some(cell => cell !== null && cell !== undefined && cell !== ''));
          nonNullRows.slice(0, 12).forEach((r, idx) => {
            const cleanRow = r.filter(c => c !== null && c !== undefined).map(c => String(c).trim());
            console.log(`       [L${idx+1}]`, cleanRow.slice(0, 6).join(' | '));
          });
        });
      } catch (err) {
        console.log(`❌ Error reading ${file}:`, err.message);
      }
    }
  });
}

inspectFolder(q3Dir, 'FY26 Q3');
inspectFolder(q2Dir, 'FY26 Q2');
inspectFolder(baseDir, 'Báo Cáo Thuế Root');
