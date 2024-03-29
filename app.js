let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let currentRoom = 0;
let fighting;
let monsterHealth;
let inventory = [];
let returnRoom;
let drinkCounter = 0;

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
  { name: "nicely balanced mace", power: 25 },
];

const items = [
  { name: "a strange silver coin" },
  { name: "a small ruby" },
  { name: "light armor" },
  { name: "a hunk of crusty bread" },
  { name: "a chunk of salty cheese" },
];

const monsters = [
  { name: "brown sludge", level: 2, health: 10 },
  { name: "green sludge", level: 3, health: 15 },
  { name: "black sludge", level: 4, health: 20 },
  { name: "pale white slime", level: 8, health: 32 },
  { name: "pale purple slime", level: 10, health: 40 },
  { name: "brown slime", level: 13, health: 40 },
  { name: "green slime", level: 16, health: 49 },
  { name: "orange slime", level: 19, health: 55 },
  { name: "wolverine", level: 20, health: 60 },
  { name: "python", level: 25, health: 100 },
];
const locations = [
  {
    name: "clearing",
    "button text": ["Talk to stranger", "Into the forest", "Go to pub"],
    "button functions": [goVendor, goForest, goPub],
    text: "You stand in a clearing in the forest caused in part by the tumbling wreackage of a wagon. This is where your adventure began.",
    roomNumber: 0,
  },
  {
    name: "vendor",
    "button text": ["Buy Weapon (50)", "Buy Health (10)", "Leave"],
    "button functions": [buyWeapon, buyHealth, goClearing],
    text: "A dark figure is here, offering wares.",
    roomNumber: 1,
  },
  {
    name: "pub",
    "button text": ["Buy Beer", "Buy Whiskey", "Leave"],
    "button functions": [buyBeer, buyWhiskey, goClearing],
    text: "You enter a nice warm pub. Plenty of open seats, beer and whiskey at the bar.\n",
    roomNumber: 2,
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Flee"],
    "button functions": [attack, dodge, goBack],
    text: "You are fighting a monster!",
    roomNumber: 3,
  },
  {
    name: "monster killed",
    "button text": ["Look around", "Move Forward", "Go Back"],
    "button functions": [lookAround, moveForward, goBack],

    roomNumber: 4,
  },
  {
    name: "forest",
    "button text": ["Fight Sludge", "Go Back", "Think"],
    "button functions": [fightBrownSludge, goClearing, stopAndThink],
    text: "You work your way through some trees and brush and reach another clearing in the forest. You are not alone. A disgusting brown sludge looks at you menacingly.",
    roomNumber: 5,
  },

  {
    name: "forestTwo",
    "button text": ["Fight Sludge", "Go Back", "Think"],
    "button functions": [fightGreenSludge, goBack, stopAndThink],
    text: "You work your way through more trees and brush. As you emerge from a thick patch of thorny brambles you nearly step on a green sludge. This upsets the green sludge.",
    roomNumber: 6,
  },
  {
    name: "forestThree",
    "button text": ["Fight Sludge", "Go Back", "Think"],
    "button functions": [fightBlackSludge, goBack, stopAndThink],
    text: "You work your way deeper into the forest. You sense something watching you. You look down to see a black sludge inching towards you aggressively ",
    roomNumber: 7,
  },
  {
    name: "forestFour",
    "button text": ["Fight Slime", "Go Back", "Think"],
    "button functions": [fightPaleGreenSlime, goBack, stopAndThink],
    text: "You don't know where any significant civilization may be, but it does feel like you are moving further from it. It smells of wet earth and pine. The air has a chill.\n From behind a shrubbery a pale green slime emerges. ",
    roomNumber: 8,
  },
  {
    name: "forestFive",
    "button text": ["Fight Slime", "Go Back", "Think"],
    "button functions": [fightPaleWhiteSlime, goBack, stopAndThink],
    text: "As you wade deeper into the forest, you hear running water in the distance.A bizzare looking pale white slime oozes towards you.",
    roomNumber: 9,
  },
  {
    name: "forestSix",
    "button text": ["Fight Slime", "Go Back", "Think"],
    "button functions": [fightPalePurpleSlime, goBack, stopAndThink],
    text: "Lorem Ipsum \n\n A strange looking pale purple slime gurgles here.",
    roomNumber: 10,
  },
  {
    name: "forestSeven",
    "button text": ["Fight Slime", "Go Back", "Think"],
    "button functions": [fightBrownSlime, goBack, stopAndThink],
    text: "Lorem Ipsum \n\n A strange looking brown slime snarls at your arrival.",
    roomNumber: 11,
  },
  {
    name: "forestEight",
    "button text": ["Fight Slime", "Go Back", "Think"],
    "button functions": [fightGreenSlime, goBack, stopAndThink],
    text: "Lorem Ipsum \n\n A strange looking green slime snaps at you.",
    roomNumber: 12,
  },
  {
    name: "forestNine",
    "button text": ["Fight Slime", "Go Back", "Think"],
    "button functions": [fightOrangeSlime, goBack, stopAndThink],
    text: "Lorem Ipsum \n\n A toxic looking orange slime is here.",
    roomNumber: 13,
  },
  {
    name: "embankment",
    "button text": ["Fight Wolverine", "Go Back", "Think"],
    "button functions": [fightWolverine, goBack, stopAndThink],
    text: "Lorem Ipsum \n\n A toxic looking orange slime is here.",
    roomNumber: 13,
  },
  {
    name: "embankmentTwo",
    "button text": ["Fight Python", "Go Back", "Think"],
    "button functions": [fightPython, goBack, stopAndThink],
    text: "Lorem Ipsum \n\n A toxic looking orange slime is here.",
    roomNumber: 14,
  },
];

