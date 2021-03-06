/*
arguments: context, bev type array for labels, drink object array
if you want to combine wine/beer then combine the label 
arrays and drink object arrays to pass them in
*/
//this needs more functions to run, just a placeholder
var myChart;

function renderChart(ctx, typeArray, drinkArray){
  if(myChart){
    myChart.destroy();
  }
  document.getElementById("chart-holder-box").setAttribute('style','display:block;');
  var data = {};
  var labels = [];
  var avgScores = [];
  var bgColors = [];
  // var options = {};
  // data.datasets = {};
  // options.legend = {};
  // options.title = {};
  var avgScoresObjects = chartScoreAverage(typeArray, drinkArray);


  for(let i = 0; i < avgScoresObjects.length; i++){
    avgScores.push(avgScoresObjects[i].avg);
    labels.push(avgScoresObjects[i].name);
  }

  for(let x = 0; x < avgScores.length; x++){
    bgColors.push('#3e95cd');
  }

  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: typeArray,
      datasets: [{
        label: 'Average Score',
        data: avgScores,
        backgroundColor: bgColors,
        borderColor: 'black',
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            suggestedMax: 10,
          },
        }],
      },
    },
  });

}

//context of the canvas element
var context = document.getElementById('chartHook');
// Addwine.wineDrink = [];
// Addbeer.beerDrink = [];

var beerTypes = ['Lager', 'Ale', 'IPA', 'Pilsner', 'Witbier', 'Stout', 'Pale Ale', 'Porter', 'Brown', 'Red', 'Belgian'];
var wineTypes = ['Chardonnay', 'Riesling', 'Pinot Grigio', 'Sauvignon Blanc', 'Cabernet Sauvignon', 'Pinot Noir', 'Syrah', 'Zinfandel', 'Malbec', 'Merlot'];

/*
arguments: array of drink types to use as 'labels', array of drink objects
this will create new 'TypeScore' objects that will be populated with the scoring info
from every drink and then averaged before being returned.
This is intended to be used with the renderChart function to populate the chart data
*/
function chartScoreAverage(typeArray, drinkArray){
  var scores = [];

  for(var labelSeed = 0; labelSeed < typeArray.length; labelSeed++){
    scores.push(new TypeScore(typeArray[labelSeed]));
  }

  arrayOfDrinkObjects:
  for(var aDrink = 0; aDrink < drinkArray.length; aDrink++){
    arrayOfTypes:
    for( var labelObject = 0; labelObject < scores.length; labelObject++){
      if(drinkArray[aDrink].type === scores[labelObject].type){
        scores[labelObject].totalScore += drinkArray[aDrink].score;
        scores[labelObject].count++;
      }
    }
  }

  for(var scorei = 0; scorei < scores.length; scorei++){
    scores[scorei].generateAverage();
  }

  return scores;
}

//constructor for aggregating the data of specific varieties of beverage
var TypeScore = function(label){
  this.type = label;
  this.totalScore = 0;
  this.count = 0;
  this.avg = 0;
};

TypeScore.prototype.generateAverage = function() {
  this.avg = this.totalScore / this.count;
};

//uses global vars to populate the renderChart attriutes
function renderBeers(){
  renderChart(context, beerTypes, Addbeer.beerDrink);
}

//uses global vars to populate the renderChart attriutes

function renderWines(){
  renderChart(context, wineTypes, Addwine.wineDrink);
}

//this will take in arrays of label arrays, array of object arrays
//concatenate them in to one massive array for each, then return them for use in
//rendering a complete chart
function concatLabelAndObjectArrays(labelArrayArrays, objectArrayArrays){
  var variety = [];
  var drinks = [];
  console.log('objArrays', objectArrayArrays);
  console.log('labelArr', labelArrayArrays);
  for(let labelX = 0; labelX < labelArrayArrays.length; labelX++){
    for(let labelY = 0; labelY < labelArrayArrays[labelX].length; labelY++){
      variety.push(labelArrayArrays[labelX][labelY]);
    }
  }

  for(let objectX = 0; objectX < objectArrayArrays.length; objectX++){
    for(let objectY = 0; objectY < objectArrayArrays[objectX].length; objectY++){
      console.log(objectArrayArrays[objectX][objectY]);
      drinks.push(objectArrayArrays[objectX][objectY]);
    }
  }

  return [variety, drinks];
}


//calls a function to get a concatenated list of beer/wine types and returns that as a single array
//does the same for all examples of beer/wine
//then invokes the render chart
function renderBeerAndWine(){
  var fullTableObjects = concatLabelAndObjectArrays([beerTypes, wineTypes], [Addbeer.beerDrink, Addwine.wineDrink]);
  console.log(fullTableObjects);
  renderChart(context, fullTableObjects[0], fullTableObjects[1]);
}


//this is testing code for the chartScoreAverage function
//we can delete later after we confirm that objects are being built correctly
//and we get a console log showing as much
var labs = ['foo', 'bar'];

var a = {
  name: 'test1',
  type: 'foo',
  score: 3,
};

var b = {
  name: 'test2',
  type: 'foo',
  score: 5,
};

var c = {
  name: 'test3',
  type: 'bar',
  score: 10,
};

var q = [a,b,c];

//console.log(chartScoreAverage(labs, q));




//renderChart(context, labs, q);
getStorage();
document.getElementById('renderBeer').addEventListener('click',renderBeers);
document.getElementById('renderAll').addEventListener('click',renderBeerAndWine);
document.getElementById('renderWine').addEventListener('click',renderWines);

