'use strict';

var headerArray = [' Name ', ' ABV ', ' Type ', ' Written Notes ', ' Score (out of 10) '];
var value = ['name', 'abv', 'type', 'writtenNotes', 'score', ''];

//global vars for core data
var currentUser;

Addbeer.beerDrink = [];
Addwine.wineDrink = [];

var beerTypes = ['Lager', 'Ale', 'IPA', 'Pilsner', 'Witbier', 'Stout', 'Pale Ale', 'Porter', 'Brown', 'Red', 'Belgian'];
var wineTypes = ['Chardonnay', 'Riesling', 'Pinot Grigio', 'Sauvignon Blanc', 'Cabernet Sauvignon', 'Pinot Noir', 'Syrah', 'Zinfandel', 'Malbec', 'Merlot'];

//html element vars
var htmlBody = document.getElementById('body');
var loginForm = document.getElementById('login');
var loginContainer = document.getElementById('loginForm');
var loginChildren = loginContainer.getElementsByTagName('*');
var logoutButton = document.getElementById('logout');
var welcome = document.getElementById('welcome');
var welcomeMsg = document.getElementById('welcomeMsg');
var htmlDarken = document.getElementById('darken');

/*
provide the ID of the <select> element and the array of options to populate to that <select> element
arguments: <select> node id, array of strings
1.clear all <option> off the <select> tag
2.create an <option> for each element in 'optionArray' (value and name)
*/
function dropdownOptions(selectID, optionArray){
  var selectTag = document.getElementById(selectID);
  selectTag.options.length = 0;
  let defaultOption = document.createElement('option');
  defaultOption.innerText = 'Beverage Varietal...';
  defaultOption.value = '';
  selectTag.appendChild(defaultOption);

  for(var optioni = 0; optioni < optionArray.length; optioni++){
    let option = document.createElement('option');
    option.innerText = optionArray[optioni];
    option.value = optionArray[optioni];
    selectTag.appendChild(option);
  }
}

//beer constructor
function Addbeer(name, abv, type, writtenNotes, score) {
  this.name = name;
  this.abv = parseFloat(abv);
  this.type = type;
  this.writtenNotes = writtenNotes;
  this.score = parseFloat(score);

  //push to local array
  Addbeer.beerDrink.push(this);
}

//wine constructor
function Addwine(name, abv, type, writtenNotes, score) {
  this.name = name;
  this.abv = parseFloat(abv);
  this.type = type;
  this.writtenNotes = writtenNotes;
  this.score = parseFloat(score);

  //push to local array
  Addwine.wineDrink.push(this);
}

