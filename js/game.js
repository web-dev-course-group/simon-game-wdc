//Finished on 2021-04-15
//Last modified on 2021-04-15 v2

var gamePattern = [];
var userClickPattern = [];
var started = 0; //0 = game hasn't started or game had ended, 1 = game in progress 
var level = 0; //game level
var allowUserInput = 1; //prevents player from clicking game buttons after the game was started and before next nextSequence is activated, is set to 1 before the game starts so that player can get familiar with button animations and sounds
var buttonColors = ["red", "blue", "green", "yellow"];

//start button function, used to start or restart the game
$(".start").click( function() {
  
  if (started === 0) {
    window.started = 1;
    nextSequence();
    updateLevel();
    $("button.start").text("Game in progress");
  }
  
});

//generates next color button, animates+plays it, adds it to gamePattern
function nextSequence() {
  
  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  window.gamePattern = gamePattern;
  window.allowUserInput = 1;
  buttonAnimation2(randomChosenColor);
  playButtonSound(randomChosenColor);
  //console.log("gamePattern: " + gamePattern);
  
}

//Function for detected button press
var btnClassClick = function(event) {
  
    buttonID = event.currentTarget.id;
    this.getAttribute("id"); //same as userChosenColor
    
    //to make sure buttons are not animating during 1 sec wait period before nextSequence is activated 
    if (allowUserInput === 1){
    buttonAnimation1(buttonID);
    playButtonSound(buttonID);
    }
    
    //checks if game was started and nextSequence was activated
    if ((started === 1) && (allowUserInput === 1)) {
      userClickPattern.push(buttonID);
      window.userClickPattern = userClickPattern;
      //console.log("userClickPattern: " + userClickPattern);
      checkAnswer();
    }
  
}

//Detecting button press with a mouse
$(".action-btn").click(btnClassClick);

function checkAnswer() {
  
  userClickPatternLength = userClickPattern.length;
  var s = userClickPatternLength - 1; //-1 because arrays start at zero
  gamePatternLength = gamePattern.length;
  
  //activates if answer is incorrect
  if (userClickPattern[s] != gamePattern[s]) {
    startOver();
  }
  
  //activates when player finishes a given level and everything is correct
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

//player press animation
function buttonAnimation1(buttonColor) {
  
  $("#" + buttonColor).addClass("pressed"); //adds pressed class to a buttom that was pressed
  setTimeout(function () { $("#" + buttonColor).removeClass("pressed"); }, 100); //removes pressed class from a button after .1sec
  
}

//button animation for computer
function buttonAnimation2(buttonColor) {

  $("#" + buttonColor).animate({opacity: 0.1}).animate({opacity: 1});

}

function playButtonSound(buttonSound) {
  
  var sound = new Audio("sounds/" + buttonSound + ".mp3");
  sound.play();
  
}

//start over or game over, resets all the values and more
function startOver() {
  
  window.level = 0;
  window.gamePattern = [];
  window.userClickPattern = [];
  window.started = 0;
  window.allowUserInput = 1;
  backgroundAnimation();
  playWrong();
  $("#level-title").text("Game Over");
  $("button.start").text("Restart");
  //console.log("game over");
  
}

//backround flashes red
function backgroundAnimation() {

  $("body").addClass("game-over"); //adds red background
  setTimeout(function() { $("body").removeClass("game-over"); }, 100); //removes red background  after .1sec

}


function playWrong() {

  var sound = new Audio("sounds/wrong.mp3");
  sound.play();

}