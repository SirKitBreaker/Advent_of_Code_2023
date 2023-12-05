const fs = require('fs');
const { exit } = require('process');

// Read the contents from the file
const data = fs.readFileSync('./input.txt', 'utf8').split('\n');
// Variables to calculate final result
let total = 0;
let winingInstances = new Array(data.length).fill(1); // [1,1,1,1,1,....]

// Iterate through each line
data.forEach((row, index) => {
    // Get the numbers from each line
    const line = row.slice(row.indexOf(': ') + 2).split('|');
    // Get just the winning numbers
    const winningNumbers = line[0].trim().split(' ');
    // Get just the lottery numbers
    const lotteryNumbers = line[1].trim().split(' ');

    // Find the winning numbers
    // Don't need the actual numbers itself. Need it to get the number of winning numbers per line
    const winning = lotteryNumbers.filter(num => winningNumbers.includes(num)).filter(val => val !== '');

    // Calculate results
    if (winning.length > 0) {
        // Part 1
        total += Math.pow(2, winning.length - 1);

        // Part 2
        winning.forEach((_, i) => {
            winingInstances[index + i + 1] += winingInstances[index];
        });
    };
});

console.log('P1: ' + total);
console.log('P2: ' + winingInstances.reduce((partialSum, a) => partialSum + a));