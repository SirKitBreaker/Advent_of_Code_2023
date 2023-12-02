const fs = require("node:fs");
const readline = require("node:readline");

const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;
let gameSum = 0;
let powerSum = 0;

const rl = readline.createInterface({
    input: fs.createReadStream("./input.txt"),
    crlfDelay: Infinity,
});

// Helper function to get the number of cubes used
function getCubes(inputLine, colour) {
    let regex = new RegExp("\\d+\\s" + colour, "g");
    let cubesUsed = inputLine.match(regex);
    cubesUsed.forEach(
        (element, index) =>
            (cubesUsed[index] = Number(element.replace(/[\D]/g, "")))
    );
    return cubesUsed;
}

function day2part1(gameNumber, redCubesUsed, greenCubesUsed, blueCubesUsed) {
    if (
        Math.max(...redCubesUsed) <= redCubes &&
        Math.max(...greenCubesUsed) <= greenCubes &&
        Math.max(...blueCubesUsed) <= blueCubes
    ) {
        gameSum += Number(gameNumber);
        console.log("Part1:", gameSum);
    }
}

function day2part2(redCubesUsed, greenCubesUsed, blueCubesUsed) {
    powerSum +=
        Math.max(...redCubesUsed) *
        Math.max(...greenCubesUsed) *
        Math.max(...blueCubesUsed);
    console.log("Part2:", powerSum);
}

rl.on("line", (line) => {
    // Get game number
    let gameNumber = line.match(/\d+/);

    // Get number of cubes used in that game
    let redCubesUsed = getCubes(line, "red");
    let greenCubesUsed = getCubes(line, "green");
    let blueCubesUsed = getCubes(line, "blue");

    // Get the sum of the games that are possible with the given config
    day2part1(gameNumber[0], redCubesUsed, greenCubesUsed, blueCubesUsed);

    // Find the sum of the power of the sets
    day2part2(redCubesUsed, greenCubesUsed, blueCubesUsed);
});
