'use strict';

var welcomeContainer = document.getElementById('Welcome-Container');
var saveUserName = document.getElementById('saveUserName');
var logIn = document.getElementById('Log-In');
var pointsContainer = document.getElementById('Points-Container');
var graphContainer = document.getElementById('Graph-Container');
var changeUser = document.getElementById('Change-User');
var welcome = document.createElement('h3');

var userArray = [];
var gameArray = [];
var hardScores = [];
var mediumScores = [];
var easyScores = [];

function User(userName) {
  this.userName = userName;
  // this.scores = [];
  // this.difficulties = [];
}

function Game(user, score, difficulty){
  this.user = user;
  this.score = score;
  this.difficulty = difficulty;
}

function handleChangeUsers(event) {
  welcomeContainer.removeChild(welcome);
  welcomeContainer.style.display = 'none';
  graphContainer.style.display = 'none';
  pointsContainer.style.display = 'none';
  logIn.style.display = 'block';
}

function handleCreateUser(event) {
  event.preventDefault();
  var userNameValue = event.target.newUserName.value;
  welcome.textContent = 'Welcome ' + userNameValue;
  welcomeContainer.appendChild(welcome);
  welcomeContainer.style.display = 'flex';
  pointsContainer.style.display = 'flex';
  graphContainer.style.display = 'flex';
  logIn.style.display = 'none';
  var newUser = new User(userNameValue);
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  userArray.push(newUser);
  event.target.newUserName.value = null;
}

// Iffy to check local storage for game data
(function checkLocal() {
  if(localStorage.getItem('gameArray')) {
    console.log('Local storage for game array exists');
    var parsedGameArray = JSON.parse(localStorage.getItem('gameArray'));
    gameArray = parsedGameArray;
  } else {
    console.log('Local storage does not exist for game Array')
  }
  if(localStorage.getItem('currentUser')) {
    console.log('Local storage exists for current user');
    var parsedUser = JSON.parse(localStorage.getItem('currentUser'));
    welcome.textContent = 'Welcome ' + parsedUser.userName;
    welcomeContainer.appendChild(welcome);
    welcomeContainer.style.display = 'flex';
    pointsContainer.style.display = 'flex';
    graphContainer.style.display = 'flex';
    logIn.style.display = 'none';
  } else {
    console.log('local storage does not exist for current User');
  }
})();

saveUserName.addEventListener('submit', handleCreateUser);
changeUser.addEventListener('click', handleChangeUsers);
