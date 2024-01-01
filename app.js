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
];

const monsters = [
  { name: "brown sludge", level: 2, health: 10 },
  { name: "green sludge", level: 3, health: 12 },
  { name: "black sludge", level: 4, health: 15 },
  { name: "pale green slime", level: 5, health: 17 },
];

const locations = [
  {
    name: "a vendor's clearing",
    "button text": [],
    "button functions": [],
    text: "Lorem Ipsum",
  },
];

function update(location) {
  button1.innerText = location["button text"[0]];
  button2.innerText = location["button text"[1]];
  button3.innerText = location["button text"[2]];
  button1.onclick = location["button functions"[0]];
  button2.onclick = location["button functions"[1]];
  button3.onclick = location["button functions"[2]];
  text.innerText = location.text;
}
