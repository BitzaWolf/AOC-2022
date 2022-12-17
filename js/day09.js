class Point {
    x = 0;
    y = 0;
};

var results = {};
var input = '';
var output = document.getElementById('Output');
window.runAOC = function () {
    input = document.getElementById('Input').value.split('\n');
    let results = {};
    window.results = results;

    let visitedPaths = {
        '0x0': true,
    };
    results.visitedPaths = visitedPaths;

    let segmentcount = 10;
    let points = [];
    for (let i = 0; i < segmentcount; ++i) {
        points.push(new Point());
    }

    input.forEach((line) => {
        let command = line.split(' ')[0];
        let amount = line.split(' ')[1] | 0;

        let dx = 0;
        let dy = 0;
        if (command == 'R') {
            dx = 1;
        } else if (command == 'D') {
            dy = -1;
        } else if (command == 'L') {
            dx = -1;
        } else {
            dy = 1;
        }

        for (let i = 0; i < amount; ++i) {
            let head = points[0];
            let tail = points[1];
            head.x += dx;
            head.y += dy;

            for (let j = 1; j < points.length; ++j) {
                head = points[j - 1];
                tail = points[j];

                let distanceX = Math.abs(head.x - tail.x);
                let distanceY = Math.abs(head.y - tail.y);

                if (distanceX == 2 || distanceY == 2) {
                    let vecX = (distanceX == 0 ? 0 : (head.x - tail.x) / distanceX);
                    let vecY = (distanceY == 0 ? 0 : (head.y - tail.y) / distanceY);;
                    tail.x += vecX;
                    tail.y += vecY;
                }
            }

            tail = points[points.length - 1];
            visitedPaths[tail.x + 'x' + tail.y] = true;
            if (window.debug) {
                printGrid(points); //Very helpful debug!
            }
        }
    });


    output.textContent = output.textContent + '\n\n' + Object.keys(results.visitedPaths).length;

    window.results = results;
};

var printGrid = function (points) {
    let grid = '';
    for (let y = 12; y >= -12; --y) {
        for (let x = -12; x <= 12; ++x) {
            if (x == 0 && y == 0) {
                grid += 's ';
            } else {
                let covered = false;
                points.forEach((point, index) => {
                    if (point.x == x && point.y == y) {
                        grid += index + ' ';
                        covered = true;
                    }
                });
                if (! covered) {
                    if (window.results.visitedPaths[x + 'x' + y]) {
                        grid += '# ';
                    } else {
                        grid += '. ';
                    }
                }
            }
        }
        grid += '\n';
    }
    output.textContent = grid;
}
