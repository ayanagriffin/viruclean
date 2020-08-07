/*global createCanvas, imageMode, image, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/


let canvas, livingRoomImg, imgX, imgY, finalImg;


function setup() {
  livingRoomImg = loadImage("https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2FScreen%20Shot%202020-08-07%20at%2010.24.42%20AM.png?v=1596821093223")
  canvas = createCanvas(400, 400);
  canvas.parent("canvas-div");
  colorMode(HSB);
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
  let endX = imgX + windowWidth / 2
  let endY = imgY + livingRoomImg.height / 2
  if(mouseX > width  && endX > width) {
    
    imgX -= 1;
  }else if(mouseX < 0 && endX < windowWidth){
    imgX += 1;

  }
  
  if(mouseY > height && endY > height){
    imgY -= 1;
  }else if(mouseY < 0   && endY < livingRoomImg.height){
    imgY += 1;
  }
}
