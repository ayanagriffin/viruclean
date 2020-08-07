/*global createCanvas, imageMode, image, ellipse, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/


let canvas, livingRoomImg, imgX, imgY, finalImg, vx, vy;


function setup() {
  livingRoomImg = loadImage("https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fliving-room-interior-cartoon-vector-20941629.jpg?v=1596816373329")
  canvas = createCanvas(400, 400);
  canvas.parent("canvas-div");
  colorMode(HSB);
  imgX = width / 2;
  imgY = height / 2;
   vx = windowWidth / 2;
   vy = windowHeight / 2;
  
  
  
  console.log(windowWidth, windowHeight)
  
}

function draw() {
  background(95);
  imageMode(CENTER)
  image(livingRoomImg, imgX, imgY)
  livingRoomImg.resize(windowWidth, 0)
 
 // console.log(livingRoomImg.width, livingRoomImg.height)
 // console.log(imgX, imgY);
  checkMousePosition();
  fill("red")
  ellipse(vx, vy, 30);
  

 
}


function checkMousePosition(){
  let endX = imgX + windowWidth / 2
  let endY = imgY + livingRoomImg.height / 2
  if(mouseX > width  && endX > width) {
    
    imgX -= 1;
    vx-=1;
    
  }else if(mouseX < 0 && endX < windowWidth){
    imgX += 1;
     vx+=1

  }
  
  if(mouseY > height && endY > height){
    imgY -= 1;
    vy -=1
  }else if(mouseY < 0   && endY < livingRoomImg.height){
    imgY += 1;
    vy+=1
  }
}


class Virus{
  constructor(){
    this.x = random(windowWidth);
    this.y = random(windowHeight);
  }
}