/*global createCanvas, healingText, pillIsUsed, vaccineIsUsed, startingHealth, health, vaccineImg, infectedViruses, pillImg, font, handleTime, handleHealth, livingRoomImg, timerCushion, healthCushion, checkMousePosition, title, drawButtons, level, numViruses, timer, health, infectedViruses, viruses, gameIsOver, userIsInfected, imgX, imgY, gameOverText, imageMode, playScreenSetup, drawStartScreen, drawEndScreen, Button, drawPlayScreen, collidePointRect, Virus, stroke, strokeWeight, LEFT, RIGHT, round, textAlign, rectMode, CORNER, random, key, image, collidePointCircle, ellipse, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/

/* NOTE: Since Pill and Vaccine do a lot of the same things, there could probably be a "Medicine" 
parent class and Pill and Vaccine would be its children. I'm a bit iffy on inheritence so that is
something we could come back to in the future*/

class Pill {
  constructor() {
    this.size = round(random(15, 20));
    console.log(this.size);
    this.maxSize = round(this.size * 1.25);
    this.minSize = round(this.size / 2);
    this.x = random(-livingRoomImg.width * 0.3, livingRoomImg.width * 0.65);
    this.y = random(
      -livingRoomImg.height * 0.05 + this.size,
      livingRoomImg.height * 0.7 - this.size
    );

    this.image = pillImg;
    
    this.direction = 0.25;
  }

  show() {
    image(this.image, this.x, this.y, this.size, this.size);
    this.animate();
  }

  move(xResult, yResult) {
    this.x += xResult;
    this.y += yResult;
  }

  animate() {
    if (this.size === this.maxSize || this.size === this.minSize) {
      this.direction = -this.direction;
    }

    this.size += this.direction;
  }

  checkClicked() {
    let pillClicked = collidePointCircle(
      mouseX,
      mouseY,
      this.x,
      this.y,
      this.size
    );

    if (pillClicked) {
      infectedViruses.splice(-1, 1);
      pillIsUsed = true;
      // this.reset();
      if (infectedViruses.length === 0) {
        userIsInfected = false;
      }
    }
    
    return pillClicked;
  }

  reset() {
    this.x = random(-livingRoomImg.width * 0.3, livingRoomImg.width * 0.65);
    this.y = random(
      -livingRoomImg.height * 0.05 + this.size,
      livingRoomImg.height * 0.7 - this.size
    );
  }
}

class Vaccine {
  constructor() {
    this.size = round(random(35, 50));
    this.maxSize = round(this.size * 1.25);
    this.minSize = round(this.size / 2);
    this.x = random(-livingRoomImg.width * 0.3, livingRoomImg.width * 0.65);
    this.y = random(
      -livingRoomImg.height * 0.05 + this.size,
      livingRoomImg.height * 0.7 - this.size
    );
    
    this.image = vaccineImg;
    this.direction = 0.25;
    this.isVisible = true;
  }

  show() {
    if (this.isVisible) {
      image(this.image, this.x, this.y, this.size, this.size);
      this.animate();
    }
  }

  move(xResult, yResult) {
    this.x += xResult;
    this.y += yResult;
  }

  animate() {
    if (this.size === this.maxSize || this.size === this.minSize) {
      this.direction = -this.direction;
    }

    this.size += this.direction;
  }

  checkClicked() {
    let vaccineClicked = collidePointCircle(
      mouseX,
      mouseY,
      this.x,
      this.y,
      this.size
    );

    if (vaccineClicked) {
      infectedViruses = [];
      this.isVisible = false;
      userIsInfected = false;
      health = startingHealth;
      vaccineIsUsed = true;
    }
    
    return vaccineClicked;
  }
}
