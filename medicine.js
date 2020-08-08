/*global createCanvas, pillImg, font, handleTime, handleHealth, livingRoomImg, timerCushion, healthCushion, checkMousePosition, title, drawButtons, level, numViruses, timer, health, infectedViruses, viruses, gameIsOver, userIsInfected, imgX, imgY, gameOverText, imageMode, playScreenSetup, drawStartScreen, drawEndScreen, Button, drawPlayScreen, collidePointRect, Virus, stroke, strokeWeight, LEFT, RIGHT, round, textAlign, rectMode, CORNER, random, key, image, collidePointCircle, ellipse, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/

class Pill{
  constructor(){
    this.x = random(-livingRoomImg.width * 0.3, livingRoomImg.width * 0.65);
    this.y = random(
      -livingRoomImg.height * 0.05 + this.size,
      livingRoomImg.height * 0.7 - this.size
    );
    this.size = 30;
    this.image = pillImg;
    
  }
  
  show(){
    image(this.image, this.x, this.y, this.size, this.size);
    console.log(this.x, this.y)
  }
  
  animate(){
    
  }
}