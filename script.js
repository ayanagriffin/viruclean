/*global createCanvas, imageMode, random, image, ellipse, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/


let canvas, livingRoomImg, imgX, imgY, finalImg, vx, vy, viruses;


function setup() {
  livingRoomImg = loadImage("https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fliving-room-interior-cartoon-vector-20941629.jpg?v=1596816373329")
  canvas = createCanvas(400, 400);
  canvas.parent("canvas-div");
  colorMode(HSB);
  imgX = width / 2;
  imgY = height / 2;
  image(livingRoomImg, imgX, imgY)
  livingRoomImg.resize(windowWidth, 0)
  
//   vx = random(-windowWidth * .3, windowWidth * .85);

//   vy = random(-livingRoomImg.height *.15, livingRoomImg.height);
 
  viruses = [];
  for(let i = 0; i < 3; i++){
    viruses.push(new Virus());
  }
  
}

function draw() {
  background(95);
  imageMode(CENTER)
  image(livingRoomImg, imgX, imgY)
  //livingRoomImg.resize(windowWidth, 0)
 
 // console.log(livingRoomImg.width, livingRoomImg.height)
 // console.log(imgX, imgY);
  checkMousePosition();
  for(let i = 0; i < viruses.length; i++){
    viruses[i].show();
  }
  

 
}


function checkMousePosition(){
  let endX = imgX + windowWidth / 2
  let endY = imgY + livingRoomImg.height / 2
  let xMove = 0;
  let yMove = 0;
  //console.log(vx, endX);
  // console.log("mouse" + mouseX, mouseY)
  // console.log(vx, vy)
  if(mouseX > width  && endX > width) {
    
    //imgX -= 1;
    xMove = -1;
    //vx-=1;
    
  }else if(mouseX < 0 && endX < windowWidth){
   // imgX += 1;
    xMove = 1;
    // vx+=1

  }
  
  if(mouseY > height && endY > height){
   // imgY -= 1;
    yMove = -1;
   // vy -=1
  }else if(mouseY < 0   && endY < livingRoomImg.height){
   // imgY += 1;
    yMove = 1;
   // vy+=1
  }
  
  imgX += xMove;
  imgY += yMove;
  for(let i = 0; i < viruses.length; i++){
    viruses[i].move(xMove, yMove);
  }
}


class Virus{
  constructor(){
    this.x = random(-windowWidth * .3, windowWidth * .85);
    this.y = random(-livingRoomImg.height *.15, livingRoomImg.height);
    this.size = random(10, 30);
    console.log(this.x, this.y);
  }
  
  show(){
    fill("red")
    ellipse(this.x, this.y, this.size);
  }
  
  move(xResult, yResult){
    this.x += xResult;
    this.y += yResult;
  }
}