const util = require('util');
const fs = require('fs');

// Convert callback function to promise
const readFileAsync = util.promisify(fs.readFile);

// Modern async/await pattern
async function processFile() {
  try {
    const data = await readFileAsync('data.txt', 'utf8');
    console.log(util.inspect(data, { depth: null })); // Debug object dalam
  } catch (error) {
    console.error(util.format('Error: %s', error.message));
  }
}