/*global height, width, color, rectMode, playScreenSetup, CENTER, noStroke, fill, rect, textAlign, textSize, text, mouseX, mouseY, collidePointRect, mouseIsPressed, level, select */

class Button {
  constructor(x, y, text, buttonLevel, indicator) {
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
    this.indicator = indicator;
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

  mousePressed () {
  if (screen === 0 || screen === 3 || screen === 1) {
    let buttonClicked = collidePointRect(
      mouseX,
      mouseY,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );

    if (mouseIsPressed && buttonClicked) {
      if (screen == 0){
        // home screen
        if (this.level == 0) {
          level = 0;
          select.play();
          screen += 2; // go to play screen
        } else if (this.level == 1) {
          level = 1;
          select.play();
          screen += 2;
        } else if (this.level == 2) {
          level = 2;
          select.play();
          screen += 2;
        } 
  
      } else if (screen == 3) {
        // end screen
        if (this.indicator == 1) {
          setTimeout(setHome, 50);
        } 
      }
      //setTimeout(setup, 100);
      setup();
    }
  }
}
   
}

function setHome(){
  select.play();
  screen = 0;
}