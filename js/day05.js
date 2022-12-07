
var results = {};
var input = '';
var columns = 0;
var output = document.getElementById('Output');
window.runAOC = function () {
    input = document.getElementById('Input').value.split('\n');
    columns =  document.getElementById('ColCount').value | 0;

    let shippingCrates = [];
    for (let i = 0; i < columns; ++i) {
        shippingCrates.push([]);
    }


    // Build the ship
    let lineNumber = 0;
    while (true) {
        let line = input[lineNumber];
        if (line.indexOf('[') == -1) {
            break;
        }
        let lineIndex = line.indexOf('[');
        while (lineIndex != -1) {
            let crateIndex = lineIndex / 4;
            let crateID = line[lineIndex + 1];
            shippingCrates[crateIndex].push(crateID);

            lineIndex = line.indexOf('[', lineIndex + 4);
        }

        ++lineNumber;
    }
    for (let i = 0; i < columns; ++i) {
        shippingCrates[i].reverse();
    }
    results.shippingCrates = shippingCrates;


    // run the commands
    ++lineNumber; // Skip blank space
    for (lineNumber; lineNumber < input.length; ++lineNumber) {
        let line = input[lineNumber];
        let splits = line.split(' ');
        let amount = splits[1] | 0;
        let fromIndex = (splits[3] | 0) - 1;
        let toIndex = (splits[5] | 0) - 1;

        //moveCratesOneAtATime(amount, fromIndex, toIndex); // PART 1
        moveCrates(amount, fromIndex, toIndex) // PART 2
    }

    printCrates();


    let out = '';
    for (let i = 0; i < columns; ++i) {
        let column = shippingCrates[i];
        if (column.length == 0) {
            continue;
        }
        out = out + column[column.length - 1];
    }
    output.textContent = output.textContent + "\n" + out;
    window.results = results;
};

var moveCrates = function (amount, fromIndex, toIndex) {
    let temp = [];
    for (let count = 0; count < amount; ++count) {
        temp.push(results.shippingCrates[fromIndex].pop());
    }
    for (let count = 0; count < amount; ++count) {
        results.shippingCrates[toIndex].push(temp.pop());
    }
};

var moveCratesOneAtATime = function (amount, fromIndex, toIndex) {
    for (let boxesMoved = 0; boxesMoved < amount; ++boxesMoved) {
        let crate = results.shippingCrates[fromIndex].pop();
        results.shippingCrates[toIndex].push(crate);
    }
};

var printCrates = function () {
    let out = '';
    let tallestCol = 0;
    for (let i = 0; i < columns; ++i) {
        tallestCol = Math.max(tallestCol, results.shippingCrates[i].length);
    }
    for (let i = tallestCol - 1; i >= 0; --i) {
        for (let j = 0; j < columns; ++j) {
            out += (results.shippingCrates[j].length > i) ? '[' + results.shippingCrates[j][i] + '] ' : '    ';
        }
        out += "\n";
    }

    for (let i = 1; i <= columns; ++i) {
        out += ' ' + i + '  ';
    }
    out += "\n";
    output.textContent = out;
};