console.log(locations.length + " = location length");

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
  currentRoom = location.roomNumber;
}

function fightBrownSludge() {
  returnRoom = currentRoom;
  fighting = 0;
  goFight();
}
function fightGreenSludge() {
  returnRoom = currentRoom;
  fighting = 1;
  goFight();
}

function fightBlackSludge() {
  returnRoom = currentRoom;
  fighting = 2;
  goFight();
}

function fightPaleGreenSlime() {
  returnRoom = currentRoom;
  fighting = 3;
  goFight();
}

function fightPaleWhiteSlime() {
  returnRoom = currentRoom;
  fighting = 4;
  goFight();
}

function fightPalePurpleSlime() {
  returnRoom = currentRoom;
  fighting = 5;
  goFight();
}

function fightBrownSlime() {
  returnRoom = currentRoom;
  fighting = 6;
  goFight();
}

function fightGreenSlime() {
  returnRoom = currentRoom;
  fighting = 7;
  goFight();
}

function fightOrangeSlime() {
  returnRoom = currentRoom;
  fighting = 8;
  goFight();
}

function fightWolverine() {
  returnRoom = currentRoom;
  fighting = 9;
  goFight();
}

function fightPython() {
  returnRoom = currentRoom;
  fighting = 10;
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
  update(locations[5]);
}
function goForestTwo() {
  update(locations[6]);
}
function goClearing() {
  button1.style.display = "inline";
  button2.style.display = "inline";
  drinkCounter = 0;
  monsterStats.style.display = "none";
  update(locations[0]);
}

function stopAndThink() {
  text.innerText =
    "You pause and reflect on your current situation, and realize you should be taking action instead.";
}

function goVendor() {
  update(locations[1]);
}

function goPub() {
  update(locations[2]);
}

function buyWeapon() {
  console.log(currentWeapon);
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 50) {
      gold -= 50;
      goldText.innerText = gold;
      currentWeapon++;
      text.innerText += `\nYou buy a ${weapons[currentWeapon].name}.`;
    } else {
      checkGold(50);
    }
  } else {
    text.innerText += "\nYou already have the best weapon available!";
  }
}

function buyHealth() {
  if (gold >= 10) {
    health += 10;
    gold -= 10;
    healthText.innerText = health;
    goldText.innerText = gold;
  } else {
    checkGold(10);
  }
}

function attack() {
  text.innerText = `You attack the ${monsters[fighting].name} with your ${weapons[currentWeapon].name}!\n `;
  text.innerText += `\nThe ${monsters[fighting].name} attacks!`;
  health -= monsters[fighting].level;
  monsterHealth -= weapons[currentWeapon].power + 1 + Math.floor(xp * 0.15);
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    defeatMonster();
  }
}

function dodge() {
  text.innerText = `You dodge a ${monsters[fighting].name}'s attack!`;
}

function lose() {}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * Math.random() * 3 + 5);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  currentRoom = update(locations[4]);
  monsterStats.style.display = "none";
  text.innerText = `A ${monsters[fighting].name} is dead!!\n \nYou learn from your battle and collect the monsters gold as spoils of war.`;
}

function lookAround() {
  update(locations[returnRoom]);
}
function moveForward() {
  update(locations[returnRoom + 1]);
}
function goBack() {
  update(locations[0]);
}
function buyBeer() {
  if (gold > 1) {
    gold -= 2;
    goldText.innerText = gold;
    text.innerText += "\n The beer is hoppy and cold.";
    drinkCounter++;
    checkCounter(drinkCounter);
  } else {
    checkGold(2);
  }
}
function buyWhiskey() {
  if (gold > 4) {
    gold -= 5;
    goldText.innerText = gold;
    text.innerText += "\n The whiskey is strong, yet smooth.";
    drinkCounter++;
    checkCounter(drinkCounter);
  } else {
    checkGold(5);
  }
}

function checkCounter(drinks) {
  if (drinks === 6) {
    text.innerText += "\n \n You are moderately belligerent.\n";
  }
  if (drinks === 3) {
    text.innerText += "\n \n You stumble a bit.\n";
  }
  if (drinks === 9) {
    text.innerText +=
      "\n\n You trip and smash face first into your table\n\n The bartender cuts you off. ";
    button1.style.display = "none";
    button2.style.display = "none";
    health -= 13;
    healthText.innerText = health;
  }
}
function checkGold(price) {
  if (gold < price) {
    text.innerText +=
      "\n\n You don't have enough money, get out of here you bum!";
  } else {
    return true;
  }
}
