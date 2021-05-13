const path = require('path');
const fs = require('fs');



const outputFilePath = path.join(__dirname, '../src/assets/theme.js')

const imported = {}

function matchAll(pattern,haystack){
  let regex = new RegExp(pattern,"g")
  let matches = [];

  let match_result = haystack.match(regex);

  for (let index in match_result){
    let item = match_result[index];
    matches[index] = item.match(new RegExp(pattern));
  }
  return matches;
}

const dox = (filePath) => {
  let sheet = fs.readFileSync(filePath).toString();
  console.log(filePath);
  matchAll(/@import\s+[\'|"](.*)[\'|"];?/, sheet).forEach((item) => {
    const matchPath = path.join(
      filePath.endsWith('less') ? path.dirname(filePath): filePath,
      item[1].endsWith('less') ?item[1] : `${item[1]}.less`
    )
    if(imported[matchPath]) {
      sheet = sheet.replace(item[0], '');
    }
    else {
      imported[matchPath] = true
      sheet = sheet.replace(item[0], dox(matchPath))
    }
  })
  return sheet
}


const css = dox(path.join(__dirname, '../node_modules/ng-zorro-antd/ng-zorro-antd.less'))
fs.writeFileSync(outputFilePath, `
let lessValue = ${JSON.stringify(css)};
module.exports = lessValue;
`)

fs.writeFileSync(path.join(__dirname, '../src/assets/theme.less'), css)
console.log('success')
