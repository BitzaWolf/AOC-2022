class Range {
    start = 0;
    end = 0;

    constructor (string) {
        string = string.split('-');
        this.start = string[0] | 0;
        this.end = string[1] | 0;
    }

    get length() {
        return this.end - this.start + 1;
    }

    isInRange(val) {
        return (val >= this.start && val <= this.end);
    }

    static containsOther(a, b) {
        let shorter = a;
        let longer = b;
        if (a.length > b.length) {
            shorter = b;
            longer = a;
        }
        if (shorter.start >= longer.start && shorter.end <= longer.end) {
            return true;
        }
    }

    static overlaps(a, b) {
        let shorter = a;
        let longer = b;
        if (a.length > b.length) {
            shorter = b;
            longer = a;
        }
        for (let i = shorter.start; i <= shorter.end; ++i) {
            if (longer.isInRange(i)) {
                return true;
            }
        }
        return false;
    }
}

var results = {};
var input = document.getElementById('Input').value.split('\n');
var output = document.getElementById('Output');
window.runAOC = function () {
    input = document.getElementById('Input').value.split('\n');

    let containingPairs = 0;
    let overlappingPairs = 0;
    input.forEach((line) => {
        let ranges = line.split(',');
        let a = new Range(ranges[0]);
        let b = new Range(ranges[1]);
        if (Range.containsOther(a, b)) {
            ++containingPairs;
        }
        if (Range.overlaps(a, b)) {
            ++overlappingPairs;
        }
    });

    output.textContent = containingPairs + "\n" + overlappingPairs;
    window.results = results;
};
