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
      health: 120,
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
      name: "Ann",
      pic: "assets/images/ann.png",
      health: 95,
      attack: 20,
      counterAttack: 15,
      parry: 25
    },
    {
      name: "Makoto",
      pic: "assets/images/makoto.jpg",
      health: 115,
      attack: 25,
      counterAttack: 10,
      parry: 30
    },
    {
      name: "Haru",
      pic: "assets/images/haru.jpg",
      health: 110,
      attack: 15,
      counterAttack: 15,
      parry: 25
    },
    {
      name: "Akechi",
      pic: "assets/images/crow.jpg",
      health: 105,
      attack: 25,
      counterAttack: 15,
      parry: 25
    }
  ];

  var bosses = [
    {
      name: "King Kamoshida",
      pic: "assets/images/king.png",
      health: 200,
      attack: 30,
      counterAttack: 40,
      parry: 20
    },
    {
      name: "Kaneshiro",
      pic: "assets/images/kaneshiro.png",
      health: 250,
      attack: 70,
      counterAttack: 65,
      parry: 20
    },
    {
      name: "Okumura",
      pic: "assets/images/okumura.png",
      health: 350,
      attack: 80,
      counterAttack: 100,
      parry: 20
    },
    {
      name: "Sae",
      pic: "assets/images/sae.png",
      health: 425,
      attack: 90,
      counterAttack: 175,
      parry: 20
    },
    {
      name: "Shido",
      pic: "assets/images/shido2.png",
      health: 500,
      attack: 100,
      counterAttack: 225,
      parry: 20
    }
  ];

  var player = { attack: 0, health: 0, counterAttack: 0, parry: 0 };
  var opponent = { attack: 0, health: 0, counterAttack: 0, parry: 0, name: "" };
  var baseAttack;
  var baseParry;
  var baseHealth;
  var floorAttack = 1;
  var opponentBaseAttack;
  var opponentBaseCounter;
  var playerBool;
  var opponentBool;
  var standardMode;
  var advancedMode;
  var advHealthUpgrade;
  var advAttackUpgrade;
  var advParryUpgrade;
  var stunBool;
  var opponentStun;
  var stunChance;
  var criticalChance;
  var battleMusic = false;
  var finalBoss = false;
  var lastSurprise = new Audio("assets/music/LastSurprise.mp3");
  var victory = new Audio("assets/music/Victory.mp3");
  var riversInTheDesert = new Audio("assets/music/RiversintheDesert.mp3");

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

  function addBosses() {
    for (var i = 0; i < bosses.length; i++) {
      var card = $(`<div class='card'><img src='${
        bosses[i]["pic"]
      }' class='card-img-top' alt='${bosses[i]["name"]}'>
    <div class='card-body'>
    <h5 class='card-title name' value='${bosses[i]["name"]}'>${
        bosses[i]["name"]
      }</h5>
    <p class='card-text health'value='${bosses[i]["health"]}'>Health: ${
        bosses[i]["health"]
      }</p>
    <p class='attack' value='${bosses[i]["attack"]}' style='display:none'>${
        bosses[i]["attack"]
      }</p>
    <p class='parry' value='${bosses[i]["parry"]}' style='display:none'>${
        bosses[i]["parry"]
      }</p>
      <p class='counterAttack' value='${
        bosses[i]["counterAttack"]
      }' style='display:none'>${bosses[i]["counterAttack"]}</p>
    </div>
    </div>
    `);
      $(".card-deck").append(card);
    }
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
        opponent.name = card.find(".name").attr("value");
        opponentBaseCounter = opponent.counterAttack * 2;
        opponent.parry = parseInt(card.find(".parry").attr("value"));
        opponentBool = false;
        music();
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
    music();
  });

  $("#advancedMode").click(function() {
    // Change player & opponent attack stats. State base power for both?
    addBosses();
    $("#battleUI").toggle();
    $("#difficulty").toggle();
    $("#statusText").text(
      "Press the Attack Button to attack. Press the Parry Button to parry. Fight!"
    );
    advancedMode = true;
    if ($("#attack").hasClass("btn-block")) {
      $("#attack").removeClass("btn-block");
    }
    if ($("#parry").css("display", "none")) $("#parry").toggle();
    music();
  });

  function music() {
    if (!battleMusic) {
      battleMusic = true;
      lastSurprise.play();
    }
    if (opponent.name == "Shido" && $("card-deck").length === 0) {
      lastSurprise.pause();
      riversInTheDesert.play();
    }
  }

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
      player.attack = Math.floor(Math.random() * baseAttack) + floorAttack;
      opponent.counterAttack =
        Math.floor(Math.random() * opponentBaseCounter) + 1;
      criticalChance = Math.floor(Math.random() * 100) + 1;
      // Player attack is greater than Opponent
      if (!opponentStun && !stunBool) {
        if (player.attack > opponent.counterAttack) {
          if (criticalChance <= 5) {
            opponent.health = opponent.health - player.attack;
            $("#opponentHealth").text(opponent.health);
            $("#battleText").text(
              "CRITICAL HIT! You struck your opponent with " +
                player.attack +
                " damage and stunned them!"
            );
            opponentStun = true;
          } else {
            opponent.health =
              opponent.health - (player.attack - opponent.counterAttack);
            $("#opponentHealth").text(opponent.health);
            $("#battleText").text(
              "What a hit! Your opponent took " +
                (player.attack - opponent.counterAttack) +
                " damage!"
            );
          }
          // If Opponent Counter Attack Greater than Player attack
        } else if (player.attack < opponent.counterAttack) {
          if (criticalChance <= 5) {
            player.health = player.health - opponent.counterAttack;
            $("#playerHealth").text(player.health);
            $("#battleText").text(
              "Wow! Your opponent landed a critical hit! You took " +
                opponent.counterAttack +
                " damage and are stunned for the next turn! (Click either the attack button or parry button to continue)"
            );
            stunBool = true;
          } else {
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
          $("#battleText").text("Your swords have clashed! No damage!");
        }
      } else if (opponentStun && !stunBool) {
        opponent.health = opponent.health - player.attack;
        $("#opponentHealth").text(opponent.health);
        opponentStun = false;
        $("#battleText").text(
          "A direct strike! You dealt " + player.attack + " damage!"
        );
      } else if (!opponentStun && stunBool) {
        opponent.attack = Math.floor(Math.random() * opponentBaseAttack) + 1;
        player.health = player.health - opponent.attack;
        $("#playerHealth").text(player.health);
        stunBool = false;
        $("#battleText").text(
          "Your opponent struck you while you were down! You took " +
            opponent.attack +
            " damage!"
        );
      } else if (opponentStun && stunBool) {
        $("#battleText").text("Both combatants stood idly for a few moments.");
        opponentStun = false;
        stunBool = false;
      }
    } else {
      $("#statusText").text("Something went wrong.");
    }
    battleConditions();
  });

  $("#parry").click(function() {
    opponent.attack = Math.floor(Math.random() * opponentBaseAttack) + 1;
    player.parry = Math.floor(Math.random() * baseParry) + 1;
    if (!opponentStun) {
      if (!stunBool) {
        if (opponent.attack > player.parry) {
          // If the opponent's attack is greater than the player's parry
          player.health = player.health - opponent.attack;
          $("#playerHealth").text(player.health);
          $("#battleText").text(
            "Oh no! Your parry failed! You took " + opponent.attack + " damage!"
          );
        } else {
          // Otherwise, if the player's parry is greater than the opponent's attack
          stunChance = Math.floor(Math.random() * 100) + 1;
          if (stunChance <= 35) {
            // if stun chance is Less than or equal to 10
            // Stun Chance
            opponentStun = true;
            $("#battleText").text(
              "Amazing! You've stunned your opponent! They cannot defend your next attack!"
            );
          } else {
            $("#battleText").text("You blocked your opponent!");
          }
        }
      } else {
        stunBool = false;
        player.health = player.health - opponent.attack;
        $("#playerHealth").text(player.health);
        $("#battleText").text(
          "Your opponent struck you while you were down! You took " +
            opponent.attack +
            " damage!"
        );
      }
    } else {
      $("#battleText").text(
        "You missed an opportunity to strike! Your opponent has gotten back up."
      );
      opponentStun = false;
    }
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
          stunBool = false;
          opponentStun = false;
        }
      } else {
        $("#statusText").text(
          "Congratulations, there are no more opponents to face. You win!"
        );
        if (!riversInTheDesert.paused || !lastSurprise.paused) {
          riversInTheDesert.pause();
          lastSurprise.pause();
          victory.play();
        }
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
    advHealthUpgrade = Math.floor(Math.random() * (baseHealth / 2) + 10);
    if (advHealthUpgrade > 100) advHealthUpgrade = 100;
    baseHealth += advHealthUpgrade;
    player.health = baseHealth;
    $("#playerHealth").text(player.health);
    $("#statusText").text(
      "Your health has increased by " +
        advHealthUpgrade +
        ". Choose your next opponent."
    );
  });

  $("#attackUpgrade").click(function() {
    $("#upgrades").toggle();
    opponentBool = true;
    advAttackUpgrade = Math.floor(Math.random() * (baseAttack - 10) + 10);
    if (advAttackUpgrade > 100) advAttackUpgrade = 100; // Hard cap on attack upgrade. To keep balance
    advParryUpgrade = Math.floor(advAttackUpgrade / 3);
    $("#statusText").text(
      "Your attack has increased by " +
        advAttackUpgrade +
        ". Choose your next opponent."
    );
    floorAttack += Math.floor(advAttackUpgrade / 10);
    baseAttack += advAttackUpgrade;
    baseParry += advParryUpgrade;
  });

  $("#resetButton").click(function() {
    $("#battleText").text("");
    $(".playerSide").empty();
    $(".opponentSide").empty();
    $(".card-deck").empty();
    setUpGame();
    $("#reset").toggle();
    standardMode = false;
    advancedMode = false;
    stunBool = false;
    opponentStun = false;
    battleMusic = false;
    if (!lastSurprise.paused) {
      lastSurprise.pause();
    } else if (!riversInTheDesert.paused) riversInTheDesert.pause();
    else {
      victory.pause();
    }
  });
})(jQuery);
