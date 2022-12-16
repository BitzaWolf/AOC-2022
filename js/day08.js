class Tree {
    height = 0;
    visibleFromEdge = false;
    scenicScore = {
        north: 0,
        east: 0,
        south: 0,
        west: 0,
        total: 0
    };

    constructor(size) {
        this.height = size;
    }
}

var results = {};
var input = '';
var output = document.getElementById('Output');
window.runAOC = function () {
    input = document.getElementById('Input').value.split('\n');
    let trees = [];
    input.forEach((line) => {
        let row = [];
        for (let i = 0; i < line.length; ++i) {
            let tree = new Tree(line[i] | 0);
            row.push(tree);
        }
        trees.push(row);
    });
    results.trees = trees;

    let visibleTrees = trees[0].length * 2 + trees.length * 2 - 4;
    let bestScore = -1;
    let searchDirections = [
        [ 1,  0],
        [ 0,  1],
        [-1,  0],
        [ 0, -1]
    ];
    for (let row = 1; row < trees.length - 1; ++row) {
        for (let col = 1; col < trees[0].length - 1; ++col) {
            let tree = trees[row][col];
            for (let i = 0; i < searchDirections.length; ++i) {
                calculateScenicScore(tree, row, col, searchDirections[i][0], searchDirections[i][1]);
                if (! tree.visibleFromEdge) {
                    traverseJungle(tree, row, col, searchDirections[i][0], searchDirections[i][1]);
                }
            }
            if (tree.visibleFromEdge) {
                ++visibleTrees;
            }
            tree.scenicScore.total = tree.scenicScore.north * tree.scenicScore.east * tree.scenicScore.south * tree.scenicScore.west;
            if (tree.scenicScore.total > bestScore) {
                bestScore = tree.scenicScore.total;
            }
        }
    }
    results.visibleTrees = visibleTrees;

    output.textContent = visibleTrees + '\n' + bestScore;

    window.results = results;
};

var calculateScenicScore = function (startingTree, row, col, dRow, dCol) {
    let score = 0;
    row += dRow;
    col += dCol;
    while (row >= 0 && row < results.trees.length && col >= 0 && col < results.trees[0].length) {
        let tree = results.trees[row][col];
        score += 1;
        if (tree.height >= startingTree.height) {
            break;
        }
        row += dRow;
        col += dCol;
    }
    let direction = 'north';
    if (dRow == 0) {
        if (dCol == 1) {
            direction = 'east';
        } else {
            direction = 'west';
        }
    } else if (dRow == 1){
        direction = 'south';
    }
    startingTree.scenicScore[direction] = score;
};

var traverseJungle = function (startingTree, row, col, dRow, dCol) {
    let visible = true;
    row += dRow;
    col += dCol;
    while (visible && row >= 0 && row < results.trees.length && col >= 0 && col < results.trees[0].length) {
        let tree = results.trees[row][col];
        if (tree.height >= startingTree.height) {
            visible = false;
        }
        row += dRow;
        col += dCol;
    }
    startingTree.visibleFromEdge = visible;
};