//constructor for user
function User(name, over21) {
  this.name = name;
  this.over21 = over21;
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

//get wine from LS
function getStorageWine() {
  var productData = localStorage.getItem('wineData');
  var parsedData = JSON.parse(productData);
  Addwine.wineDrink = 0;

  for (var i = 0; i < parsedData.length; i++) {
    new Addwine(parsedData[i].name, parseFloat(parsedData[i].abv), parsedData[i].type, parsedData[i].writtenNotes, parseFloat(parsedData[i].score));
  }
}

//get beer from LS
function getStorageBeer() {
  var productData = localStorage.getItem('beerData');
  var parsedData = JSON.parse(productData);
  Addbeer.beerDrink = [];

  for (var i = 0; i < parsedData.length; i++) {
    new Addbeer(parsedData[i].name, parseFloat(parsedData[i].abv), parsedData[i].type, parsedData[i].writtenNotes, parseFloat(parsedData[i].score));
  }
}

//get user from LS
function getStorageUser() {
  var currentUserString = localStorage.getItem('user');
  var parsedCurrentUser = JSON.parse(currentUserString);
  currentUser = parsedCurrentUser;
  return parsedCurrentUser;
}

//global getStorage
function getStorage() {
  getStorageWine();
  getStorageBeer();
  getStorageUser();
}

var drinkHeader = document.getElementById('table-head');
var drinkBody = document.getElementById('table-body');

var createHeader = function () {
  for (var x = 0; x < headerArray.length; x++) {
    var categories = document.createElement('th');
    categories.textContent = headerArray[x];
    drinkHeader.appendChild(categories);
  }
};
//Need to create seperate tr function;

Addbeer.prototype.tableRow = function(){

  var tableRow = document.createElement('tr');
  drinkBody.appendChild(tableRow);
  tableRow.id = this.name;

  this.rowData();
};

Addbeer.prototype.rowData = function () {

  for (var i = 0; i < headerArray.length; i++) {
    var userDrinkData = document.createElement('td');
    userDrinkData.textContent = this[value[i]];

    var row = document.getElementById(this.name);
    row.appendChild(userDrinkData);
  }
  var deleteButton = document.createElement('button');
  deleteButton.className = 'deleteButton';
  deleteButton.setAttribute('bevName', this.name);
  row.appendChild(deleteButton);
  deleteListener();
};


for (var i = 0; i < Addbeer.beerDrink.length; i++) {
  Addbeer.beerDrink[i].tableRow();
}


//event listener for add beer
function handleAddWine(event) {

  event.preventDefault();
  var name = event.target.name.value;
  var abv = (event.target.abv.value);
  var type = (event.target.type.value);
  var writtenNotes = (event.target.writtenNotes.value);
  var score = parseInt(event.target.score.value);

  var newWine = new Addwine(name, abv, type, writtenNotes, score);

  newWine.tableRow();
  updateStorageWine();
}

//event listener for add beer

//Event for Delete Button
function deleteListener() {
  var deleteButton = document.getElementsByClassName('deleteButton');
  for(var x = 0; x < deleteButton.length; x++){

    deleteButton[x].addEventListener('click', handleDelete);
  }
}

function handleDelete(event){
  event.preventDefault();
  var deleteRow = event.target.getAttribute('bevName');
  document.getElementById(deleteRow).remove();

  for(var n = 0; n < Addbeer.beerDrink.length; n++){
    if(Addbeer.beerDrink[n].name === deleteRow){
      Addbeer.beerDrink.splice(n, 1);
      updateStorageBeer();
    }
  }
}
//event listener for add drink
function handleAddBeer(event) {

  event.preventDefault();
  var name = event.target.name.value;
  var abv = (event.target.abv.value);
  var type = (event.target.type.value);
  var writtenNotes = (event.target.writtenNotes.value);
  var score = parseInt(event.target.score.value);

  var newBeer = new Addbeer(name, abv, type, writtenNotes, score);

  newBeer.tableRow();
  updateStorageBeer();
}

// Button for add drink
var addNewBeerDrink = document.getElementById('beer-drink');
addNewBeerDrink.addEventListener('submit', handleAddBeer);
var addNewWineDrink = document.getElementById('wine-drink');
addNewWineDrink.addEventListener('submit', handleAddWine);


function showWelcome() {
  loginContainer.setAttribute('style', 'display: none');
  for(var i=0; i<loginChildren.length; i++) {
    loginChildren[i].setAttribute('style', 'display: none');
  }
  htmlDarken.setAttribute('style', 'display: none');
  welcome.setAttribute('style', 'display: inline-block');
  htmlBody.setAttribute('style', 'height: auto; overflow: scroll');
  welcomeMsg.textContent = `Welcome, ${currentUser.name}`;
}

function showLogin() {
  loginContainer.setAttribute('style', 'display: fixed');
  for(var i=0; i<loginChildren.length; i++) {
    loginChildren[i].setAttribute('style', '');
  }
  htmlDarken.setAttribute('style', 'display: block');
  welcome.setAttribute('style', 'display: none');
  htmlBody.setAttribute('style', 'height: 100vh; overflow: hidden');
  welcomeMsg.textContent = '';
}

//event listener for login
function handleLogin(event) {
  event.preventDefault();
  var usernameInput = event.target.username.value;
  console.log(`User logging in as ${usernameInput}...`);
  if (event.target.ageCheck.checked === true) {
    if (usernameInput !== getStorageUser()) {
      currentUser = new User(usernameInput, true);
    }
    console.log(`${currentUser.name} logged in`);
    updateStorage();
    event.target.username.value = null;
    event.target.ageCheck.checked = false;
    showWelcome();
  } else {
    console.log('Login failed, user is underage!');
  }
}

function handleLogout(event) {
  event.preventDefault();
  console.log(`${currentUser.name} logged out`);
  localStorage.clear();
  showLogin();
}


function toggleForm(event) {
  var formChoose = event.target.id;
  console.log(formChoose);
  if(formChoose === 'beerToggleButton'){
    dropdownOptions('beer-selector', beerTypes);
    document.getElementById('wine-drink').setAttribute('style','display:none');
    document.getElementById('beer-drink').setAttribute('style','display:block');
  }else if (formChoose === 'wineToggleButton'){
    dropdownOptions('wine-selector', wineTypes);
    document.getElementById('beer-drink').setAttribute('style','display:none');
    document.getElementById('wine-drink').setAttribute('style','display:block');
  }

}

function checkLogin() {
  if(getStorageUser()) {
    getStorageUser();
    showWelcome();
  } else {
    showLogin();
  }
}

createHeader();
checkLogin();

//adding event listeners for login/logout
loginForm.addEventListener('submit', handleLogin);
logoutButton.addEventListener('click', handleLogout);

if(window.location.href === "http://127.0.0.1:5500/index.html" ||
   window.location.href === "https://drinkadvisor.github.io/drink_advisor/index.html" ||
   window.location.href === "https://drinkadvisor.github.io/drink_advisor"){
  document.getElementById('beerToggleButton').addEventListener('click', toggleForm);
  document.getElementById('wineToggleButton').addEventListener('click', toggleForm);
}
