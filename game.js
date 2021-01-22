var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var id = ("");
var level = 1;
var click = (-1);
var status = ("");
var key = 0;


$("html").keypress(function start() {
  key = 1 + key;
  if (key == 1) {
    $("h1").text("Level " + level);

    random();

  };

});


$(".btn").click(function() {

  var b = $(this).attr("id");
  userClickedPattern.push(b);
  makeSound(b);
  animation(b);
  animatePress(b);
  setTimeout(function() {
    $("#" + b).removeClass("pressed");
  }, 100);

  click = click + 1;

  checkPattern(click);

});


function nextSequence(status) {

  switch (status) {
    case "true":
      setTimeout(random, 800);
      level = level + 1;
      $("h1").text("Level " + level);
      click = (-1);
      status = ("");

      break;
    case "false":
      $("h1").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");;
      }, 200);
      var wrong = new Audio('sounds/wrong.mp3');
      wrong.play();
      gamePattern = [];
      status = ("");
      key = 0;
      level = 1;
      click = (-1);
      break;
  };

};

function checkPattern(click) {

  if (userClickedPattern[click] != gamePattern[click]) {
    status = "false";
    nextSequence(status);

  } else {
    click = click + 1;
  };
  if ((click == gamePattern.length) && (click != 0)) {
    status = "true";
    nextSequence(status);
  };
};


function animation(b) {
  $("#" + b).fadeOut(100).fadeIn(100);
};

function random() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColour);
  userClickedPattern = [];
};

function animatePress(b) {
  $("#" + b).addClass("pressed");
}

function makeSound(b) {
  switch (b) {
    case "red":
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;
    case "green":
      var green = new Audio('sounds/green.mp3');
      green.play();
      break;
    case "blue":
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;
    case "yellow":
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;
    default:
  }
}
