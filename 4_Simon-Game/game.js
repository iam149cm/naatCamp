
const buttomColours = ["red", "blue", "green", "yellow" ];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keydown(() => {
  if (!started) {
    nextSequence();
    started = true;
  }
})

handler();

$('.btn').click(() => {
  checkAnswer(userClickedPattern.length-1);
})



// function

function nextSequence(){
  userClickedPattern = [];

  level ++;
  $('#level-title').text('Level '+level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttomColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function handler(){
  $('.btn').click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
  })
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
$('#'+currentColour).addClass('pressed');
setTimeout(() => {
  $('#'+currentColour).removeClass('pressed');
}, 100);
}

function checkAnswer(currentLevel){
  let userLastIndex = userClickedPattern[currentLevel];
  let gameLastIndex = gamePattern[currentLevel];

  if (userLastIndex === gameLastIndex ) {
    console.log("success");

    if(userClickedPattern.length === gamePattern.length ) {
      setTimeout(() => {
          nextSequence();
      }, 1000);
    }
  }else {
    console.log("uh-oh!");

    let i = 1;
    let timer = setInterval(function(){

    if(i > 4){
      clearInterval(timer)
    }else{
      $('body').attr('class', 'game-over'+i);
      i++;
    }

}, 500)

    $('#level-title').html('Game Over! Press Any Key to Restart 😅').css("font-size", "2rem");
    $(document).keydown(() => {
      startOver();
    })

  }
}


function startOver(){
   location.reload();
}
