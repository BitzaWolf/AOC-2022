
var results = {};

var convertToRPS = function (letter) {
    if (letter == 'A' || letter == 'X') {
        return 'R';
    } else if (letter == 'B' || letter == 'Y') {
        return 'P';
    } else {
        return 'S';
    }
};

var convertStrategyToShape = function (opponentPlay, strategy) {
    if (strategy == 'Y') {
        return opponentPlay;
    }
    if (strategy == 'X') {
        if (opponentPlay == 'R') {
            return 'S';
        } else if (opponentPlay == 'P') {
            return 'R';
        }
        return 'P';
    }
    if (opponentPlay == 'R') {
        return 'P';
    } else if (opponentPlay == 'P') {
        return 'S';
    }
    return 'R';
};

var getShapeScore = function (shape) {
    if (shape == 'R') {
        return 1;
    } else if (shape == 'P') {
        return 2;
    }
    return 3;
};

var gameResultAsScore = function (opponentPlay, yourPlay) {
    if (opponentPlay == yourPlay) {
        return 3;
    }
    if (
        (opponentPlay == 'R' && yourPlay == 'P') ||
        (opponentPlay == 'P' && yourPlay == 'S') ||
        (opponentPlay == 'S' && yourPlay == 'R')) {
        return 6;
    }
    return 0;
};

window.runAOC = function () {
    let input = document.getElementById('Input').value.split('\n');
    let output = document.getElementById('Output');

    let opponentPlay = '';
    let yourPlay = '';
    let totalScore = 0;
    input.forEach((line) => {
        let split = line.split(' ');
        opponentPlay = convertToRPS(split[0]);
        yourPlay = convertStrategyToShape(opponentPlay, split[1]);
        totalScore += getShapeScore(yourPlay) + gameResultAsScore(opponentPlay, yourPlay);
    });

    output.textContent = totalScore;
    window.results = results;
};

window.runAOC_PART1 = function () {
    let input = document.getElementById('Input').value.split('\n');
    let output = document.getElementById('Output');

    let opponentPlay = '';
    let yourPlay = '';
    let totalScore = 0;
    input.forEach((line) => {
        let split = line.split(' ');
        opponentPlay = convertToRPS(split[0]);
        yourPlay = convertToRPS(split[1]);
        totalScore += getShapeScore(yourPlay) + gameResultAsScore(opponentPlay, yourPlay);
    });

    output.textContent = totalScore;
    window.results = results;
};
