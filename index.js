var buttonColours =["red", "blue", "green", "yellow"];

var gamePattern =[];

var userClickedPattern =[];

var isGameStarted = false;

var level = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
       console.log("right");
       if(gamePattern.length===userClickedPattern.length){
         setTimeout(function(){
            console.log("Next level");
            nextSequence();
         },1000);
       }
    }else{
        gameOver();
    }
}

function gameOver(){
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
    
}

function startOver(){
    isGameStarted = false;
    gamePattern=[];
    level = 0;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

$(".btn").click(function(){
   var userChosenColour  = $(this).attr("id");

   userClickedPattern.push(userChosenColour);
   
   playSound(userChosenColour);

   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length-1);
});



$(document).ready(function () {
    if (isMobile()) {
        // Mobile device detected
        $(document).on('touchstart', function(){
            if(!isGameStarted){
                $("#level-title").text("Level "+level);
                nextSequence();
                isGameStarted = true;
             }
        });
    } else {
        // Desktop device detected
        $(document).keydown(function () { 
            if(!isGameStarted){
               $("#level-title").text("Level "+level);
               nextSequence();
               isGameStarted = true;
            }
        });
    }
});
function isMobile() {
    return 'ontouchstart' in document.documentElement;
}


