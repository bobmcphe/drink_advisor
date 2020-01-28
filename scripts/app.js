'use strict';

console.log('Hello World!');

//global vars for core data
var currentUser;
Addbeer.beerDrink = [];
Addwine.wineDrink = [];

//beer constructor
function Addbeer(name, abv, type, writtenNotes, score) {
  this.name = name;
  this.abv = abv;
  this.type = type;
  this.writtenNotes = writtenNotes;
  this.score = score;
  //push to local array
  Addbeer.beerDrink.push(this);
}

//wine constructor
function Addwine(name, abv, type, writtenNotes, score) {
  this.name = name;
  this.abv = abv;
  this.type = type;
  this.writtenNotes = writtenNotes;
  this.score = score;
  //push to local array
  Addwine.wineDrink.push(this);
}

//constructor for user
function User(name, age) {
  this.name = name;
  this.age = age;
}

//store wine in LS
function updateStorageWine() {
  var arrayString = JSON.stringify(Addwine.wineDrink);
  localStorage.setItem('wineData', arrayString);
}

//store beer in LS
function updateStorageBeer() {
  var beerString = JSON.stringify(Addbeer.beerDrink);
  localStorage.setItem('beerData', beerString);
}

//store user in LS
function updateStorageUser() {
  var currentUserString = JSON.stringify(currentUser);
  localStorage.setItem('user', currentUserString);
}

//global updateStorage
function updateStorage() {
  updateStorageWine();
  updateStorageBeer();
  updateStorageUser();
}

//get wine from local storage
function getStorageWine(){
  var productData = localStorage.getItem('wineData');
  var parsedData = JSON.parse(productData);
  Addwine.wineDrink = 0;
  for(var i = 0; i < parsedData.length; i++){
    new Addwine(parsedData[i].name, parsedData[i].abv, parsedData[i].type, parsedData[i].writtenNotes, parsedData[i].score);
  }
}

//get beer from local storage
function getStorageBeer(){
  var productData = localStorage.getItem('beerData');
  var parsedData = JSON.parse(productData);
  Addbeer.beerDrink = 0;
  for(var i = 0; i < parsedData.length; i++){
    new Addbeer(parsedData[i].name, parsedData[i].abv, parsedData[i].type, parsedData[i].writtenNotes, parsedData[i].score);
  }
}

//get user from LS
function getStorageUser() {
  var currentUser = localStorage.getItem('user');
  var parsedCurrentUser = JSON.parse(currentUser);
  return parsedCurrentUser;
}

//global getStorage
function getStorage() {
  getStorageWine();
  getStorageBeer();
  getStorageUser();
}

//hide login
function hideLogin() {
  var loginForm = document.getElementById('login');
  loginForm.setAttribute('style', 'display: none');
}

//event listener for login
function handleLogin(event) {
  event.preventDefault();
  var username = event.target.username.value;
  console.log(`User signed in as ${username}`);
  if (username !== getUser()) {
    currentUser = new User(username, 999);
  }
  updateStorage();
  hideLogin();
}

//add event listener to login
var loginForm = document.getElementById('login');

//test block
var x = new Addbeer('corona', '5%', 'lager', 'I mean its beer with lime usually', '2.5');
console.log(x);
console.log(Addbeer.beerDrink);

//adding event listener for login
loginForm.addEventListener('submit', handleLogin);

//util to clear storage
function clearStorage() {
  localStorage.clear();
}
