/*global createCanvas, colorMode, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/

let alarmSound, bgColor, centerButtonIsVisible = true, centerButtonX , 
    centerButtonY, centerButtonW , centerButtonH, centerButtonClicked, centerButtonFill ;

function preload(){
  soundFormats("mp3");
  alarmSound = loadSound("https://cdn.glitch.com/aaab3da2-4498-416a-b626-0e83a89f16f3%2FAlarm-ringtone.mp3?v=1596763108789");
}

function setup() {
  
  createCanvas(windowWidth * 2 / 3, windowHeight * 2 / 3);
  colorMode(HSB);
  centerButtonX = width / 2
  centerButtonY = height / 2
  centerButtonW = width / 6
  centerButtonH = height / 10
  centerButtonFill = (90, 90, 90);
  bgColor = (255, 0, 255);
  centerButtonFill = (100, 100, 100);
  //alarmSound.play();
}

function draw() {
  background(bgColor);
  drawButtons();
  
}

function mouseClicked(){
  
  centerButtonClicked = collideRectCircle(centerButtonX - centerButtonW/2, centerButtonY - centerButtonH/2, centerButtonW, centerButtonH, mouseX, mouseY, 10);
  if(centerButtonIsVisible && centerButtonClicked){
    console.log("clicked")
  }
  alarmSound.stop();
}


function drawButtons(){
  rectMode(CENTER);
  
  
  if(centerButtonIsVisible){
    fill(centerButtonFill);
    rect(centerButtonX, centerButtonY, centerButtonW, centerButtonH, 10);
    
    
  }
  
}


