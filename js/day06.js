
var results = {};
var input = '';
var output = document.getElementById('Output');
window.runAOC = function () {
    input = document.getElementById('Input').value;

    let packetStart = -1;
    for (let i = 0; i + 4 < input.length; ++i) {
        let slice = input.slice(i, i + 4);
        let hasDupe = false;
        for (let j = 0; j < 3; ++j) {
            if (slice.indexOf(slice[j], j + 1) != -1) {
                hasDupe = true;
                break;
            }
        }
        if (! hasDupe) {
            packetStart = i;
            break;
        }
    }

    results.packetStart = packetStart + 4;
    output.textContent = packetStart + 4;


    let messageStart = -1;
    for (let i = 0; i + 14 < input.length; ++i) {
        let slice = input.slice(i, i + 14);
        let hasDupe = false;
        for (let j = 0; j < 13; ++j) {
            if (slice.indexOf(slice[j], j + 1) != -1) {
                hasDupe = true;
                break;
            }
        }
        if (! hasDupe) {
            messageStart = i;
            break;
        }
    }

    messageStart += 14;

    results.messageStart = messageStart;
    output.textContent = output.textContent + " | " + messageStart;
    window.results = results;
};
