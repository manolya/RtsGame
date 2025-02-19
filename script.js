// 🎮 Game Variables
let resources = { gold: 100, food: 100, wood: 100, stone: 100 };
let troops = { infantry: 0, archers: 0, cavalry: 0, siege: 0 };
let general = "None";

// ✨ Function to Collect Resources
function collectResource(type) {
    resources[type] += 10;
    document.getElementById(type).innerText = resources[type];
}

// ⚔️ Function to Train Troops
function trainTroop(type) {
    if (resources.food >= 20 && resources.gold >= 10) {
        troops[type] += 1;
        resources.food -= 20;
        resources.gold -= 10;
        document.getElementById(type).innerText = troops[type];
        document.getElementById("gold").innerText = resources.gold;
        document.getElementById("food").innerText = resources.food;
    } else {
        alert("Not enough resources! 🌙");
    }
}

// 🌙 Assign General
function assignGeneral() {
    general = document.getElementById("generalSelect").value;
    document.getElementById("currentGeneral").innerText = general;
}
