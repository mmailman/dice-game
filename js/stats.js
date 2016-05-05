'use strict';

var welcomeContainer = document.getElementById('Welcome-Container');
var saveUserName = document.getElementById('saveUserName');
var logIn = document.getElementById('Log-In');
var pointsContainer = document.getElementById('Points-Container');
var graphContainer = document.getElementById('Graph-Container');
var changeUser = document.getElementById('Change-User');
var welcome = document.createElement('h3');
var easyParent = document.getElementById('easy-table');
var mediumParent = document.getElementById('medium-table');
var hardParent = document.getElementById('hard-table');

var gameArray = [];
var hardScores = [];
var mediumScores = [];
var easyScores = [];
var easyTopScores = [];
var easyTopNames = [];
var mediumTopScores = [];
var mediumTopNames = [];
var hardTopScores = [];
var hardTopNames = [];

function User(userName) {
  this.userName = userName;
}

function resetHighScores() {
  gameArray = [];
  easyScores = [];
  mediumScores = [];
  hardScores = [];
  easyTopScores = [];
  easyTopNames = [];
  mediumTopScores = [];
  mediumTopNames = [];
  hardTopNames = [];
  hardTopScores = [];
  var easyChildren = easyParent.children;
  var mediumChildren = mediumParent.children;
  var hardChildren = hardParent.children;
  while(hardChildren.length > 1) {
    hardParent.removeChild(hardParent.lastChild);
  }
  while(mediumChildren.length > 1) {
    mediumParent.removeChild(mediumParent.lastChild);
  }
  while(easyChildren.length > 1) {
    easyParent.removeChild(easyParent.lastChild);
  }
  localStorage.setItem('gameArray', JSON.stringify(gameArray));
  renderCharts();
}

function displayWelcome() {
  welcomeContainer.appendChild(welcome);
  welcomeContainer.style.display = 'flex';
  pointsContainer.style.display = 'flex';
  logIn.style.display = 'none';
}

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

function updateTable(array, parent) {
  for (var i = 0; i < 3; i++) {
    if (array[i]) {
      var row = document.createElement('tr');
      var dataName = document.createElement('td');
      var dataScore = document.createElement('td');
      dataName.textContent = array[i].userName;
      dataScore.textContent = array[i].score;
      row.appendChild(dataName);
      row.appendChild(dataScore);
      parent.appendChild(row);
    }
  }
}

function populateScoreTable() {
  sortGameArray();
  sortByScore(easyScores);
  sortByScore(mediumScores);
  sortByScore(hardScores);

  updateTable(easyScores, easyParent);
  updateTable(mediumScores, mediumParent);
  updateTable(hardScores, hardParent);
}

function renderCharts() {
  var canvasElEasy = document.getElementById('easy-canvas').getContext('2d');
  var canvasElMedium = document.getElementById('medium-canvas').getContext('2d');
  var canvasElHard = document.getElementById('hard-canvas').getContext('2d');
  for (var i = 0; i < 3; i++) {
    if(easyScores[i]) {
      easyTopScores.push(easyScores[i].score);
      easyTopNames.push(easyScores[i].userName);
    }
    if(mediumScores[i]) {
      mediumTopScores.push(mediumScores[i].score);
      mediumTopNames.push(mediumScores[i].userName);
    }
    if(hardScores[i]) {
      hardTopScores.push(hardScores[i].score);
      hardTopNames.push(hardScores[i].userName);
    }
  };
  var easyData = {
    labels: easyTopNames,
    datasets: [{label: 'Score', backgroundColor: 'green', borderColor: 'black', borderWidth: 2, data: easyTopScores}]
  };

  var mediumData = {
    labels: mediumTopNames,
    datasets: [{label: 'Score', backgroundColor: 'rgb(83, 222, 176)', borderColor: 'black', borderWidth: 2, data: mediumTopScores}]
  };

  var hardData = {
    labels: hardTopNames,
    datasets: [{label: 'Score', backgroundColor: 'rgb(88, 186, 35)', borderColor: 'black', borderWidth: 2, data: hardTopScores}]
  };
  var easyChart = new Chart(canvasElEasy, {
    type: 'bar',
    data: easyData,
    options: {
      title:{
        text: 'Easy High Scores',
        display: true
      },
      responsive: false,
      scales: {
        yAxes: [{
          type: 'linear',
          ticks: {
            beginAtZero:true,
            stepSize: 1
          }
        }]
      }
    }
  });
  var mediumChart = new Chart(canvasElMedium, {
    type: 'bar',
    data: mediumData,
    options: {
      title:{
        text:'Medium High Scores',
        display: true,
      },
      responsive: false,
      scales: {
        yAxes: [{
          type: 'linear',
          ticks: {
            beginAtZero:true,
            stepSize: 1
          }
        }]
      }
    }
  });
  var hardChart = new Chart(canvasElHard, {
    type: 'bar',
    data: hardData,
    options: {
      title:{
        text: 'Hard High Scores',
        display : true,
      },
      responsive: false,
      scales: {
        yAxes: [{
          type: 'linear',
          ticks: {
            beginAtZero:true,
            stepSize: 1
          }
        }]
      }
    }
  });
}

function handleChangeUsers(event) {
  welcomeContainer.removeChild(welcome);
  welcomeContainer.style.display = 'none';
  graphContainer.style.display = 'none';
  pointsContainer.style.display = 'none';
  logIn.style.display = 'block';
  document.getElementById('footer').style.display = 'none';
}

function handleCreateUser(event) {
  event.preventDefault();
  var userNameValue = event.target.newUserName.value;
  welcome.textContent = 'Welcome, ' + userNameValue;
  displayWelcome();
  var newUser = new User(userNameValue);
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  event.target.newUserName.value = null;
  document.getElementById('footer').style.display = 'flex';
}

function handleToggle(event){
  if(event.target.id === 'Toggle-Chart'){
    pointsContainer.style.display = 'none';
    graphContainer.style.display = 'flex';
  } else if(event.target.id === 'Toggle-Table'){
    graphContainer.style.display = 'none';
    pointsContainer.style.display = 'flex';
  }
}

// Iffy to check local storage for game data
(function checkLocal() {
  if(localStorage.getItem('gameArray')) {
    console.log('Local storage for game array exists');
    var parsedGameArray = JSON.parse(localStorage.getItem('gameArray'));
    gameArray = parsedGameArray;
    populateScoreTable();
    renderCharts();
  } else {
    console.log('Local storage does not exist for game Array');
  }

  if(localStorage.getItem('currentUser')) {
    console.log('Local storage exists for current user');
    var parsedUser = JSON.parse(localStorage.getItem('currentUser'));
    welcome.textContent = 'Welcome, ' + parsedUser.userName;
    displayWelcome();
  } else {
    console.log('local storage does not exist for current User');
    document.getElementById('footer').style.display = 'none';
  }
})();
document.getElementById('Reset-Scores').addEventListener('submit', resetHighScores);
saveUserName.addEventListener('submit', handleCreateUser);
changeUser.addEventListener('click', handleChangeUsers);

document.getElementById('Toggle-Chart').addEventListener('click', handleToggle);
document.getElementById('Toggle-Table').addEventListener('click', handleToggle);
