/*global createCanvas, gameIsOver, userIsInfected, livingRoomImg, virusImg, infectedViruses, removeDeadVirus, handleHealth, imageMode, LEFT, RIGHT, round, textAlign, rectMode, CORNER, random, key, image, collidePointCircle, ellipse, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/

class Virus {
  constructor() {
    this.size = random(25, 60);
    this.x = random(-windowWidth * 0.3, windowWidth * 0.65);
    this.y = random(
      -livingRoomImg.height * 0.05 + this.size,
      livingRoomImg.height * 0.7 - this.size
    );
    
   
    this.isAttacked = false;
    this.isAlive = true;
    this.maxSize = 150;
    this.infectedUser = false;
  }

  show() {
    imageMode(CENTER);
    // console.log(this.x, this.y)
    if (!this.infectedUser) {
      image(virusImg, this.x, this.y, this.size, this.size);
    } else {
      infectedViruses.push(new InfectedVirus(this.x, this.y));
      removeDeadVirus();
    }

    if (!gameIsOver) {
      if (this.isAttacked) {
        this.grow();
      } else if (!this.isAlive) {
        this.die();
      }
    }
  }

  grow() {
    if (this.size < this.maxSize) {
      this.size += 4;
    } 
    else {
      handleHealth();
      userIsInfected = true;
      this.infectedUser = true;
      //userIsFighting = false;
    }
  }

  die() {
    if (this.size > 5) {
      this.size /= 2;
    } else {
      removeDeadVirus();
    }
  }
  move(xResult, yResult) {
    this.x += xResult;
    this.y += yResult;
  }

  checkClicked() {
    let virusClicked = collidePointCircle(
      mouseX,
      mouseY,
      this.x,
      this.y,
      this.size
    );
    if (virusClicked) {
      this.isAttacked = true;
    }

    return virusClicked;
  }
}

class InfectedVirus {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 150;
  }

  show() {
      image(virusImg, this.x, this.y, this.size, this.size);
   
  }
  
}
