var results = {};
var input = '';
var output = document.getElementById('Output');
window.runAOC = function () {
    input = document.getElementById('Input').value.split('\n');

    let fileSystem = {
        '/': {
            '__dirSize': 0,
            '__calcDirSize': calcDirSize,
            '__findSmallestDir': findSmallestDir,
        }
    };


    // Build the file system
    let cwd = fileSystem['/'];
    for (let i = 1; i < input.length; ++i) {
        let line = input[i];
        let command = line.substr(2).split(' ');
        if (command[0] == 'ls') {
            ++i;
            line = input[i];
            do {
                command = line.split(' ');
                if (command[0] == 'dir') {
                    cwd[command[1]] = {
                        '..': cwd,
                        '__dirSize': 0,
                        '__calcDirSize': calcDirSize,
                        '__findSmallestDir': findSmallestDir,
                    };
                } else {
                    cwd[command[1]] = command[0] | 0;
                }
                ++i;
                line = input[i];
            } while (i < input.length && line.indexOf('$') == -1);
            --i;
        } else if (command[0] == 'cd') {
            cwd = cwd[command[1]];
        }
    }
    results.fileSystem = fileSystem;
    results.answer = 0;


    // calculate directory sizes
    fileSystem['/'].__calcDirSize();
    output.textContent = 'Sum of dirs less than 100,000 in size: ' + results.answer + '\n';


    let fileSystemSize = 70000000;
    let spaceAvailable = fileSystemSize - fileSystem['/'].__dirSize;
    let spaceNeeded = 30000000 - spaceAvailable;

    results.answer = fileSystem['/'].__findSmallestDir(spaceNeeded, 999999999999);
    output.textContent = output.textContent + 'Smallest Directory: ' + results.answer;

    window.results = results;
};


// Recursive function to calculate the size of a directory
var calcDirSize = function () {
    let properties = Object.getOwnPropertyNames(this);
    let size = 0;
    properties.forEach((prop) => {
        if (prop == '..' || prop.indexOf('__') == 0) {
            return 0;
        }
        if (typeof this[prop] == 'object') {
            size += this[prop].__calcDirSize();
        } else {
            size += this[prop];
        }
    });
    this.__dirSize = size;
    if (size < 100000) {
        results.answer += size;
    }
    return size;
};

var findSmallestDir = function (spaceNeeded, smallestDir) {
    let properties = Object.getOwnPropertyNames(this);
    properties.forEach((prop) => {
        if (prop == '..' || prop.indexOf('__') == 0) {
            return 999999999999;
        }
        if (typeof this[prop] == 'object') {
            smallestDir = this[prop].__findSmallestDir(spaceNeeded, smallestDir);
        }
    });
    let diff = this.__dirSize - spaceNeeded;
    if (diff >= 0 && this.__dirSize < smallestDir) {
        smallestDir = this.__dirSize;
    }
    return smallestDir;
};
