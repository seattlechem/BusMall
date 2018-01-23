'use strict';

var prevNum = [];
var currNum = [];
var objStore = [];
var isSame = false;
var section = document.getElementById('pictureContainer');
var imgEl1 = document.getElementById('image1');
var imgEl2 = document.getElementById('image2');
var imgEl3 = document.getElementById('image3');

// var section = document.getElementById('pictureContainer');

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
  var randomNum = Math.floor(Math.random() * stockImages.length);
  while(isSame === false){
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
  imgEl2.src = objStore[prevNum[1]].filepath;
  imgEl3.src = objStore[prevNum[2]].filepath;
}

for(i = 0; i < 3; i++){
  pickInitialNum();
}
console.log(currNum);
tranCurrToPrev();
console.log(prevNum);
setImgFilepath();
// console.log(prevNum);

imgEl1.addEventListener('click', imgClickEvent);
imgEl2.addEventListener('click', imgClickEvent);
imgEl3.addEventListener('click', imgClickEvent);

function imgClickEvent(event){
  event.preventDefault();

  pickRandomNum();

  tranCurrToPrev();
  // section.innerHTML = '';
  setImgFilepath();

}

// function pickRandomNum(){
//   isSame = false;
//   for(i = 0; i < 3; i++){
//     while(isSame === false){
//       var randomNum = Math.floor(Math.random() * stockImages.length);
//       compare(randomNum);
//     }

//   }
// }



