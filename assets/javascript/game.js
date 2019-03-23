// Create card on html
// Create Character object
// Setup Method

// Click on character to become player character

// Click on character to become opponent

// Place opponent into defender area

// Attack button
// Click event ========
// Character damages defender. Defender loses HP
// Opponent counter attacks. Player loses HP
// When defender's HP is reduced to zero, remove enemy from defender area and place in graveyard.
// Player can now choose new opponent
// ====================

// Win conditions
// Player defeats all enemies. Characters array === 0;

// Lose condition
// Player's HP hits 0

// Attributes
// Health Points
// Attack Points (Goes up with every click)
// Counter Attack Power

var characterExample = {
  name: "",
  pic: "",
  health: "",
  attack: "",
  counterAttack: ""
};

var characters = [
  {
    name: "Joker",
    pic: "assets/images/joker.jpg",
    health: "100",
    attack: "25",
    counterAttack: "20"
  },
  { name: "Character2", pic: "...", health: "", attack: "", counterAttack: "" }
];

var names = [];
var pics = [];
var healthArray = [];
var attacks = [];
var counterAttacks = [];

// Go through examples from Monday

// Step 1: Get one character card to appear correctly (for example)
//  // A: Character ARRAY

// Step 2: For loop remaining characters

for (var i = 0; i < 1; i++) {
  var card = $(`<div class='card'><img src='${
    characters[i]["pic"]
  }' class='card-img-top' alt='${characters[i]["name"]}'>
    <div class='card-body'>
    <h5 class='card-title'>${characters[i]["name"]}</h5>
    <p class='card-text'>Health: ${characters[i]["health"]}</p>
    </div>
    </div>
    `);

  $(".card-deck").append(card);
}
