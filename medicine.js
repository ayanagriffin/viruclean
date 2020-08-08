/*global createCanvas, pillImg, font, handleTime, handleHealth, livingRoomImg, timerCushion, healthCushion, checkMousePosition, title, drawButtons, level, numViruses, timer, health, infectedViruses, viruses, gameIsOver, userIsInfected, imgX, imgY, gameOverText, imageMode, playScreenSetup, drawStartScreen, drawEndScreen, Button, drawPlayScreen, collidePointRect, Virus, stroke, strokeWeight, LEFT, RIGHT, round, textAlign, rectMode, CORNER, random, key, image, collidePointCircle, ellipse, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/

class Pill{
  constructor(){
    this.size = random(10, 40);
    this.maxSize = round(this.size * 1.5);
    this.minSize = this.size / 2;
    this.x = random(-livingRoomImg.width * 0.3, livingRoomImg.width * 0.65);
    this.y = random(
      -livingRoomImg.height * 0.05 + this.size,
      livingRoomImg.height * 0.7 - this.size
    );
   
    this.image = pillImg;
    
  }
  
  show(){
    image(this.image, this.x, this.y, this.size, this.size);
    this.animate();
  }
  
  
  move(xResult, yResult) {
    this.x += xResult;
    this.y += yResult;
  }
  
  animate(){
    if(this.size < this.maxSize){
      this.shrink();
    }else{
      this.shrink();
    }
      
  }
  
  grow(){
    this.size += 0.25;
  }
  
  shrink(){
    this.size -= 0.25;
  }
}