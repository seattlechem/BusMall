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

//using for loop create 20 objects
for(var i = 0; i < stockImages.length; i++){
  var filepath = 'img/' + stockImages[i] + '.jpg';
  new Item(stockImages[i], filepath, i);
}

function pickInitialNum(){
  isSame = false;
  while(isSame === false){
    var randomNum = Math.floor(Math.random() * stockImages.length);
    if(currNum.includes(randomNum) === false){
      currNum.push(randomNum);
      isSame = true;
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
  for(i = 0; i < 3; i++){
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

for(i = 0; i < 3; i++){
  pickInitialNum();
}

tranCurrToPrev();

setImgFilepath();
// console.log(prevNum);

//only 1 eventlistener
sectionEl.addEventListener('click', imgClickEvent);

function imgClickEvent(event){
  event.preventDefault();

  pickRandomNum();

  tranCurrToPrev();
  // section.innerHTML = '';
  setImgFilepath();
  totalNumOfClicks += 1;

  for(i = 0; i < objStore.length; i++){
    if(event.target.alt === objStore[i].name){
      objStore[i].numClicked += 1;
    }
  }

  if(totalNumOfClicks > 2){
    sectionEl.removeEventListener('click', imgClickEvent);
    console.log('reached 25 clicks');
    sectionEl.innerHTML = '';
    showResults();
  }

}

function showResults(){
  //table, tr, th
  var tableEl = document.createElement('table');
  var trEl = document.createElement('tr');
  var thEl1 = document.createElement('th');
  var thEl2 = document.createElement('th');
  var thEl3 = document.createElement('th');

  thEl1.textContent = 'No.';
  thEl2.textContent = 'Item Name';
  thEl3.textContent = '# of Clicks';

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
    tdEl3.textContent = objStore[i].numClicked;

    trEl.appendChild(tdEl1);
    trEl.appendChild(tdEl2);
    trEl.appendChild(tdEl3);

    tableEl.appendChild(trEl);
    sectionEl.appendChild(tableEl);


  }
  //tr, td
}

//after 25 clicks, turn off event listeners on the images

// function pickRandomNum(){
//   isSame = false;
//   for(i = 0; i < 3; i++){
//     while(isSame === false){
//       var randomNum = Math.floor(Math.random() * stockImages.length);
//       compare(randomNum);
//     }

//   }
// }



