'use strict';

//Generic die constructor
function Die(maul, photo, footprint) {
  this.maul = maul;
  this.photo = photo;
  this.footprint = footprint;
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
  console.log(random);
  if (random === 1 || random === 2 || random === 3) {
    return 'bad';
  } else if (random === 4) {
    return 'good';
  } else {
    return 'neutral';
  }
};
//Roll method for the blue dice
Blue.prototype.roll = function() {
  var random = this.randomNumber();
  console.log(random);
  if (random === 1) {
    return 'bad';
  } else if (random === 2 || random === 3 || random === 4) {
    return 'good';
  } else {
    return 'neutral';
  }
};
//Roll method for the gray dice
Gray.prototype.roll = function() {
  var random = this.randomNumber();
  console.log(random);
  if (random === 1 || random === 2) {
    return 'bad';
  } else if (random === 3 || random === 4) {
    return 'good';
  } else {
    return 'netural';
  }
};
