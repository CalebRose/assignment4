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

var character = {
    name: "",
    pic: "",
    health: "",
    attack: "",
    counterAttack: ""
}

var names = [];
var pics = [];
var healthArray = [];
var attacks = [];
var counterAttacks = [];

// Go through examples from Monday

// Step 1: Get one character card to appear correctly