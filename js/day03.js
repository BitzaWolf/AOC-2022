class Rucksack {
    leftHalf = '';
    rightHalf = '';
    whole = ''

    constructor (contents) {
        this.whole = contents;
        this.leftHalf = contents.substr(0, contents.length / 2);
        this.rightHalf = contents.substr(contents.length / 2);
    }

    findDuplicate () {
        for (let i = 0; i < this.leftHalf.length; ++i) {
            if (this.rightHalf.indexOf(this.leftHalf[i]) != -1) {
                return this.leftHalf[i];
            }
        }
        console.error('Could not find a duplicate entry for this pack');
        console.log(this);
    }
}

var convertLettToPriority = function (char) {
    let ascii = char.charCodeAt(0);
    if (ascii >= 97) {
        return ascii - 96;
    }
    return ascii - 38;
}

var results = {};
window.runAOC = function () {
    let input = document.getElementById('Input').value.split('\n');
    let output = document.getElementById('Output');

    let elfGroups = [];
    let packs = [];
    let group = [];
    input.forEach((line) => {
        if (line == "") {
            return;
        }
        let pack = new Rucksack(line)
        packs.push(pack);
        group.push(pack);
        if (group.length == 3) {
            elfGroups.push(group);
            group = [];
        }
    });
    results.packs = packs;
    results.groups = elfGroups;

    let sum = 0;
    elfGroups.forEach((group) => {
        let firstContents = group[0].whole;
        for (let i = 0; i < firstContents.length; ++i) {
            let char = firstContents[i];
            if (group[1].whole.indexOf(char) != -1 &&
                group[2].whole.indexOf(char) != -1
               ) {
                sum += convertLettToPriority(char);
                break;
            }
        }
    });

    output.textContent = sum;
    window.results = results;
};

window.runAOC_Part1 = function () {
    let input = document.getElementById('Input').value.split('\n');
    let output = document.getElementById('Output');

    let packs = [];
    input.forEach((line) => {
        if (line == "") {
            return;
        }
        packs.push(new Rucksack(line));
    });
    results.packs = packs;

    let sum = 0;
    packs.forEach((pack) => {
        let dupe = pack.findDuplicate();
        sum += convertLettToPriority(dupe);
    });

    output.textContent = sum;
    window.results = results;
};
