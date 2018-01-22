'use strict';

//create constructor (has to be a separate constructor for each image?)
//create object and store into array upon page loading

var objArray = [];
var stockImages = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb.gif', 'water-can', 'wine-glass'];

function Item(name, filepath, id){
  this.name = name;
  this.filepath = filepath;
  this.id = id;
  this.numDisplayed = 0;
  this.numClicked = 0;
  objArray.push(this);
}


console.log(stockImages[3]);

//using for loop create 20 objects
for(var i = 0; i < stockImages.length; i++){
  var filepath = 'img/' + stockImages[i] + '.jpg';
  new Item(stockImages[i], filepath, i);
}

console.log(objArray[4].name);

//randomly select 3 images
// var selectedItem = Math.floor(Math.random() * objArray.length);

//Add event listener

//Remove event listener after 25 selections



