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
(function($) {
  var characters = [
    {
      name: "Joker",
      pic: "assets/images/joker.jpg",
      health: 100,
      attack: 30,
      counterAttack: 10,
      parry: ""
    },
    {
      name: "Ryuji",
      pic: "assets/images/ryuji.jpg",
      health: 80,
      attack: 50,
      counterAttack: 15,
      parry: ""
    },
    {
      name: "Yusuke",
      pic: "assets/images/yusuke.jpg",
      health: 110,
      attack: 30,
      counterAttack: 10,
      parry: ""
    },
    {
      name: "Akechi",
      pic: "assets/images/crow.jpg",
      health: 105,
      attack: 24,
      counterAttack: 15,
      parry: ""
    },
    {
      name: "Kamoshida",
      pic: "assets/images/kamoshida.png",
      health: 200,
      attack: 15,
      counterAttack: 20,
      parry: ""
    }
  ];

  var player = { attack: "", health: "", counterAttack: "" };
  var opponent = { attack: "", health: "", counterAttack: "" };
  var baseAttack;
  var opponentHealth;
  var playerBool;
  var opponentBool;
  var standardMode;
  var advancedMode;
  var displayMessage = document.getElementById("#status");

  // Go through examples from Monday

  // Step 1: Get one character card to appear correctly (for example)
  //  // A: Character ARRAY

  // Step 2: For loop remaining characters

  $("#battleUI").css("display", "none");
  $("#difficulty").css("display", "none");
  $("#reset").css("display", "none");
  setUpGame();
  function setUpGame() {
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
      $(".card-deck").append(card);
    }
    playerBool = true;
    opponentBool = false;
    advancedMode = false;
    standardMode = false;
    $("#statusText").text("Select a character");
  }

  $(".card").on("click", function() {
    var card = $(this);
    if (playerBool) {
      card.attr("id", "player");
      card.appendTo(".playerSide");
      player.health = parseInt(card.find(".health").attr("value"));
      card.find(".health").attr("id", "playerHealth");
      //playerHealth = document.getElementById("playerHealth");
      player.attack = parseInt(card.find(".attack").attr("value"));
      baseAttack = parseInt(player.attack);
      player.counterAttack = parseInt(
        card.find(".counterAttack").attr("value")
      );
      player.parry = parseInt(card.find(".parry").attr("value"));
      playerBool = false;
      opponentBool = true;
      $("#statusText").text("Select your opponent");
    } else if (opponentBool) {
      if (card.is("#player")) {
        $("#statusText").text(
          "You cannot select your player character as your opponent. Please try again."
        );
        return;
      } else {
        card.attr("id", "opponent");
        card.appendTo(".opponentSide");
        opponent.health = parseInt(card.find(".health").attr("value"));
        card.find(".health").attr("id", "opponentHealth");
        opponent.attack = parseInt(card.find(".attack").attr("value"));
        opponent.counterAttack = parseInt(
          card.find(".counterAttack").attr("value")
        );
        opponent.parry = parseInt(card.find(".parry").attr("value"));
        opponentBool = false;
        if (!advancedMode && !standardMode) {
          $("#statusText").text("Select your difficulty");
          $("#difficulty").toggle();
        } else if (standardMode || advancedMode) {
          $("#battleUI").toggle();
        }
      }
    }
  });

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

  $("#attack").click(function() {
    if (standardMode && !advancedMode) {
      opponent.health = opponent.health - player.attack;
      player.health = player.health - opponent.counterAttack;
      player.attack += baseAttack;
      $("#opponentHealth").text(opponent.health);
      $("#playerHealth").text(player.health);
      console.log(player.attack);
      console.log(baseAttack);
    } else if (advancedMode && !standardMode) {
      //
    } else {
      $("#statusText").text("Something is wrong.");
    }

    if (opponent.health <= 0 && player.health > 0) {
      if ($(".card-deck").children().length > 0) {
        $("#statusText").text(
          "Congratulations, you win! Choose your next opponent."
        );
        opponentBool = true;
      } else {
        $("#statusText").text(
          "Congratulations, there are no more opponents to face. You win!"
        );
        $("#reset").toggle();
      }
      $("#battleUI").toggle();
      $(".opponentSide").empty();
    } else if (opponent.health <= 0 && player.health <= 0) {
      $("#statusText").text(
        "Wow... I'm... I'm at a loss for words. Just... try again."
      );
      $("#battleUI").toggle();
      $("#reset").toggle();
    } else if (opponent.health > 0 && player.health <= 0) {
      $("#statusText").text("You lose. Press the Reset Button to try again");
      $("#battleUI").toggle();
      $("#reset").toggle();
    }
  });

  $("#resetButton").click(function() {
    $(".playerSide").empty();
    $(".opponentSide").empty();
    setUpGame();
    $("#reset").toggle();
  });
})(jQuery);
