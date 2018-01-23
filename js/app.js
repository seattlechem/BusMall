'use strict';

var prevNum = [];
var currNum = [];
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
  currNum.push(this);
}

//using for loop create 20 objects
for(var i = 0; i < stockImages.length; i++){
  var filepath = 'img/' + stockImages[i] + '.jpg';
  new Item(stockImages[i], filepath, i);
}


//compare function
function compare(num){
  for(var i = 0; i < 3; i++){
    if (prevNum[i] === num){
      isSame = true;
    }
  }
  if (i === 3){
    //no match is found prevNum, then try currNum
    for (i = 0; i < 3; i++){
      if (currNum[i] === num){
        isSame = true;
      }
    }
    if (i === 3){
      //no match is found even in currNum, then push to currNum
      currNum.push(num);
    }

  }
}

//Pick three images at first initially
//pick first initial num
function pickInitialNums(){
  var randomNum = Math.floor(Math.random() * stockImages.length);
  currNum.push(randomNum);

  //pick 2nd initial num
  while (isSame === false){
    randomNum = Math.floor(Math.random() * stockImages.length);
    compare(randomNum);
  }

  //pick 3rd initial num
  while (isSame === false){
    randomNum = Math.floor(Math.random() * stockImages.length);
    compare(randomNum);
  }

}

function pickRandomNum(){
  while (isSame === false){
    var randomNum = Math.floor(Math.random() * stockImages.length);
    compare(randomNum);
  }
}
//assigning currNum to prevNum
function tranCurrToPrev(){
  for (i = 0; i < 3; i++){
    prevNum[i] = currNum[i];
  }
  currNum = [];
}

//set filepathg of image1, image2, and image3
function setImgFilepath(){
  imgEl1.src = Item[prevNum[0]].filepath;
  imgEl2.src = Item[prevNum[1]].filepath;
  imgEl3.src = Item[prevNum[2]].filepath;
}

function imgClickEvent(){
  for (i = 0; i < 3; i++){
    pickRandomNum();
  }

  tranCurrToPrev();
  section.innerHTML = '';
  setImgFilepath();

}

//click event
imgEl1.addEventListener('click', imgClickEvent());










pickInitialNums();
tranCurrToPrev();
setImgFilepath();




