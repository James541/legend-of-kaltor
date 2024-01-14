let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: "club", power: 2 },
  { name: "spiked club", power: 3 },
  { name: "double spiked club", power: 5 },
  { name: "pitchfork", power: 6 },
  { name: "rusty dagger", power: 7 },
  { name: "copper dagger", power: 10 },
  { name: "sharp copper dagger", power: 12 },
  { name: "cracked iron dagger", power: 13 },
  { name: "iron dagger", power: 14 },
  { name: "sharp iron dagger", power: 15 },
];

const monsters = [
  { name: "brown sludge", level: 2, health: 10 },
  { name: "green sludge", level: 3, health: 12 },
  { name: "black sludge", level: 4, health: 15 },
  { name: "pale green slime", level: 5, health: 17 },
  { name: "pale white slime", level: 6, health: 18 },
  { name: "pale purple slime", level: 7, health: 20 },
  { name: "brown slime", level: 8, health: 22 },
  { name: "green slime", level: 9, health: 24 },
  { name: "orange slime", level: 10, health: 26 },
];
const locations = [
  {
    name: "vendor",
    "button text": ["Buy Weapon", "Buy Health", "Leave"],
    "button functions": [buyWeapon, buyHealth, goClearing],
    text: "A dark figure is here, offering wares.",
  },
  {
    name: "forest",
    "button text": ["Fight Sludge", "Turn Around", "Think"],
    "button functions": [fightBrownSludge, goClearing, stopAndThink],
    text: "You work your way through some trees and brush and reach another clearing in the forest. You are not alone. A disgusting brown sludge looks at you menacingly.",
  },
  {
    name: "clearing",
    "button text": ["Talk to stranger", "Into the forest", "Go to pub"],
    "button functions": [goVendor, goForest, goPub],
    text: "You stand in a clearing in the forest caused in part by the tumbling wreackage of a wagon. This is where your adventure began.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Flee"],
    "button functions": [attack, dodge, goClearing],
    text: "You are fighting a monster!",
  },
  {
    name: "monster killed",
    "button text": [],
    "button functions": [],
  },
];

button1.onclick = goVendor;
button2.onclick = goForest;
button3.onclick = goPub;

function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function fightBrownSludge() {
  fighting = 0;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function goForest() {
  update(locations[1]);
}
function goClearing() {
  monsterStats.style.display = "none";
  update(locations[2]);
}

function stopAndThink() {
  text.innerText =
    "You pause and consider the implications, but perhaps you should be taking action instead.";
}

function goVendor() {
  update(locations[0]);
}

function goPub() {}

function buyWeapon() {}

function buyHealth() {}

function attack() {
  text.innerText = `You attack the ${monsters[fighting].name} with your ${weapons[0].name}!\n `;
  text.innerText += `\nThe ${monsters[fighting].name} attacks!`;
  health -= monsters[fighting].level;
  monsterHealth -= weapons[0].power + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    defeatMonster();
  }
}

function dodge() {}

function lose() {}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * Math.random() * 3 + 1);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  text.innerText = `A ${monsters[fighting].name} is dead!!\n \nYou learn from your battle and collect the monsters gold as spoils of war.`;
  monsterStats.style.display = "none";
  update(locations[4]);
}
