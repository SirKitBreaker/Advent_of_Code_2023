const fs = require('node:fs');
const readline = require('node:readline');
let sum = 0;

const rl = readline.createInterface({
	input: fs.createReadStream('./input.txt'),
	crlfDelay: Infinity,
});

rl.on('line', (line) => {
	let digits = [];
	let number = line.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g);
	for (const digit of number) {
		switch (digit[1]) {
			case 'one': digits.push('1'); break;
			case 'two': digits.push('2'); break;
			case 'three': digits.push('3'); break;
			case 'four': digits.push('4'); break;
			case 'five': digits.push('5'); break;
			case 'six': digits.push('6'); break;
			case 'seven': digits.push('7'); break;
			case 'eight': digits.push('8'); break;
			case 'nine': digits.push('9'); break;
			default: digits.push(digit[1]);
		}
	}

	if(digits.length == 1) {
		sum += Number(digits[0] + digits[0]); 
	} else {
		sum += Number(digits[0] + digits[digits.length-1]);
	}
});