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
    populateScoreTable();
  } else {
    console.log('Local storage does not exist for game Array');
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

//sorts gameArray into three separate arrays by difficulty
function sortGameArray() {
  for (var i = 0; i < gameArray.length; i++) {
    if (gameArray[i].difficulty === 'easy') {
      easyScores.push(gameArray[i]);
    } else if (gameArray[i].difficulty === 'medium') {
      mediumScores.push(gameArray[i]);
    } else {
      hardScores.push(gameArray[i]);
    }
  }
}

function sortByScore(array) {
  array.sort(function(a,b) {
    return b.score - a.score;
  });
}

function populateScoreTable() {
  sortGameArray();
  sortByScore(easyScores);
  sortByScore(mediumScores);
  sortByScore(hardScores);
  for (var i = 0; i < 3; i++) {
    if (easyScores[i]) {
      var easyRow = document.createElement('tr');
      var easyDataName = document.createElement('td');
      easyDataName.textContent = easyScores[i].userName;
      var easyDataScore = document.createElement('td');
      easyDataScore.textContent = easyScores[i].score;
      var easyParent = document.getElementById('easy-table');
      easyParent.appendChild(easyRow);
      easyRow.appendChild(easyDataName);
      easyRow.appendChild(easyDataScore);
    };

    if (mediumScores[i]) {
      var mediumRow = document.createElement('tr');
      var mediumDataName = document.createElement('td');
      mediumDataName.textContent = mediumScores[i].userName;
      var mediumDataScore = document.createElement('td');
      mediumDataScore.textContent = mediumScores[i].score;
      var mediumParent = document.getElementById('medium-table');
      mediumParent.appendChild(mediumRow);
      mediumRow.appendChild(mediumDataName);
      mediumRow.appendChild(mediumDataScore);
    };

    if (hardScores[i]) {
      var hardRow = document.createElement('tr');
      var hardDataName = document.createElement('td');
      hardDataName.textContent = hardScores[i].userName;
      var hardDataScore = document.createElement('td');
      hardDataScore.textContent = hardScores[i].score;
      var hardParent = document.getElementById('hard-table');
      hardParent.appendChild(hardRow);
      hardRow.appendChild(hardDataName);
      hardRow.appendChild(hardDataScore);
    };
  }
}

var easyTopScores = [];
var mediumTopScores = [];
var hardTopScores = [];
function renderCharts() {
  var canvasElEasy = document.getElementById('easy-canvas').getContext('2d');
  var canvasElMedium = document.getElementById('medium-canvas').getContext('2d');
  var canvasElHard = document.getElementById('hard-canvas').getContext('2d');
  // var difficultyLabel = ['Easy', 'Medium', 'Hard'];
  for (var i = 0; i < 3; i++) {
    // easyTopScores.push(easyScores[i].score);
    mediumTopScores.push(mediumScores[i].score);
    // hardTopScores.push(hardScores[i].score);
    easyTopScores.push(mediumScores[i].userName);
  };
  var mediumData = {
    labels: easyTopScores,
    datasets: [{label: 'Score', backgroundColor: 'blue', borderColor: 'black', borderWidth: 2, data: mediumTopScores}]
  };
  var mediumChart = new Chart(canvasElMedium, {
    type: 'bar',
    data: mediumData
  });
}
