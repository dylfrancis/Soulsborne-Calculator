// Function to change max level depending on game
var minLevel = 1;
var maxLevel;

function checkGame(game) {
    if (game.value == "demonsouls") {
        document.getElementById("start-level-input").max = 712;
        document.getElementById("end-level-input").max = 712;
        maxLevel = 712;
    }
    else if (game.value == "ds1") {
        document.getElementById("start-level-input").max = 715;
        document.getElementById("end-level-input").max = 715;
        maxLevel = 715;
    }
    else if (game.value == "ds2") {
        document.getElementById("start-level-input").max = 838;
        document.getElementById("end-level-input").max = 838;
        maxLevel = 838;
    }
    else if (game.value == "ds3") {
        document.getElementById("start-level-input").max = 802;
        document.getElementById("end-level-input").max = 802;
        maxLevel = 802;
    }
    else if (game.value == "bloodborne") {
        document.getElementById("start-level-input").max = 544;
        document.getElementById("end-level-input").max = 544;
        maxLevel = 544;
    }
    else if (game.value == "eldenring") {
        document.getElementById("level").max = 713;
        document.getElementById("end-level-input").max = 713;
        maxLevel = 713;
    }
}

function calcSouls(start, end) {
    game = document.getElementById("games").value;
    var totalSouls = 0;
    if (game !== "ds2") {
        const lowLevelList = [673, 690, 707, 724, 741, 758, 775, 793, 811, 829];
        if (start < 11 && end < 11) {
            for (let i = start - 1; i < end - 1; i++) {
                totalSouls = lowLevelList[i] + totalSouls;
            }
            totalSouls = Math.round(totalSouls);
        }
        else if (start < 11) {
            for (let i = start - 1; i < 10; i++) {
                totalSouls = lowLevelList[i] + totalSouls
            }
            for (let j = 0; j < end - 11; j++) {
                totalSouls = totalSouls + Math.round((0.02 * Math.pow(j + 12, 3)) +
                    (3.06 * Math.pow(j + 12, 2)) + (105.6 * (j + 12)) - 895);
            }
            totalSouls = Math.round(totalSouls);
        }
        else {
            for (let i = 0; i < end - start; i++) {
                totalSouls = totalSouls + Math.round(((0.02 * Math.pow(i + start + 1, 3)) +
                    (3.06 * Math.pow(i + start + 1, 2)) + (105.6 * (i + start + 1)) - 895));
            }
        }

        return totalSouls;
    }

    else {
        for (let i = start; i < end; i++) {
            totalSouls += ds2_souls_list[i];
        }
        return totalSouls;
    }
}

function checkLevel(level) {

    if (level.value != "") {
        if (parseInt(level.value) < parseInt(level.min)) {
            level.value = level.min;
        }
        if (parseInt(level.value) > parseInt(level.max)) {
            level.value = level.max;
        }
    }
}

function generateOutput() {
    var startLevel = parseInt(document.getElementById("start-level-input").value);
    var endLevel = parseInt(document.getElementById("end-level-input").value);
    if (isNaN(startLevel) || isNaN(endLevel)) {
        document.getElementById("output-message").innerHTML = "";
        document.getElementById("error").innerHTML = "Please enter a number";
    }
    else {
        if (parseInt(document.getElementById("end-level-input").value) <= parseInt(document.getElementById("start-level-input").value)) {
            document.getElementById("output-message").innerHTML = "";
            document.getElementById("error").innerHTML = "Please make end level greater than starting level";
        }
        else {
            var souls = calcSouls(startLevel, endLevel);
            const formattedSouls = souls.toLocaleString("en-US");
            document.getElementById("output-message").innerHTML = `It will take <b><a class="souls">${formattedSouls}</a></b> souls to go from level <b><a class="souls">${startLevel}</a></b> to level <b><a class="souls">${endLevel}</a></b>`;
            document.getElementById("error").innerHTML = "";
        }
    }
}
