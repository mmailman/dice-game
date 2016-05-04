'use strict';

//Dice type arrays
var orangeDiceArray = [];
var blueDiceArray = [];
var grayDiceArray = [];
var maxRounds = 0;
var roundCount = 0;
var maxMauls = 5;
var photosToWin = 0;
var mauledFlag = false;
var scoreArray = [];
var totalScore = 0;
var scoreStorage = [];
var difficultyStorage = [];
var updateUser = new User();

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
  var dieTitleContainer = document.getElementById('Die-Title');
  for(var die = 0; die < 4; die++){
    orangeDiceArray[die].roll();
    blueDiceArray[die].roll();
    grayDiceArray[die].roll();
  }
  if(dieTitleContainer.children[1]){
    dieTitleContainer.removeChild(dieTitleContainer.children[1]);
    document.getElementById('Keep-Rolling').disabled = false;
  }
  //call to render images to page
  renderDice();
  countMaul();
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

//function to determine if player has been mauled.
function countMaul() {
  var clawCounter = 0;
  for(var die = 0; die < 4; die++) {
    if(orangeDiceArray[die].lastRoll === 'claw.png') {
      clawCounter++;
    }
    if(grayDiceArray[die].lastRoll === 'claw.png') {
      clawCounter++;
    }
    if(blueDiceArray[die].lastRoll === 'claw.png') {
      clawCounter++;
    }
  }
  if(clawCounter >= maxMauls) {
    var maulMessage = document.createElement('p');
    maulMessage.textContent = 'You\'ve been mauled by Sasquatch. Click End Turn to continue.';
    document.getElementById('Die-Title').appendChild(maulMessage);
    document.getElementById('Keep-Rolling').disabled = true;
    mauledFlag = true;
  }
}

//function to count cameras
function countCamera(){
  var cameraCounter = 0;
  for(var die = 0; die < 4; die++){
    if(orangeDiceArray[die].lastRoll === 'camera.png'){
      cameraCounter++;
    }
    if(grayDiceArray[die].lastRoll === 'camera.png'){
      cameraCounter++;
    }
    if(blueDiceArray[die].lastRoll === 'camera.png'){
      cameraCounter++;
    }
  }
  scoreArray.push(cameraCounter);
}

//Generating a total score from scoreArray
function checkScore(){
  totalScore = 0;
  for(var i = 0; i < scoreArray.length; i++){
    totalScore += scoreArray[i];
  }
}

//function to render the score status in status board
function renderScore(){
  var getStatusDiv = document.getElementById('Render-Zone');
  getStatusDiv.innerHTML = null;
  var roundsRemaining = maxRounds - roundCount;
  checkScore();
  var postRounds = document.createElement('p');
  postRounds.textContent = 'You have ' + roundsRemaining + ' rounds left.';
  var postCurrentScore = document.createElement('p');
  postCurrentScore.textContent = 'Your current score is: ' + totalScore;
  var postScoreToWin = document.createElement('p');
  postScoreToWin.textContent = 'Score needed to win: ' + photosToWin;
  postCurrentScore.id = 'scoreText';
  getStatusDiv.appendChild(postRounds);
  getStatusDiv.appendChild(postCurrentScore);
  getStatusDiv.appendChild(postScoreToWin);
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
  countMaul();
}

//function that handles difficulty Selection and Game Start
function handleDifficulty(event) {
  roundCount = 0;
  scoreArray = [];
  var getStatusDiv = document.getElementById('Render-Zone');
  getStatusDiv.innerHTML = null;
  var clearImageAnimation = document.getElementById('imageAnimation');
  clearImageAnimation.innerHTML = null;
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
  document.getElementById('End-Turn').disabled = false;
  document.getElementById('Keep-Rolling').disabled = false;
  startRound();
}

//function that handles End-Turn
function handleEndTurn(){
  roundCount++;
  if(mauledFlag !== true){
    countCamera();
    //call the status board render function.
  } else {
    scoreArray.push(0);
    mauledFlag = false;
  }
  // checkScore();
  renderScore();
  if(roundCount < maxRounds && totalScore < photosToWin){
    startRound();
  } else if(totalScore >= photosToWin){
    document.getElementById('End-Turn').disabled = true;
    document.getElementById('Keep-Rolling').disabled = true;
    document.getElementById('scoreText').style.color = 'green';
    var winText = document.createElement('p');
    winText.textContent = 'Congratualations, you\'ve solved the mystery of Sasquatch!';
    document.getElementById('imageAnimation').appendChild(winText);
    var winningGif = document.createElement('img');
    winningGif.src = '../images/sasquatchGif.gif';
    document.getElementById('imageAnimation').appendChild(winningGif);
    var difficultyForm = document.getElementsByClassName('difficulty-submission');
    for (var i = 0; i < difficultyForm.length; i++) {
      difficultyForm[i].disabled = false;
    }
    updateUser.scores.push(scoreArray);
    updateUser.difficulties.push(document.getElementById('select-difficulty').value);
    localStorage.setItem('currentUser', JSON.stringify(updateUser));
  } else{
    document.getElementById('End-Turn').disabled = true;
    document.getElementById('Keep-Rolling').disabled = true;
    document.getElementById('scoreText').style.color = 'red';
    var loseText = document.createElement('p');
    loseText.textContent = 'Sorry, you\'ve been mauled to death. Please seek medical attention and try again later!';
    document.getElementById('imageAnimation').appendChild(loseText);
    var difficultyForm = document.getElementsByClassName('difficulty-submission');
    for (var i = 0; i < difficultyForm.length; i++) {
      difficultyForm[i].disabled = false;
    }
    updateUser.scores.push(scoreArray);
    updateUser.difficulties.push(document.getElementById('select-difficulty').value);
    localStorage.setItem('currentUser', JSON.stringify(updateUser));
  }
}

function User() {
  this.userName = '';
  this.scores = [];
  this.difficulties = [];
}

// Iffy to check local storage for game data
(function checkLocal() {
  if(localStorage.getItem('currentUser')) {
    console.log('Local storage exists for current user');
    var parsedUser = JSON.parse(localStorage.getItem('currentUser'));
    updateUser.userName = parsedUser.userName;
    updateUser.scores = parsedUser.scores;
    updateUser.difficulties = parsedUser.difficulties;
  } else {
    console.log('local storage does not exist');
  }
})();

//adds event listener to submit button to choose difficulty
document.getElementById('difficulty').addEventListener('submit', handleDifficulty);

//adds event listener to Keep-Rolling button
document.getElementById('Keep-Rolling').addEventListener('click', handleKeepRolling);

//adds event listener to End-Turn button
document.getElementById('End-Turn').addEventListener('click', handleEndTurn);
