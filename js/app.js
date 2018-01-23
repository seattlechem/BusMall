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

var stockImages = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb.gif', 'water-can', 'wine-glass'];

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
  console.log(filepath);
  new Item(stockImages[i], filepath, i);
  console.log(objStore);
}
console.log('objects are created');
console.log(Item);


//compare function
function compare(num){
  for(var i = 0; i < 3; i++){
    if(prevNum[i] === num){
      break;
    }
  }
  if(i === 3){
    //no match is found prevNum, then try currNum
    for(i = 0; i < 3; i++){
      if(currNum[i] === num){
        break;
      }
    }
    if(i === 3){
      //no match is found even in currNum, then push to currNum
      currNum.push(num);
      isSame = true;
    }

  }
  console.log('isSame value after exiting compare function: ' + isSame);
}

//Pick three images at first initially
//pick first initial num
function pickInitialNums(){
  var randomNum = Math.floor(Math.random() * stockImages.length);
  currNum.push(randomNum);
  isSame = true;
  console.log('first initial num: ' + currNum);
  console.log('the current isSame value: ' + isSame);

  //pick 2nd initial num
  while(isSame === true){
    randomNum = Math.floor(Math.random() * stockImages.length);
    if(currNum[0] !== randomNum){
      isSame = false;
      currNum.push(randomNum);
    }
  }
  //reset isSame
  isSame = true;
  console.log('2nd initial num: ' + currNum);
  //reset isSame to true

  //pick 3rd initial num
  if(isSame === true){
    randomNum = Math.floor(Math.random() * stockImages.length);
    if(currNum[0] !== randomNum && currNum[1] !== randomNum){
      isSame = false;
      currNum.push(randomNum);
    }
  }
  console.log('3rd initial num: ' + currNum);
  console.log('isSame value after finishing picking initial numbers: ' + isSame);
  //the current isSame is false
}

function pickRandomNum(){
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
}
//assigning currNum to prevNum
function tranCurrToPrev(){
  for(i = 0; i < 3; i++){
    prevNum[i] = currNum[i];
  }
  currNum = [];
}

//set filepathg of image1, image2, and image3
function setImgFilepath(){
  imgEl1.src = objStore[prevNum[0]].filepath;
  imgEl2.src = objStore[prevNum[1]].filepath;
  imgEl3.src = objStore[prevNum[2]].filepath;
}

pickInitialNums();
tranCurrToPrev();
console.log('1st prevNum: ' + prevNum);
console.log(currNum); //empty bc nums were transferred
setImgFilepath();
console.log(Item);

imgEl1.addEventListener('click', imgClickEvent());
console.log(imgEl1);
imgEl2.addEventListener('click', imgClickEvent());
imgEl3.addEventListener('click', imgClickEvent());

function imgClickEvent(){

  pickRandomNum();

  tranCurrToPrev();
  // section.innerHTML = '';
  setImgFilepath();

}

//click event


//pick random 3 numbers

// pickRandomNum();
// console.log('pick random: ' + currNum);

// tranCurrToPrev();
// console.log('current num ' + currNum);
// console.log('previous num ' + prevNum);

// console.log(objStore[prevNum[0]]);
// setImgFilepath();




