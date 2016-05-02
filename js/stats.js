'use strict';

var welcomeContainer = document.getElementById('Welcome-Container');
var saveUserName = document.getElementById('saveUserName');
var logIn = document.getElementById('Log-In');
var pointsContainer = document.getElementById('Points-Container');
var graphContainer = document.getElementById('Graph-Container');
var changeUser = document.getElementById('Change-User');
var welcome = document.createElement('h3');

var userArray = [];

function User(userName) {
  this.userName = userName;
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
  logIn.style.display ='none';
  var newUser = new User(userNameValue);
  userArray.push(newUser);
  event.target.newUserName.value = null;
}

saveUserName.addEventListener('submit', handleCreateUser);
changeUser.addEventListener('click', handleChangeUsers);
