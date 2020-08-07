/*global createCanvas, imageMode, image, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/

let alarmSound,
  bgColor = [0],
  centerButtonIsVisible = true,
  centerX,
  centerY,
  buttonW,
  buttonH,
  centerButtonClicked,
  centerButtonFill,
  centerText,
  myFont,
  curScreen = 0, redShirt,
    yellowShirt;

function preload() {
  redShirt = loadImage("https://cdn.glitch.com/aaab3da2-4498-416a-b626-0e83a89f16f3%2Fred-shirt-clipart-2.png?v=1596770945846")
  yellowShirt = loadImage("https://cdn.glitch.com/aaab3da2-4498-416a-b626-0e83a89f16f3%2Ft-shirt.png?v=1596771352298")
  soundFormats("mp3");
  alarmSound = loadSound(
    "https://cdn.glitch.com/aaab3da2-4498-416a-b626-0e83a89f16f3%2FAlarm-ringtone.mp3?v=1596763108789"
  );
  myFont = loadFont(
    "https://cdn.glitch.com/aaab3da2-4498-416a-b626-0e83a89f16f3%2FRoboto-Medium.ttf?v=1596767884892"
  );
}

function setup() {
  createCanvas((windowWidth * 2) / 3, (windowHeight * 2) / 3);
  colorMode(HSB);
  setVars();

  if (curScreen === 0) {
    alarmSound.play();
  }
}

function setVars() {
  centerX = width / 2;
  centerY = height / 2;
  buttonW = width / 5;
  buttonH = height / 10;
  centerButtonFill = [5, 50, 100];
}

function draw() {
  background(bgColor);
  

  drawButtons();
  
  if (curScreen === 0) {
    centerText = "Stop Alarm";
    drawText(14);
  }else if(curScreen === 1){
    centerText = "Good morning! Today you have a very special task..."
    drawText(20);
  }else if(curScreen === 2){
    centerText = "But it's the same task as every other day since March."
    drawText(20);
  }else if(curScreen === 3){
    centerText = "Avoid the virus! Make smart decisions to stay safe. "
    drawText(20);
  }else if(curScreen === 4){
    centerButtonIsVisible = true;
    centerText = "Start"
    drawText(14);
  }else if(curScreen === 5){
    redShirt.resize(150, 0);
    imageMode(CENTER);
    image(redShirt, width / 4, centerY / 2);
    yellowShirt.resize(150, 0);
    image(yellowShirt, width * .75, centerY / 2)
    centerText = "First decision! Which shirt do you want to wear?"
    drawText(20);
    
  }
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }
}

function mousePressed() {
  centerButtonClicked = collideRectCircle(
    centerX - buttonW / 2,
    centerY - buttonH / 2,
    buttonW,
    buttonH,
    mouseX,
    mouseY,
    10
  );
  if (centerButtonClicked && curScreen === 0 ) {
    centerY += 5;
    alarmSound.stop();
    setTimeout(changeScreen, 1000);
  }else if(centerButtonClicked && curScreen === 4){
    centerY += 5;
    setTimeout(changeScreen, 1000);
  }
  
  if(curScreen === 1 || curScreen === 2 || curScreen === 3) {
    changeScreen();
  }
}

function mouseReleased() {
  if (centerButtonIsVisible && centerButtonClicked) {
    centerButtonClicked = false;
    centerY -= 5;
  }
}

function drawButtons() {
  rectMode(CENTER);
  noStroke();

  if (centerButtonIsVisible) {
    if (!centerButtonClicked) {
      fill(5, 60, 100);
      rect(centerX, centerY + 5, buttonW, buttonH, 10);
    }
    fill(centerButtonFill);
    rect(centerX, centerY, buttonW, buttonH, 10);

    //drawText(14);
  }
}

function drawText(size) {
  textSize(size);
  textFont(myFont);
  fill("white");
  textAlign(CENTER, CENTER);
  text(centerText, centerX, centerY);
}

function changeScreen() {
  curScreen++;
  if (curScreen === 1) {
    
    bgColor = [200, 35, 100];
  }
  
  centerButtonIsVisible = false;
}

function changeText(newText){
  centerText = newText;
}