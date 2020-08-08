class Button {
  
  constructor(x, y, text, buttonLevel) {
    this.x = x;
    this.y = y;
    this.shadowY = height * 0.75 + 5;
    this.textY = height * 0.764;
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
    if (screen === 0) {
     let buttonClicked = collidePointRect(
        mouseX,
        mouseY,
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      );

      if (mouseIsPressed && buttonClicked) {
        this.y += 5;
        
        if (this.level == 0) {
          level = 0;
          select.play();
        } else if (this.level == 1) {
          level = 1;
          select.play();
        } else if (this.level == 2) {
          level = 2;
          select.play();
        } 
        screen++;
        setup();
      }
      }
    }
  }
