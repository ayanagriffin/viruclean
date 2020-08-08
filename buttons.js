class Button{
  constructor(x, y, text){
    this.x = x;
    this.y = y;
    this.shadowY = height * 0.75 + 5
    this.textY = height * 0.764
    this.width = width/5;
    this.height = height/12;
    this.buttonColor = color(5, 50, 100);
    this.shadowColor = color(5, 60, 100);
    this.text = text;
    this.corner = 10
  }
  
  show(){
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
   
}


function mousePressed() {
  if (screen === 0) {
    easyButtonClicked = collidePointRect(
      mouseX,
      mouseY,
      width / 4 - buttonW / 2,
      easyButtonY - buttonH / 2,
      buttonW,
      buttonH
    );
    mediumButtonClicked = collidePointRect(
      mouseX,
      mouseY,
      width / 2 - buttonW / 2,
      mediumButtonY - buttonH / 2,
      buttonW,
      buttonH
    );

    hardButtonClicked = collidePointRect(
      mouseX,
      mouseY,
      width * 0.75 - buttonW / 2,
      hardButtonY - buttonH / 2,
      buttonW,
      buttonH
    );
    
    if (easyButtonClicked) {
      select.play();

      easyButtonY += 5;
      level = 0;
    } else if (mediumButtonClicked) {
      mediumButtonY += 5;
      level = 1;
      select.play();
    } else if (hardButtonClicked) {
      hardButtonY += 5;
      level = 2;
      select.play();
    }
  }
}


function mouseReleased() {
  if (screen === 0) {
    if (easyButtonClicked) {
      easyButtonClicked = false;
      easyButtonY -= 7;
      screen++;
      setup();
    } else if (mediumButtonClicked) {
      mediumButtonClicked = false;
      mediumButtonY -= 7;
      screen++;
      setup();
    } else if (hardButtonClicked) {
      hardButtonClicked = false;
      hardButtonY -= 7;
      screen++;
      setup();
    }
  }
}