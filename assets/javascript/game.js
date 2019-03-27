// Attack button
// Click event ========
// Character damages defender. Defender loses HP
// Opponent counter attacks. Player loses HP
// When defender's HP is reduced to zero, remove enemy from defender area and place in graveyard.
// Player can now choose new opponent
// ====================

(function($) {
  var characters = [
    {
      name: "Joker",
      pic: "assets/images/joker.jpg",
      health: 100,
      attack: 30,
      counterAttack: 10,
      parry: 30
    },
    {
      name: "Ryuji",
      pic: "assets/images/ryuji.jpg",
      health: 80,
      attack: 50,
      counterAttack: 15,
      parry: 20
    },
    {
      name: "Yusuke",
      pic: "assets/images/yusuke.jpg",
      health: 110,
      attack: 30,
      counterAttack: 10,
      parry: 50
    },
    {
      name: "Akechi",
      pic: "assets/images/crow.jpg",
      health: 105,
      attack: 24,
      counterAttack: 15,
      parry: 40
    },
    {
      name: "Kamoshida",
      pic: "assets/images/kamoshida.png",
      health: 200,
      attack: 15,
      counterAttack: 20,
      parry: 40
    }
  ];

  var player = { attack: 0, health: 0, counterAttack: 0, parry: 0 };
  var opponent = { attack: 0, health: 0, counterAttack: 0, parry: 0 };
  var baseAttack;
  var baseParry;
  var baseHealth;
  var opponentBaseAttack;
  var opponentBaseCounter;
  var playerBool;
  var opponentBool;
  var standardMode;
  var advancedMode;
  var advHealthUpgrade;
  var advAttackUpgrade;
  var stunBool;
  var opponentStun;
  var stunChance;

  $("#battleUI").css("display", "none");
  $("#difficulty").css("display", "none");
  $("#reset").css("display", "none");
  $("#upgrades").css("display", "none");

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

  //   $(".card").on("click", function() {
  $(document).on("click", ".card", function() {
    var card = $(this);
    if (playerBool) {
      card.attr("id", "player");
      card.appendTo(".playerSide");
      player.health = parseInt(card.find(".health").attr("value"));
      card.find(".health").attr("id", "playerHealth");
      player.attack = parseInt(card.find(".attack").attr("value"));
      player.counterAttack = parseInt(
        card.find(".counterAttack").attr("value")
      );
      player.parry = parseInt(card.find(".parry").attr("value"));
      baseAttack = parseInt(player.attack);
      baseHealth = parseInt(player.health);
      baseParry = parseInt(player.parry);
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
        opponentBaseAttack = parseInt(opponent.attack);
        opponent.counterAttack = parseInt(
          card.find(".counterAttack").attr("value")
        );
        opponentBaseCounter = opponent.counterAttack * 2;
        opponent.parry = parseInt(card.find(".parry").attr("value"));
        opponentBool = false;
        if (!advancedMode && !standardMode) {
          $("#statusText").text("Select your difficulty");
          $("#difficulty").toggle();
        } else if (standardMode || advancedMode) {
          $("#battleUI").toggle();
          $("#statusText").text("Fight!");
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
    // Change player & opponent attack stats. State base power for both?
    $("#battleUI").toggle();
    $("#difficulty").toggle();
    $("#statusText").text(
      "Press the Attack Button to attack. Press the Parry Button to parry. Fight!"
    );
    advancedMode = true;
    advHealthUpgrade = 25;
    advAttackUpgrade = baseAttack;
  });

  $("#attack").click(function() {
    // Standard
    if (standardMode && !advancedMode) {
      opponent.health = opponent.health - player.attack;
      player.health = player.health - opponent.counterAttack;
      player.attack += baseAttack;
      $("#opponentHealth").text(opponent.health);
      $("#playerHealth").text(player.health);
      // Advanced Below //
      //
    } else if (advancedMode && !standardMode) {
      player.attack = Math.floor(Math.random() * baseAttack) + 1;
      opponent.counterAttack =
        Math.floor(Math.random() * opponentBaseCounter) + 1;
      // Player attack is greater than Opponent
      if (!opponentStun) {
        if (player.attack > opponent.counterAttack) {
          opponent.health =
            opponent.health - (player.attack - opponent.counterAttack);
          $("#opponentHealth").text(opponent.health);
          $("#battleText").text(
            "What a hit! Your opponent took " +
              (player.attack - opponent.counterAttack) +
              " damage!"
          );
          // If Opponent Counter Attack Greater than Player attack
        } else if (player.attack < opponent.counterAttack) {
          player.health =
            player.health - (opponent.counterAttack - player.attack);
          $("#playerHealth").text(player.health);
          $("#battleText").text(
            "Oof! That's gotta hurt. You took " +
              (opponent.counterAttack - player.attack) +
              " damage!"
          );
        }
      } else {
        opponent.health = opponent.health - player.attack;
        $("#opponentHealth").text(opponent.health);
        opponentStun = false;
        $("#battleText").text(
          "A direct strike! You dealt " + player.attack + " damage!"
        );
      }
    } else {
      $("#statusText").text("Something went wrong.");
    }
    battleConditions();
  });
  $("#parry").click(function() {
    opponent.attack = Math.floor(Math.random() * opponentBaseAttack) + 1;
    player.parry = Math.floor(Math.random() * baseParry) + 1;
    if (opponent.attack > player.parry) {
      // If the opponent's attack is greater than the player's parry
      player.health = player.health - (opponent.attack - player.parry);
      $("#playerHealth").text(player.health);
      $("#battleText").text(
        "Oh no! Your parry failed! You took " +
          (opponent.attack - player.parry) +
          " damage!"
      );
    } else {
      // Otherwise, if the player's parry is greater than the opponent's attack
      stunChance = Math.floor(Math.random() * 100) + 1;
      if (stunChance <= 10) {
        // if stun chance is Less than or equal to 10
        // Stun Chance
        opponentStun = true;
        $("#battleText").text(
          "Amazing! You've stunned your opponent! They cannot defend your next attack!"
        );
      } else {
        opponent.health = opponent.health - player.parry;
        $("#opponentHealth").text(opponent.health);
        $("#battleText").text(
          "You blocked your opponent! You managed to chip away their health with " +
            player.parry +
            " damage!"
        );
      }
    }
    battleConditions();
  });

  function battleConditions() {
    if (opponent.health <= 0 && player.health > 0) {
      if ($(".card-deck").children().length > 0) {
        if (standardMode && !advancedMode) {
          $("#statusText").text(
            "Congratulations, you win! Choose your next opponent."
          );
          opponentBool = true;
        } else if (advancedMode && !standardMode) {
          $("#statusText").text(
            "Congratulations, you defeated your opponent! Select an upgrade before continuing."
          );
          player.health = baseHealth;
          $("#playerHealth").text(player.health);
          $("#battleText").text("");
          $("#upgrades").toggle();
        }
      } else {
        $("#statusText").text(
          "Congratulations, there are no more opponents to face. You win!"
        );
        $("#reset").toggle();
      }
      // Toggles Battle UI and clears Opponent's Side of Field
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
  }

  $("#healthUpgrade").click(function() {
    $("#upgrades").toggle();
    opponentBool = true;
    $("#statusText").text(
      "Your health has increased by " +
        advHealthUpgrade +
        ". Choose your next opponent."
    );
    baseHealth += advHealthUpgrade;
    player.health = baseHealth;
    $("#playerHealth").text(player.health);
  });

  $("#attackUpgrade").click(function() {
    $("#upgrades").toggle();
    opponentBool = true;
    $("#statusText").text(
      "Your attack has increased by " +
        advAttackUpgrade +
        ". Choose your next opponent."
    );
    baseAttack += advAttackUpgrade;
  });

  $("#resetButton").click(function() {
    $(".playerSide").empty();
    $(".opponentSide").empty();
    $(".card-deck").empty();
    setUpGame();
    $("#reset").toggle();
    standardMode = false;
    advancedMode = false;
  });
})(jQuery);
