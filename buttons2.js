/*global height, width, color, rectMode, CENTER, noStroke, fill, rect, textAlign, textSize, text, mouseX, mouseY, collidePointRect, mouseIsPressed, level, select */

class Button {
  constructor(x, y, text, buttonLevel) {
    this.x = x;
    this.y = y;
    this.shadowY = this.y + 5;
    this.textY = this.y + 4;
    this.width = width / 5;
    this.height = height / 12;
    this.buttonColor = color(5, 50, 100);
    this.shadowColor = color(5, 60, 100);
    this.text = text;
    this.corner = 10;
    this.level = buttonLevel;
    this.buttonClicked = false;
  }

  show() {
    rectMode(CENTER);
    noStroke();

    fill(this.shadowColor);
    rect(this.x, this.shadowY, this.width, this.height, this.corner);
    fill(this.buttonColor);
    rect(this.x, this.y, this.width, this.height, this.corner);

    textAlign(CENTER);
    textSize(12);
    fill("white");

    text(this.text, this.x, this.textY);
  }

  mousePressed() {
    let buttonClicked = collidePointRect(
      mouseX,
      mouseY,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );

    if (mouseIsPressed && buttonClicked) {
      if (screen === 0) {
        this.homeScreenButtonPressed();
      } else if (screen === 1) {
        this.tutorialScreenButtonPressed();
      }else if (screen === 3) {
        this.endScreenButtonPressed();
      }

      setup();
    }
  }

  homeScreenButtonPressed() {
    if (this.level == 0) {
      level = 0;
      select.play();
      setTimeout(changeScreen(2), 50); // go to play screen
    } else if (this.level == 1) {
      level = 1;
      select.play();
      setTimeout(changeScreen(2), 50);
    } else if (this.level == 2) {
      level = 2;
      select.play();
      setTimeout(changeScreen(2), 50);
    }else{
      setTimeout(changeScreen(1), 50);
    }
  }

  tutorialScreenButtonPressed() {
    if(this.text === "Back"){
      setTimeout(changeScreen(screen-1), 50)
    }
    
  }

  endScreenButtonPressed() {
    if (this.text === "Home") {
      setTimeout(changeScreen(0), 50);
    }else if(this.text === "Play Again"){
      setTimeout(changeScreen(2), 50)
    }
  }
}

function changeScreen(newScreenNum){
  screen = newScreenNum;
}
