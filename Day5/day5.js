const fs = require('fs');
const { exit } = require('process');

// Read the contents from the file
const data = fs.readFileSync('./test.txt', 'utf8').split('\n');