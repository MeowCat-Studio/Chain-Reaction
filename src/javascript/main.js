/**
 * Chain Reaction
 * @projectName: Chain-Reaction
 * @author: MlgmXyysd
 * @version: 1.0.1
 * @license: GNU General Public License v3.0
 * @date: 2020/05/02 19:04
 * @fileName: main.js
 * Copyright &copy; 2013-2020 MeowCat Studio Powered by MlgmXyysd All Rights Reserved.
 */
"use strict";
let life_A;
let life_B;
const MAX_RECURSION = 50;

/**
 * $
 * Get element.
 * @return HTMLElement
 * @param id
 */
const $ = function (id) {
    return document.getElementById(id);
};

/**
 * getRandomNum
 * Generate a random number.
 * @return number
 * @param range
 * @param zero
 * @param max
 */
const getRandomNum = function (range, zero = true, max = 32767) {
    if (zero) {
        range++;
    }
    let result = Math.floor(Math.random() * max % range);
    if (!zero) {
        result++;
    }
    return result;
};

/**
 * updateCatPosition
 * Change cat's position.
 * @return void
 * @param id
 * @param position
 */
const updateCatPosition = function (id, position) {
    let pos = $("cat_" + String(id));
    $("cats_" + String(id)).value = position;
    let gold = "";
    if (id === 1 || id === 3 || id === 5 || id === 7 || id === 9) {
        gold = " gold";
    }
    pos.setAttribute("class", "cat_" + String(position) + gold);
};

/**
 * generateRandomCat
 * Generate 9 random cat.
 * @return void
 */
const generateRandomCat = function () {
    for (let i = 1; i <= 9; i++) {
        let position = getRandomNum(3);
        updateCatPosition(i, position);
    }
};

/**
 * checkLife
 * Check player's life.
 * @return void
 */
const checkLife = function () {
    if (life_A <= 0) {
        alert("B win!");
        window.location.reload(true);
    } else if (life_B <= 0) {
        alert("A win!");
        window.location.reload(true);
    }
    $("life_A").innerHTML = life_A;
    $("life_B").innerHTML = life_B;
};

/**
 * beat
 * Game core.
 * @return void
 * @param location
 * @param position
 * @param time
 */
const beat = function (location, position, time) {
    if (!time) {
        time = 1;
    }
    if (time > MAX_RECURSION) {
        return;
    }
    let pos = Number($("cats_" + String(location)).value);
    let loc = location;
    switch (position) {
        case "left":
            pos--;
            if (pos < 0) {
                pos = 3;
            }
            break;
        case "right":
            pos++;
            if (pos > 3) {
                pos = 0;
            }
            break;
    }
    /* pos:
        0 ←
        1 ↑
        2 →
        3 ↓
    */
    updateCatPosition(loc, pos);
    if (loc === 1 || loc === 4 || loc === 7) {
        if (pos === 3) {
            return;
        }
    } else if (loc === 3 || loc === 6 || loc === 9) {
        if (pos === 1) {
            return;
        }
    } else if (loc === 1 || loc === 3) {
        if (pos === 0) {
            return;
        }
    } else if (loc === 7 || loc === 9) {
        if (pos === 2) {
            return;
        }
    } else if (loc === 2 && pos === 0) {
        life_A--;
        checkLife();
        return;
    } else if (loc === 8 && pos === 2) {
        life_B--;
        checkLife();
        return;
    }
    switch (pos) {
        case 0:
            loc -= 3;
            break;
        case 1:
            loc++;
            break;
        case 2:
            loc += 3;
            break;
        case 3:
            loc--;
            break;
    }
    time++;
    if (loc > 1 || loc < 9) {
        setTimeout(function () {
            beat(loc, position, time);
        }, 500);
    }
};

/**
 * newGame
 * Restart game.
 * @return void
 */
const newGame = function () {
    life_A = 3;
    life_B = 3;
    let rent_A = getRandomNum(6, false);
    let rent_B = getRandomNum(6, false);
    if (rent_A === rent_B) {
        newGame();
        return;
    }
    generateRandomCat();
    if (rent_A > rent_B) {
        $("panel_A").style.display = "block";
        $("panel_B").style.display = "none";
    } else if (rent_B > rent_A) {
        $("panel_B").style.display = "block";
        $("panel_A").style.display = "none";
    }
    checkLife();
};

window.onload = function () {
    newGame();
    $("left_A").onclick = function () {
        $("panel_A").style.display = "none";
        beat(2, "left", 1);
        checkLife();
        $("panel_B").style.display = "block";
    }
    $("right_A").onclick = function () {
        $("panel_A").style.display = "none";
        beat(2, "right", 1);
        checkLife();
        $("panel_B").style.display = "block";
    }
    $("left_B").onclick = function () {
        $("panel_B").style.display = "none";
        beat(8, "left", 1);
        checkLife();
        $("panel_A").style.display = "block";
    }
    $("right_B").onclick = function () {
        $("panel_B").style.display = "none";
        beat(8, "right", 1);
        checkLife();
        $("panel_A").style.display = "block";
    }
}