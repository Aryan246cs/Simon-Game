var gamePattern = [];

var buttonColors = ["red" , "blue" , "green" , "yellow"];

var userClickedPattern = [];

var level = 0;
$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

var started = false;

$(document).keydown(function(){
        if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        }

});
    

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.random();
    randomNumber = randomNumber*3;
    randomNumber = Math.floor(randomNumber + 1);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
    
}

function checkAnswer(currentLevel){
 if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
 if(gamePattern.length === userClickedPattern.length){
    setTimeout(function () {
        nextSequence();
      }, 1000);
 }
}else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    $("#level-title").text("Game Over , Press Any Key To Restart ");
    StartOver();
 }

}

function StartOver() {
    level = 0;
    gamePattern = [];
    started = false;
}









