//Finished on 2021-04-15
//Last modified on 2021-04-15 v1

var gamePattern = [];

var userClickPattern = [];

var started = 0; //0 = game hasn't started or game had ended, 1 = game in progress 

var level = 0; //game level

var allowUserInput = 1; //prevents player from clicking game buttons after the game was started and before next nextSequence is activated

var buttonColors = ["red", "blue", "green", "yellow"];

//start button function, used to start or restart the game
$(".start").click( function() {
  
  if (started === 0) {

    window.started = 1;
    nextSequence();
    updateLevel();
    
  }
  
});

function nextSequence() {

  var randomNumber = Math.floor(4 * Math.random());

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  window.gamePattern = gamePattern;

  window.allowUserInput = 1;

  buttonAnimation(randomChosenColor);
  playButtonSound(randomChosenColor);

  //console.log("gamePattern: " + gamePattern);

}

//Detecting button press with a mouse, should try to use jQuery for this
var numberOfButtons = $(".btn-c").length;
for (var i=0; i <= (numberOfButtons-1); i++) {
  document.querySelectorAll(".btn-c")[i].addEventListener("click", function() {
    
    var buttonID = this.getAttribute("id"); //same as userChosenColor
    
    if (allowUserInput === 1){
      
    buttonAnimation(buttonID);
    playButtonSound(buttonID);
    
    }
    
    if ((started === 1) && (allowUserInput === 1)) {
    
      userClickPattern.push(buttonID);
    
      window.userClickPattern = userClickPattern;
    
      console.log("userClickPattern: " + userClickPattern);
      
      checkAnswer();
    
    }
    
  });
}

function checkAnswer() {
  
  userClickPatternLength = userClickPattern.length;
  
  var s = userClickPatternLength - 1;

  gamePatternLength = gamePattern.length;
  
  if (userClickPattern[s] != gamePattern[s]) {
    
    startOver();
    
  }
  
  else if (userClickPatternLength == gamePatternLength) {
    
    updateLevel();
    
    window.userClickPattern = [];
    
    window.allowUserInput = 0; //to prevent selecting next square before nextSequence() is activated
    
    setTimeout(function() {
      nextSequence();
    }, 1000); //wait 1sec before playing next nextSequence()
    
  }
  
}

function updateLevel() {
  
  level++;
  $("#level-title").text("Level " + level);
  
}

//should figure out how to use jQuery for this
function buttonAnimation(buttonColor) {
  
  $("#" + buttonColor).addClass("pressed"); //adds pressed class to a buttom that was pressed
  
  setTimeout(function () { $("#" + buttonColor).removeClass("pressed"); }, 100); //removes pressed class from a button after .1sec
  
}

function playButtonSound(buttonSound) {
  
  var sound = new Audio("sounds/" + buttonSound + ".mp3");
  sound.play();
  
}

function backgroundAnimation() {

  $("body").addClass("game-over"); //adds red background

  setTimeout(function() { $("body").removeClass("game-over"); }, 100); //removes red background  after .1sec

}

function playWrong() {
  
  var sound = new Audio("sounds/wrong.mp3");
  sound.play();
  
}

//resets all the values and activates backroundAnimation function
function startOver() {
  window.level = 0;
  window.gamePattern = [];
  window.userClickPattern = [];
  window.started = 0;
  window.allowUserInput = 1;
  backgroundAnimation();
  playWrong();
  $("#level-title").text("Game Over");
  //console.log("game over");
}