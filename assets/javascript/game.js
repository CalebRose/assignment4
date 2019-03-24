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
$(document).ready(function() {
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
      counterAttack: "20",
      parry: ""
    },
    {
      name: "Ryuji",
      pic: "assets/images/ryuji.jpg",
      health: "140",
      attack: "30",
      counterAttack: "25",
      parry: ""
    },
    {
      name: "Yusuke",
      pic: "assets/images/yusuke.jpg",
      health: "110",
      attack: "20",
      counterAttack: "20",
      parry: ""
    },
    {
      name: "Akechi",
      pic: "assets/images/crow.jpg",
      health: "105",
      attack: "20",
      counterAttack: "25",
      parry: ""
    },
    {
      name: "Kamoshida",
      pic: "assets/images/kamoshida.png",
      health: "200",
      attack: "15",
      counterAttack: "30",
      parry: ""
    }
  ];

  var player = { attack: "", health: "", counterAttack: "" };
  var opponent = { attack: "", health: "", counterAttack: "" };
  var playerBool = true;
  var opponentBool = false;
  var standardMode = false;
  var advancedMode = false;
  var displayMessage = document.getElementById("#status");

  // Go through examples from Monday

  // Step 1: Get one character card to appear correctly (for example)
  //  // A: Character ARRAY

  // Step 2: For loop remaining characters

  for (var i = 0; i < characters.length; i++) {
    var card = $(`<div class='card'><img src='${
      characters[i]["pic"]
    }' class='card-img-top' alt='${characters[i]["name"]}'>
    <div class='card-body'>
    <h5 class='card-title name' value='${characters[i]["name"]}'>${
      characters[i]["name"]
    }</h5>
    <p class='card-text health'value='${characters[i]["health"]}'>Health: ${
      characters[i]["health"]
    }</p>
    <p class='attack' value='${characters[i]["attack"]}' style='display:none'>${
      characters[i]["attack"]
    }</p>
    <p class='parry' value='${characters[i]["parry"]}' style='display:none'>${
      characters[i]["parry"]
    }</p>
      <p class='counterAttack' value='${
        characters[i]["counterAttack"]
      }' style='display:none'>${characters[i]["counterAttack"]}</p>
    </div>
    </div>
    `);
    $("#battleUI").css("display", "none");
    $("#difficulty").css("display", "none");
    $(".card-deck").append(card);
  }

  $("#standardMode").click(function() {
    $("#attack").addClass("btn-block");
    $("#parry").toggle();
    $("#battleUI").toggle();
    $("#difficulty").toggle();
    $("#statusText").text("Press the Attack Button to fight");
    standardMode = true;
  });

  $("#advancedMode").click(function() {
    $("#battleUI").toggle();
    $("#difficulty").toggle();
    $("#statusText").text(
      "Press the Attack Button to attack. Press the Parry Button to parry. Fight!"
    );
    advancedMode = true;
  });

  $(".card").on("click", function() {
    console.log(opponentBool);
    var card = $(this);
    if (playerBool) {
      card.attr("id", "player");
      card.appendTo(".playerSide");
      player.health = card.find(".health").attr("value");
      player.attack = card.find(".attack").attr("value");
      player.counterAttack = card.find(".counterAttack").attr("value");
      console.log(player.health);
      playerBool = false;
      opponentBool = true;
      $("#statusText").text("Select your opponent");
    } else if (opponentBool) {
      if (card.attr("id", "player")) {
        $("#statusText").text(
          "You cannot select your player character as your opponent. Please try again."
        );
        return;
      } else {
        card.attr("id", "opponent");
        card.appendTo(".opponentSide");
        opponentBool = false;
        $("#statusText").text("Select your difficulty");
        $("#difficulty").toggle();
      }
    }
  });
});
