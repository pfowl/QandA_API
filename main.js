const csv = require('csv-parser');
const fs = require('fs');

const answers = [];

// EXTRACT
fs.createReadStream('./data/answers.csv')
  .pipe(csv({}))
  .on('data', (data) => answers.push(data))
  .on('end', () => {
    console.log(results);
  });
