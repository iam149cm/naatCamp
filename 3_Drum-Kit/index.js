<<<<<<< HEAD
// Detecting KeyBoard Press
document.addEventListener("keydown", function(event){
      makeSound(event.key);
      buttonAnimation(event.key);
  });

// Detecting Button Press
var numOfDrumBtns = document.querySelectorAll(".drum").length;
for (var i=0; i<numOfDrumBtns; i++){
  // 익명함수
  document.querySelectorAll(".drum")[i].addEventListener("click", function(){
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
}


/* function */

function makeSound(key){

  switch (key) {
    case "w":
      var tom1 = new Audio('sounds/tom-1.mp3');
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio('sounds/tom-2.mp3');
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio('sounds/tom-3.mp3');
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio('sounds/tom-4.mp3');
      tom4.play();
      break;

    case "j":
      var tom2 = new Audio('sounds/snare.mp3');
      tom2.play();
      break;

    case "k":
      var tom2 = new Audio('sounds/crash.mp3');
      tom2.play();
      break;

    case "l":
      var tom2 = new Audio('sounds/kick-bass.mp3');
      tom2.play();
      break;

    // else
    default: console.log(key);

  }
}


function buttonAnimation(currentKey) {
  var activeBtn = document.querySelector("."+currentKey);
  activeBtn.classList.add("pressed");

  // timeout function
  setTimeout(function(){
    activeBtn.classList.remove("pressed");
  }, 100);

}
=======
// Detecting KeyBoard Press
document.addEventListener("keydown", function(event){
      makeSound(event.key);
      buttonAnimation(event.key);
  });

// Detecting Button Press
var numOfDrumBtns = document.querySelectorAll(".drum").length;
for (var i=0; i<numOfDrumBtns; i++){
  // 익명함수
  document.querySelectorAll(".drum")[i].addEventListener("click", function(){
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
}


/* function */

function makeSound(key){

  switch (key) {
    case "w":
      var tom1 = new Audio('sounds/tom-1.mp3');
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio('sounds/tom-2.mp3');
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio('sounds/tom-3.mp3');
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio('sounds/tom-4.mp3');
      tom4.play();
      break;

    case "j":
      var tom2 = new Audio('sounds/snare.mp3');
      tom2.play();
      break;

    case "k":
      var tom2 = new Audio('sounds/crash.mp3');
      tom2.play();
      break;

    case "l":
      var tom2 = new Audio('sounds/kick-bass.mp3');
      tom2.play();
      break;

    // else
    default: console.log(key);

  }
}


function buttonAnimation(currentKey) {
  var activeBtn = document.querySelector("."+currentKey);
  activeBtn.classList.add("pressed");

  // timeout function
  setTimeout(function(){
    activeBtn.classList.remove("pressed");
  }, 100);

}
>>>>>>> 11c9ee03571c0f81c3d11fb251873e99ad5bb7be
