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

function update(location) {
  button1.innerText = location["button text"[0]];
  button2.innerText = location["button text"[1]];
  button3.innerText = location["button text"[2]];
  button1.onclick = location["button functions"[0]];
  button2.onclick = location["button functions"[1]];
  button3.onclick = location["button functions"[2]];
  text.innerText = location.text;
}
