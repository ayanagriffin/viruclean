/*global createCanvas, imageMode, image, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/


let livingRoomImg, imgX, imgY, finalImg;


function setup() {
  livingRoomImg = loadImage("https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fliving-room-interior-cartoon-vector-20941629.jpg?v=1596816373329")
  createCanvas(400, 400);
  colorMode(HSB);
  console.log(windowWidth, windowHeight)
  imgX = -300;
  imgY = -75;
  checkMousePosition();
  
}

function draw() {
  background(95);
  finalImg = image(livingRoomImg, imgX, imgY)
  finalImg.resize(windowWidth, 0)
  

 
}

function mousePressed(){
  imgX += 5;
}

function checkMousePosition(){
  
}
