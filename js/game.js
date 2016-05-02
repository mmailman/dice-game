'use strict';

//Dice type arrays
var orangeDiceArray = [];
var blueDiceArray = [];
var grayDiceArray = [];
var maxRounds = 0;
var roundCount = 0;
var maxMauls = 5;
var photosToWin = 0;

//Generic die constructor
function Die(maul, photo, footprint) {
  this.maul = maul;
  this.photo = photo;
  this.footprint = footprint;
  this.lastRoll = '';
}

//Method for generating random number
Die.prototype.randomNumber = function() {
  var baseNumber = Math.floor(Math.random() * (6) + 1);
  return baseNumber;
};

//Orange die constructor (hardest)
function Orange() {}
Orange.prototype = new Die(3,1,2);
//Blue die constructor (easiest)
function Blue() {}
Blue.prototype = new Die(1,3,2);
//Gray die constructor (medium)
function Gray() {}
Gray.prototype = new Die(2,2,2);

//Roll method for the orange dice
Orange.prototype.roll = function() {
  var random = this.randomNumber();
  var result = '';
  console.log(random);
  if (random === 1 || random === 2 || random === 3) {
    result = 'claw.png';
  } else if (random === 4) {
    result = 'camera.png';
  } else {
    result = 'tracks.jpg';
  }
  this.lastRoll = result;
};
//Roll method for the blue dice
Blue.prototype.roll = function() {
  var random = this.randomNumber();
  var result = '';
  console.log(random);
  if (random === 1) {
    result = 'claw.png';
  } else if (random === 2 || random === 3 || random === 4) {
    result = 'camera.png';
  } else {
    result = 'tracks.jpg';
  }
  this.lastRoll = result;
};
//Roll method for the gray dice
Gray.prototype.roll = function() {
  var random = this.randomNumber();
  var result = '';
  console.log(random);
  if (random === 1 || random === 2) {
    result = 'claw.png';
  } else if (random === 3 || random === 4) {
    result = 'camera.png';
  } else {
    result = 'tracks.jpg';
  }
  this.lastRoll = result;
};

//iffy to populate the dice arrays on page load
(function populateDieArrays(){
  for(var die = 0; die < 4; die++){
    var orange = new Orange();
    var blue = new Blue();
    var gray = new Gray();

    orangeDiceArray.push(orange);
    blueDiceArray.push(blue);
    grayDiceArray.push(gray);
  }
})();

//does the initial roll for a round.
function startRound(){
  for(var die = 0; die < 4; die++){
    orangeDiceArray[die].roll();
    blueDiceArray[die].roll();
    grayDiceArray[die].roll();
  }
  //call to render images to page
  renderDice();
}

//renders the dice pool
function renderDice(){
  var orangeWrapper = document.getElementById('orange-dice');
  var grayWrapper = document.getElementById('gray-dice');
  var blueWrapper = document.getElementById('blue-dice');

  orangeWrapper.innerHTML = null;
  grayWrapper.innerHTML = null;
  blueWrapper.innerHTML = null;

  for(var die = 0; die < 4; die++){
    var orangeDie = document.createElement('img');
    var grayDie = document.createElement('img');
    var blueDie = document.createElement('img');

    orangeDie.classList.add(orangeDiceArray[die].lastRoll.split('.')[0]);
    grayDie.classList.add(grayDiceArray[die].lastRoll.split('.')[0]);
    blueDie.classList.add(blueDiceArray[die].lastRoll.split('.')[0]);

    orangeDie.src = '../images/' + orangeDiceArray[die].lastRoll;
    grayDie.src = '../images/' + grayDiceArray[die].lastRoll;
    blueDie.src = '../images/' + blueDiceArray[die].lastRoll;

    orangeWrapper.appendChild(orangeDie);
    grayWrapper.appendChild(grayDie);
    blueWrapper.appendChild(blueDie);
  }
}

//function that handles Keep-Rolling event
function handleKeepRolling() {
  for (var die = 0; die < 4; die++) {
    if (orangeDiceArray[die].lastRoll === 'tracks.jpg') {
      orangeDiceArray[die].roll();
    }
    if (grayDiceArray[die].lastRoll === 'tracks.jpg') {
      grayDiceArray[die].roll();
    }
    if (blueDiceArray[die].lastRoll === 'tracks.jpg') {
      blueDiceArray[die].roll();
    }
  }
  renderDice();
}

// var maxRounds = 0;
// var roundCount = 0;
// var maxMauls = 5;
// var photosToWin = 0;
function handleDifficulty(event) {
  event.preventDefault();
  var difficultyForm = document.getElementsByClassName('difficulty-submission');
  for (var i = 0; i < difficultyForm.length; i++) {
    difficultyForm[i].disabled = true;
    // console.log(difficultyForm[i]);
  }
  var difficultyChosen = document.getElementById('select-difficulty').value;
  if (difficultyChosen === 'easy') {
    maxRounds = 3;
    photosToWin = 5;
  } else if (difficultyChosen === 'medium') {
    maxRounds = 3;
    photosToWin = 7;
  } else {
    maxRounds = 2;
    photosToWin = 7;
  }
  startRound();
  document.getElementById('End-Turn').disabled = false;
  document.getElementById('Keep-Rolling').disabled = false;
}

//adds event listener to submit button to choose difficulty
document.getElementById('difficulty').addEventListener('submit', handleDifficulty);

//adds event listener to Keep-Rolling button
document.getElementById('Keep-Rolling').addEventListener('click', handleKeepRolling);
