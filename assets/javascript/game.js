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
  {
    name: "Ryuji",
    pic: "assets/images/ryuji.jpg",
    health: "140",
    attack: "30",
    counterAttack: "25"
  },
  {
    name: "Yusuke",
    pic: "assets/images/yusuke.jpg",
    health: "110",
    attack: "20",
    counterAttack: "20"
  },
  {
    name: "Akechi",
    pic: "assets/images/crow.jpg",
    health: "105",
    attack: "20",
    counterAttack: "25"
  },
  {
    name: "Kamoshida",
    pic: "assets/images/kamoshida.png",
    health: "200",
    attack: "15",
    counterAttack: "30"
  }
];

var names = [];
var pics = [];
var healthArray = [];
var attacks = [];
var counterAttacks = [];
var playerCharacter;
var opponent;

// Go through examples from Monday

// Step 1: Get one character card to appear correctly (for example)
//  // A: Character ARRAY

// Step 2: For loop remaining characters

for (var i = 0; i < characters.length; i++) {
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

function placeCharacter() {}

$(".card").on("click", function() {
  var card = $(this);
  if (!$(".playerSide").find("div.player")) {
    $(".playerSide").append(card);
  }
});
