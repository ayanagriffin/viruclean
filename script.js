/*global createCanvas, imageMode, image, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/


let livingRoomImg, imgX, imgY, finalImg;


function setup() {
  livingRoomImg = loadImage("https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fliving-room-interior-cartoon-vector-20941629.jpg?v=1596816373329")
  createCanvas(400, 400);
  colorMode(HSB);
  console.log(windowWidth, windowHeight)
  imgX = -300;
  imgY = -75;
  
  
}

function draw() {
  background(95);
  image(livingRoomImg, imgX, imgY)
  livingRoomImg.resize(windowWidth, 0)
  checkMousePosition();
  

 
}


function checkMousePosition(){
  console.log("mouseX :" + mouseX);
  console.log(windowWidth)
  if(mouseX > width){
    imgX -= 1;
  }else if(mouseX < 0){
    imgX -= 1;
  }
}
