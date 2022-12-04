class Elf {
    calories = 0;
    constructor(heldCalories) {
        heldCalories.forEach((foodItem) => {
            this.calories += foodItem;
        });
    }

    static hasMoreCalories(a, b) {
        return a.calories - b.calories;
    }
}

var results = {};
window.runAOC = function () {
    let input = document.getElementById('Input').value.split('\n');
    let output = document.getElementById('Output');
    let foodItems = [];
    results.elves = [];
    input.forEach((line) => {
        if (line == '') {
            results.elves.push(new Elf(foodItems));
            foodItems = [];
        } else {
            foodItems.push(line | 0); // convert to int
        }
    });
    if (foodItems.length != 0) {
        results.elves.push(new Elf(foodItems));
        foodItems = [];
    }

    results.elves.sort(Elf.hasMoreCalories);
    let totalCalories = 0;
    for (var i = 1; i <= 3; ++i) {
        totalCalories += results.elves[results.elves.length - i].calories;
    }
    output.textContent = totalCalories;
    window.results = results;
};
