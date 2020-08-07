/*global createCanvas, imageMode, random, image, collidePointCircle, ellipse, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/

let canvas, livingRoomImg, imgX, imgY, finalImg, virusImg, viruses;

function preload() {
  livingRoomImg = loadImage(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fliving-room-interior-cartoon-vector-20941629.jpg?v=1596816373329"
  );

  virusImg = loadImage(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2F6bb45751-0572-4522-8e4d-c9c572b8fe52_smilie-4901128_960_720.png?v=1596824410604"
  );
}
function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("canvas-div");
  colorMode(HSB);
  imgX = width / 2;
  imgY = height / 2;
  image(livingRoomImg, imgX, imgY);
  livingRoomImg.resize(windowWidth, 0);
  viruses = [];
  for (let i = 0; i < 1; i++) {
    viruses.push(new Virus());
  }
}

function draw() {
  background(95);
  imageMode(CENTER);
  image(livingRoomImg, imgX, imgY);

  checkMousePosition();
  for (let i = 0; i < viruses.length; i++) {
    viruses[i].show();
  }
}

function mouseClicked(){
  for (let i = 0; i < viruses.length; i++) {
    viruses[i].checkClicked();
  }
  
}


function checkMousePosition() {
  let endX = imgX + windowWidth / 2;
  let endY = imgY + livingRoomImg.height / 2;
  let xMove = 0;
  let yMove = 0;

  if (mouseX > width && endX > width) {
    xMove = -5;
  } else if (mouseX < 0 && endX < windowWidth) {
    xMove = 5;
  }

  if (mouseY > height && endY > height) {
    yMove = -5;
  } else if (mouseY < 0 && endY < livingRoomImg.height) {
    yMove = 5;
  }

  imgX += xMove;
  imgY += yMove;
  for (let i = 0; i < viruses.length; i++) {
    viruses[i].move(xMove, yMove);
  }
}

class Virus {
  constructor() {
    this.size = 50;
    this.x = random(-windowWidth * 0.3, windowWidth * 0.65);
    this.y = random(-livingRoomImg.height * .05 + this.size, livingRoomImg.height * .7 - this.size);
    this.isAttacked = false;
   
    
  
  }

  show() {
    imageMode(CENTER)
    image(virusImg, this.x, this.y, this.size, this.size);
  }

  move(xResult, yResult) {
    this.x += xResult;
    this.y += yResult;
    
  }
  
  checkClicked(){
    let virusClicked = collidePointCircle(mouseX, mouseY, this.x, this.y, this.size)
    if(virusClicked){
      console.log("hit");
    }
  }
}
