'use strict';


Item.prevNum = [];
Item.currNum = [];
Item.objStore = [];
Item.cumIndiItemClick = [];

Item.sectionEl = document.getElementById('pictureContainer');
Item.imgEl1 = document.getElementById('image1');
Item.imgEl2 = document.getElementById('image2');
Item.imgEl3 = document.getElementById('image3');
Item.totalNumOfClicks = 0;

if(localStorage.storedItem && localStorage.storedTotalClicks){
  Item.cumObjStore = JSON.parse(localStorage.getItem('storedItem'));
  Item.cumTotalNumOfClicks = JSON.parse(localStorage.getItem('storedTotalClicks'));
}else{
  Item.objStore = [];
  Item.cumObjStore = Item.objStore;
  Item.cumTotalNumOfClicks = 0;
}

Item.percentClickPerItemArray = [];

var stockImages = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

//Item Object constructor
function Item(name, filepath, id){
  this.name = name;
  this.filepath = filepath;
  this.id = id;
  this.numDisplayed = 0;
  this.numClicked = 0;
  Item.objStore.push(this);
}

//
function creatingObjets(){
  for(var i in stockImages){
    var filepath = 'img/' + stockImages[i] + '.jpg';
    new Item(stockImages[i], filepath, i);
  }
}

function compare(num){
  if(Item.prevNum.includes(num) === false && Item.currNum.includes(num) === false){
    Item.currNum.push(num);
    Item.objStore[num].numDisplayed += 1;
    return true;
  }else{
    return false;
  }
}

//Pick three images at first initially
//pick first initial num

function pickRandomNum(){
  for(var i = 0; i < 3; i++){
    var isSame = false;
    while(!isSame){
      var randomNum = Math.floor(Math.random() * stockImages.length);
      isSame = compare(randomNum);
    }
  }
}

//assigning Item.currNumItem.prevNum
function tranCurrToPrev(){
  for(var i = 0; i < 3; i++){
    Item.prevNum[i] = Item.currNum[i];
  }
  if(i === 3){
    Item.currNum = [];
  }

}

//set filepathg of image1, image2, and image3
function setImgFilepath(){
  Item.imgEl1.src = Item.objStore[Item.prevNum[0]].filepath;
  Item.imgEl1.alt = Item.objStore[Item.prevNum[0]].name;
  Item.imgEl2.src = Item.objStore[Item.prevNum[1]].filepath;
  Item.imgEl2.alt = Item.objStore[Item.prevNum[1]].name;
  Item.imgEl3.src = Item.objStore[Item.prevNum[2]].filepath;
  Item.imgEl3.alt = Item.objStore[Item.prevNum[2]].name;
}

function initialLoading(){
  creatingObjets();
  pickRandomNum();
  tranCurrToPrev();
  setImgFilepath();
}


function addEventListenerToSection(){
  //only 1 eventlistener
  Item.sectionEl.addEventListener('click', imgClickEvent);
}

function imgClickEvent(event){

  pickRandomNum();
  tranCurrToPrev();
  setImgFilepath();
  Item.totalNumOfClicks += 1;
  applyEachImgCount(event);

  if(Item.totalNumOfClicks > 24){
    extractNumClicks();
    storeData();
    percentClickPerItem();
    showTable();
    showChart();
    displayResetBtn();
  }

}

function applyEachImgCount(event){
  for(var i = 0; i < Item.objStore.length; i++){
    if(event.target.alt === Item.objStore[i].name){
      Item.objStore[i].numClicked += 1;
    }
  }
}

function showTable(){
  //table, tr, th
  Item.tableEl = document.createElement('table');
  Item.trEl = document.createElement('tr');
  Item.thEl1 = document.createElement('th');
  Item.thEl2 = document.createElement('th');
  Item.thEl3 = document.createElement('th');

  Item.thEl1.textContent = 'No.';
  Item.thEl2.textContent = 'Item Name';
  Item.thEl3.textContent = '% of Clicks';

  Item.trEl.appendChild(Item.thEl1);
  Item.trEl.appendChild(Item.thEl2);
  Item.trEl.appendChild(Item.thEl3);
  Item.tableEl.appendChild(Item.trEl);
  Item.sectionEl.appendChild(Item.tableEl);

  for(var i in Item.objStore){
    Item.trEl = document.createElement('tr');
    Item.tdEl1 = document.createElement('td');
    Item.tdEl2 = document.createElement('td');
    Item.tdEl3 = document.createElement('td');

    Item.tdEl1.textContent = i;
    Item.tdEl2.textContent = Item.objStore[i].name;
    var percentageOfClicks = Item.percentClickPerItemArray[i];
    if(percentageOfClicks === 0){
      Item.tdEl3.textContent = percentageOfClicks;
    }
    else{
      Item.tdEl3.textContent = percentageOfClicks.toFixed(2) + '%';
    }

    Item.trEl.appendChild(Item.tdEl1);
    Item.trEl.appendChild(Item.tdEl2);
    Item.trEl.appendChild(Item.tdEl3);

    Item.tableEl.appendChild(Item.trEl);
    Item.sectionEl.appendChild(Item.tableEl);
  }
}

function percentClickPerItem(){

  for(var i in Item.objStore){
    var calc = Item.objStore[i].numClicked / Item.totalNumOfClicks * 100;
    Item.percentClickPerItemArray.push(calc);
  }
}


function showChart(){
  var canvasEl = document.createElement('canvas');
  canvasEl.getContext('2d');

  new Chart(canvasEl, {
    type: 'bar',
    data: {
      labels: stockImages,
      datasets: [{
        label: 'Num of Clicks Per Item', //chart title
        data: Item.cumIndiItemClick,
        backgroundColor:
          'rgba(255, 99, 132, 0.2)',
        borderColor:
          'rgba(255, 159, 64, 1)',
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
  Item.sectionEl.appendChild(canvasEl);

}

function displayResetBtn(){
  Item.sectionEl.removeEventListener('click', imgClickEvent);
  // sectionEl.innerHTML = '';
  var resetBtn = document.createElement('button');
  resetBtn.innerHTML = 'Try Again';
  resetBtn.addEventListener('click', reset);
  Item.sectionEl.appendChild(resetBtn);
}

function reset(){
  console.log('reset');

  location.reload();
}

function storeData(){
  console.log(Item.cumObjStore);
  for(var i in Item.cumObjStore){
    Item.cumObjStore[i].numDisplayed += Item.objStore[i].numDisplayed;
    Item.cumObjStore[i].numClicked += Item.objStore[i].numClicked;
  }
  Item.cumTotalNumOfClicks += Item.totalNumOfClicks;

  localStorage.setItem('storedItem', JSON.stringify(Item.cumObjStore));
  localStorage.setItem('storedTotalClicks', JSON.stringify(Item.cumTotalNumOfClicks));
}

function extractNumClicks(){
  for(var i in Item.cumObjStore){
    Item.cumIndiItemClick.push(Item.cumObjStore[i].numClicked);
    
  }
}

initialLoading();
addEventListenerToSection();






