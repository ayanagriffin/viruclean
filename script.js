/*global createCanvas, colorMode, HSB, background, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/

let alarmSound, backgroundColor = "black", centerButtonIsVisible = true;

function preload(){
  soundFormats("mp3");
  alarmSound = loadSound("https://cdn.glitch.com/aaab3da2-4498-416a-b626-0e83a89f16f3%2FAlarm-ringtone.mp3?v=1596763108789");
}

function setup() {
  createCanvas(windowWidth * 2 / 3, windowHeight * 2 / 3);
  colorMode(HSB, 360, 100, 100);
  //alarmSound.play();
}

function draw() {
  background(backgroundColor);
  drawButtons();
  
}

function mouseClicked(){
  alarmSound.stop();
}


function drawButtons(){
  rectMode(CENTER);
  fill("red");
  
  if(centerButtonIsVisible){
    rect(width / 2, height / 2, width / 6, height / 10, 10);
    
  }
  
}


