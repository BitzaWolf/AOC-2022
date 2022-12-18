
var results = {};
var input = '';
var output = document.getElementById('Output');
window.runAOC = function () {
    input = document.getElementById('Input').value.split('\n');
    let results = {};
    window.results = results;

    let strengthSum = 0;
    let cycle = 1;
    let registerValue = 1;
    let cycleCheckIns = [20, 60, 100, 140, 180, 220];

    input.forEach((line) => {
        let command = line.split(' ')[0];
        let cyclesToWait = 0;

        if (command == 'noop') {
            cyclesToWait = 1;
        } else if (command == 'addx') {
            cyclesToWait = 2;
        }

        let summedThisCycle = false;
        while (cyclesToWait > 0) {
            summedThisCycle = false;
            renderPixel(cycle, registerValue);
            --cyclesToWait;
            ++ cycle;
            if (cycleCheckIns.includes(cycle) && cyclesToWait != 0) {
                strengthSum += registerValue * cycle;
                summedThisCycle = true;
            }
        }

        if (command == 'addx') {
            let param = line.split(' ')[1] | 0;
            registerValue += param;
        }
        if (! summedThisCycle && cycleCheckIns.includes(cycle)) {
            strengthSum += registerValue * cycle;
        }
    });
    results.sum = strengthSum;

    output.textContent = output.textContent + "\n" + strengthSum;
};

var renderPixel = function (cycle, registerValue) {
    let crtXPos = ((cycle - 1) % 40);
    let character = '.';
    if (Math.abs(crtXPos - registerValue) < 2) {
        character = '#';
    }
    output.textContent = output.textContent + character;
    if (cycle % 40 == 0) {
        output.textContent = output.textContent + "\n";
    }
}
