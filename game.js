// Create an empty array which will be added to
var gamePattern = [];

// Array to hold the pattern of the user clicks
var userClickedPattern = [];

// Create an Array holding the four colours of the buttons
var buttonColours = ["red","blue","green","yellow"];

var level = 0;
var started = false;

// listens for a keydown event to start the game
$(document).keydown(function() {
    if (started == false) {
        $("level-title").text("Level " + level);
        started = true;
        nextSequence();
    }
});

// Selecting an element by ATTRIBUTE, as the element can not be targeted as a "button"
// The element is a div, not a button, but its type is a button.
// We can target that as our Click Listener
// $("div[type='button']").click(function (){

// But rather just target the class
$(".btn").click(function (){
    // this selects the id of the button type div that triggered the click event
    // so we can tell which button was clicked by the id
    // var userChosenColour = event.target.id;
    // var userChosenColour = this.id;
    var userChosenColour = $(this).attr("id");

    // add to the users click pattern array
    userClickedPattern.push(userChosenColour);

    // animate the clicked button
    animate(userChosenColour);
    // $("#" + userChosenColour).fadeOut(100).fadeIn(100);

    // play sound for the clicked button
    playSound(userChosenColour);
    // var audio1 = new Audio("sounds/" + userChosenColour +".mp3");
    // audio1.play();

    // CHECK THE ANSWER
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  // Check that the selected colour matches the game's random colour
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // If the number of inputs (clicks) is the same as the number of random colours, do another one.
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Press any key to restart.");

    setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
    startOver();
  }
}

// Function to create a random number between 0 and 3 (always 1 extra on the "max")
function nextSequence() {
    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level " + level);

    // A variable which will call the function to get a random number
    var rn = Math.floor(Math.random() * 4);

    // And then use the random number to select a colour from the array
    var randomChosenColour = buttonColours[rn];

    // add the colour to our gamePattern array
    gamePattern.push(randomChosenColour);

    // animate the random button selected
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    // play sound of random button selected
    playSound(randomChosenColour);
    // var audio = new Audio("sounds/" + randomChosenColour +".mp3");
    // audio.play();
}

function animate(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  started = false;
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}
