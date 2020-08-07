/*global createCanvas, imageMode, image, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/


let livingRoomImg, imgX, imgY, finalImg;


function setup() {
  livingRoomImg = loadImage("https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fliving-room-interior-cartoon-vector-20941629.jpg?v=1596816373329")
  createCanvas(400, 400);
  colorMode(HSB);
  console.log(400, 400)
  imgX = width / 2;
  imgY = height / 2;
  
  
}

function draw() {
  background(95);
  imageMode(CENTER)
  image(livingRoomImg, imgX, imgY)
  livingRoomImg.resize(windowWidth, 0)
  checkMousePosition();
 // console.log(livingRoomImg.width, livingRoomImg.height)
 // console.log(imgX, imgY);
  

 
}


function checkMousePosition(){
 // console.log("mouseX :" + mouseX);
 
  if(mouseX > width && (imgX  + windowWidth / 2) > (windowWidth / 2 + width / 2)) {
    imgX -= 1;
    console.log(imgX)
  }else if(mouseX < 0 && imgX < 375){
    imgX += 1;
    console.log(imgX);
  }
  
  if(mouseY > height && imgY > 100){
    imgY -= 1;
    console.log(imgY)
  }else if(mouseY < 0){
    imgY += 1;
  }
}
