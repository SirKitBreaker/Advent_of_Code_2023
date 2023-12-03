const fs = require('fs');

// Read the contents from the file
const data = fs.readFileSync('./input.txt', 'utf8');
// Get each line in an array
const array = [data.split('\n')];
// Get each character from each line
const arrayOfArrays = array[0].map(row => row.split(''));
// To look for special characters
const regex = /[^0-9.\n]+/g;
// To look for numbers
const regexNumber = /\d/g;

// Result variables
let part1Result = 0;
let part2Result = 0;

// Search for numbers
function search(array, index, rightDirection) {
    let search = true;
    let searchIndex = index;
    let desiredNumber = [];

    // Search left and right for a number
    while (search) {
        if (array[searchIndex] && array[searchIndex].match(regexNumber)) {
            desiredNumber.push(array[searchIndex].match(regexNumber)[0])
            if (rightDirection) {
                searchIndex++;
            }
            else {
                searchIndex--;
            }
        }
        else {
            search = false;
        }
    }
    return desiredNumber;
}

// Search previous/next line for numbers
function searchParent(array, parentIndex, index, regexNumber, rightDirection) {
    let search = true;
    let searchIndex = index;
    let desiredNumber = [];

    // Search left and right for a number
    while (search) {
        if (array[parentIndex] && array[parentIndex][searchIndex] && array[parentIndex][searchIndex].match(regexNumber)) {
            desiredNumber.push(array[parentIndex][searchIndex].match(regexNumber)[0]);
            if (rightDirection) {
                searchIndex++;
            } else {
                searchIndex--;
            }
        } else {
            search = false;
        }
    }
    return desiredNumber;
}

// Find adjacent numbers and gear ratio
arrayOfArrays.map((itemArray, indexArray) => {
    itemArray.map((item, index) => {
        // Check for numbers adjacent to symbols
        if (item.match(regex)) {
            let searchAround = { left: false, right: false, top: false, bottom: false, topLeft: false, topRight: false, bottomLeft: false, bottomRight: false }
            let arrayOfNumbersToSum = [];
            // To the left
            if (itemArray[index - 1].match(regexNumber)) {
                searchAround.left = true;
                arrayOfNumbersToSum.push(Number(search(itemArray, index - 1, false).reverse().join('')))
            }
            // To the right
            if (itemArray[index + 1].match(regexNumber)) {
                searchAround.right = true;
                arrayOfNumbersToSum.push(Number(search(itemArray, index + 1, true).join('')))
            }
            // To the top
            if (arrayOfArrays[indexArray - 1][index].match(regexNumber)) {
                searchAround.top = true;
                arrayOfNumbersToSum.push(Number(searchParent(arrayOfArrays, indexArray - 1, index - 1, regexNumber, false).reverse().concat(searchParent(arrayOfArrays, indexArray - 1, index, regexNumber, true)).join('')))
            }
            // To the bottom
            if (arrayOfArrays[indexArray + 1][index].match(regexNumber)) {
                searchAround.bottom = true;
                arrayOfNumbersToSum.push(Number(searchParent(arrayOfArrays, indexArray + 1, index - 1, regexNumber, false).reverse().concat(searchParent(arrayOfArrays, indexArray + 1, index, regexNumber, true)).join('')))
            }
            // To the top left
            if (arrayOfArrays[indexArray - 1][index - 1].match(regexNumber) && !searchAround.top) {
                searchAround.topLeft = true;
                arrayOfNumbersToSum.push(Number(searchParent(arrayOfArrays, indexArray - 1, index - 1 - 1, regexNumber, false).reverse().concat(searchParent(arrayOfArrays, indexArray - 1, index - 1, regexNumber, true)).join('')))
            }
            // To the top right
            if (arrayOfArrays[indexArray - 1][index + 1].match(regexNumber) && !searchAround.top) {
                searchAround.topRight = true;
                arrayOfNumbersToSum.push(Number(searchParent(arrayOfArrays, indexArray - 1, index + 1 - 1, regexNumber, false).reverse().concat(searchParent(arrayOfArrays, indexArray - 1, index + 1, regexNumber, true)).join('')))
            }
            // To the bottom left
            if (arrayOfArrays[indexArray + 1][index - 1].match(regexNumber) && !searchAround.bottom) {
                searchAround.bottomLeft = true;
                arrayOfNumbersToSum.push(Number(searchParent(arrayOfArrays, indexArray + 1, index - 1 - 1, regexNumber, false).reverse().concat(searchParent(arrayOfArrays, indexArray + 1, index - 1, regexNumber, true)).join('')))
            }
            // To the bottom right
            if (arrayOfArrays[indexArray + 1][index + 1].match(regexNumber) && !searchAround.bottom) {
                searchAround.bottomRight = true;
                arrayOfNumbersToSum.push(Number(searchParent(arrayOfArrays, indexArray + 1, index + 1 - 1, regexNumber, false).reverse().concat(searchParent(arrayOfArrays, indexArray + 1, index + 1, regexNumber, true)).join('')))
            }
            part1Result += arrayOfNumbersToSum.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

            if (item === "*") {
                let trueCount = 0;
                for (const key in searchAround) {
                    if (searchAround[key] === true) {
                        trueCount++;
                    }
                }
                if (trueCount === 2) {
                    part2Result += arrayOfNumbersToSum.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
                }
            }
        }
    })
});

console.log(part1Result);
console.log(part2Result);