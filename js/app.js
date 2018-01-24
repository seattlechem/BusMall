'use strict';

var prevNum = [];
var currNum = [];
var objStore = [];
var isSame = false;
var sectionEl = document.getElementById('pictureContainer');
var imgEl1 = document.getElementById('image1');
var imgEl2 = document.getElementById('image2');
var imgEl3 = document.getElementById('image3');
var totalNumOfClicks = 0;
var percentClickPerItemArray = [];


var stockImages = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

//Item Object constructor
function Item(name, filepath, id){
  this.name = name;
  this.filepath = filepath;
  this.id = id;
  this.numDisplayed = 0;
  this.numClicked = 0;
  objStore.push(this);
}

//
function creatingObjets(){
  //using for loop create 20 objects
  for(var i = 0; i < stockImages.length; i++){
    var filepath = 'img/' + stockImages[i] + '.jpg';
    new Item(stockImages[i], filepath, i);
  }
}

function pickInitialNum(){
  for(i = 0; i < 3; i++){
    isSame = false;
    while(isSame === false){
      var randomNum = Math.floor(Math.random() * stockImages.length);
      if(currNum.includes(randomNum) === false){
        currNum.push(randomNum);
        isSame = true;
      }
    }
  }
}

//the current isSame is false

//compare function
function compare(num){
  if(prevNum.includes(num) === false && currNum.includes(num) === false){
    currNum.push(num);
    objStore[num].numDisplayed += 1;

    isSame = true;
  }else{
    isSame = false;
  }
}

//Pick three images at first initially
//pick first initial num

function pickRandomNum(){
  isSame = false;
  while(isSame === false){
    var randomNum = Math.floor(Math.random() * stockImages.length);
    compare(randomNum);
  }
  isSame = false;
  while(isSame === false){
    randomNum = Math.floor(Math.random() * stockImages.length);
    compare(randomNum);
  }
  isSame = false;
  while(isSame === false){
    randomNum = Math.floor(Math.random() * stockImages.length);
    compare(randomNum);
  }
  console.log(currNum);
}

//assigning currNum to prevNum
function tranCurrToPrev(){
  for(var i = 0; i < 3; i++){
    prevNum[i] = currNum[i];
  }
  if(i === 3){
    currNum = [];
  }

}

//set filepathg of image1, image2, and image3
function setImgFilepath(){
  imgEl1.src = objStore[prevNum[0]].filepath;
  imgEl1.alt = objStore[prevNum[0]].name;
  imgEl2.src = objStore[prevNum[1]].filepath;
  imgEl2.alt = objStore[prevNum[1]].name;
  imgEl3.src = objStore[prevNum[2]].filepath;
  imgEl3.alt = objStore[prevNum[2]].name;
}

function initialLoading(){
  creatingObjets();
  pickRandomNum();
  tranCurrToPrev();
  setImgFilepath();
}


function addEventListenerToSection(){
  //only 1 eventlistener
  sectionEl.addEventListener('click', imgClickEvent);
}

function imgClickEvent(event){

  pickRandomNum();
  tranCurrToPrev();
  setImgFilepath();
  totalNumOfClicks += 1;
  applyEachImgCount();
  
  if(totalNumOfClicks > 24){
    sectionEl.removeEventListener('click', imgClickEvent);
    console.log('reached 25 clicks');
    sectionEl.innerHTML = '';
    // showTable();
    percetClickPerItem();
    showChart();
    // displayResetBtn();
  }
  
}

function applyEachImgCount(){
  for(var i = 0; i < objStore.length; i++){
    if(event.target.alt === objStore[i].name){
      objStore[i].numClicked += 1;
    }
  }
}

function showTable(){
  //table, tr, th
  var tableEl = document.createElement('table');
  var trEl = document.createElement('tr');
  var thEl1 = document.createElement('th');
  var thEl2 = document.createElement('th');
  var thEl3 = document.createElement('th');

  thEl1.textContent = 'No.';
  thEl2.textContent = 'Item Name';
  thEl3.textContent = '% of Clicks';

  trEl.appendChild(thEl1);
  trEl.appendChild(thEl2);
  trEl.appendChild(thEl3);
  tableEl.appendChild(trEl);
  sectionEl.appendChild(tableEl);

  for(i in objStore){
    trEl = document.createElement('tr');
    var tdEl1 = document.createElement('td');
    var tdEl2 = document.createElement('td');
    var tdEl3 = document.createElement('td');

    tdEl1.textContent = i;
    tdEl2.textContent = objStore[i].name;
    var percentageOfClicks = (objStore[i].numClicked) / (totalNumOfClicks) * 100;
    if(percentageOfClicks === 0){
      tdEl3.textContent = percentageOfClicks;
    }
    else{
      tdEl3.textContent = percentageOfClicks.toFixed(2) + '%';
    }

    trEl.appendChild(tdEl1);
    trEl.appendChild(tdEl2);
    trEl.appendChild(tdEl3);

    tableEl.appendChild(trEl);
    sectionEl.appendChild(tableEl);


  }
  //tr, td
}

function percetClickPerItem(){
  for(var i in objStore){
    var calc = objStore[i].numClicked / totalNumOfClicks * 100;
    percentClickPerItemArray.push(calc);
    console.log(calc);

  }
}

function showChart(){
  var canvasEl = document.createElement('canvas');
  canvasEl.getContext('2d');

  var itemChart = new Chart(canvasEl, {
    type: 'bar',
    data: {
      labels: stockImages,
      datasets: [{
        label: 'Percentage of Clicks Per Item', //chart title
        data: percentClickPerItemArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }

  });
  sectionEl.appendChild(canvasEl);

}

function displayResetBtn(){
  var resetBtn = document.createElement('button');
  resetBtn.innerHTML = 'Try Again';
  resetBtn.onclick = reset();
  sectionEl.appendChild(resetBtn);
}

function reset(){
  sectionEl.innerHTML = '';
  var imageEl1 = document.createElement('img');
  imageEl1.id = 'image1';

  var imageEl2 = document.createElement('img');
  imageEl2.id = 'image1';

  var imageEl3 = document.createElement('img');
  imageEl3.id = 'image1';



  pickRandomNum();
  tranCurrToPrev();

  setImgFilepath();
  totalNumOfClicks += 1;

  // for(i = 0; i < objStore.length; i++){
  //   if(event.target.alt === objStore[i].name){
  //     objStore[i].numClicked += 1;
  //   }
  // }

  // if(totalNumOfClicks > 5){
  //   sectionEl.removeEventListener('click', imgClickEvent);
  //   console.log('reached 25 clicks');
  //   sectionEl.innerHTML = '';
  //   // showTable();
  //   percetClickPerItem();
  //   showChart();
  //   displayResetBtn();
  // }

}

initialLoading();
addEventListenerToSection();






