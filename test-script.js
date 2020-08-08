/*global createCanvas, imageMode, collidePointRect, Virus, stroke, strokeWeight, LEFT, RIGHT, round, textAlign, rectMode, CORNER, random, key, image, collidePointCircle, ellipse, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/

let canvas,
  livingRoomImg,
  imgX,
  imgY,
  font,
  finalImg,
  virusImg,
  virusAttach,
  getMedicine,
  viruses,
  title,
  currentVirus,
  hitVirus,
  timer,
  health,
  gameIsOver,
  gameOverText,
  timerCushion,
  healthCushion,
  userIsInfected,
  infectedViruses,
  screen = 0,
  buttonW,
  buttonH,
  select,
  buttonFill,
  buttonShadowFill,
  level,
  easyButtonY,
  mediumButtonY,
  hardButtonY,
  easyButtonClicked,
  virusClicked,
  mediumButtonClicked,
  hardButtonClicked,
  numViruses, 
  easyButton, 
  mediumButton,
  hardButton;

function preload() {
  virusClicked = loadSound(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fclick_virus.wav?v=1596841270818"
  );
  hitVirus = loadSound(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fhit_virus.wav?v=1596840265502"
  );
  select = loadSound(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fselect.wav?v=1596839457762"
  );
  getMedicine = loadSound(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fget_medicine.wav?v=1596838831595"
  );
  virusAttach = loadSound(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fvirus_attach.wav?v=1596838911494"
  );
  title = loadFont(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2FHeading-Pro-Wide-ExtraBold-trial.ttf?v=1596837029666"
  );
  font = loadFont(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2FHeading-Pro-Wide-Regular-trial.ttf?v=1596834499234"
  );
  livingRoomImg = loadImage(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Froom.png?v=1596851689708"
  );

  virusImg = loadImage(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fvirus.png?v=1596839714148"
  );
}

function setup() {
  canvas = createCanvas(600, 600);
  canvas.parent("canvas-div");
  colorMode(HSB);
  if (screen === 1) {
    playScreenSetup();
  }
  buttonFill = [5, 50, 100];
  buttonShadowFill = [5, 60, 100];
  buttonW = width / 5;
  buttonH = height / 12;
  easyButtonY = height * 0.75;
  mediumButtonY = height * 0.75;
  hardButtonY = height * 0.75;
  
  //see buttons.js for button object constructor
  easyButton = new Button(width / 4,easyButtonY, "Easy", 0);
  mediumButton = new Button(width / 2, mediumButtonY, "Medium", 1);
  hardButton = new Button(width * 0.75, hardButtonY, "Hard", 2);
}

//see screens.js for draw screen functions
function draw() {
  if (screen === 0) {
    drawStartScreen();
  } else if (screen === 1) {
    drawPlayScreen();
  } else if (screen === 2) {
    drawEndScreen();
  }
}

//see buttons.js for show and mousePressed functions
function drawButtons() {
  easyButton.show();
  mediumButton.show();
  hardButton.show();
  
  easyButton.mousePressed();
  mediumButton.mousePressed();
  hardButton.mousePressed();
}

function mouseClicked() {
  if (screen === 2) {
    screen = 0;
    setup();
  }
  if (screen === 1 && !gameIsOver) {
    for (let i = 0; i < viruses.length; i++) {
      if (viruses[i].checkClicked()) {
        console.log("clicked");
        //userIsFighting = true;
        currentVirus = viruses[i];
      }
    }
  }
}

function keyPressed() {
  if (screen === 1 && key === "a") {
    currentVirus.isAttacked = false;
    currentVirus.isAlive = false;
  }
}

function checkMousePosition() {
  if (!gameIsOver) {
    let endX = imgX + windowWidth / 2;
    let endY = imgY + livingRoomImg.height / 2;
    let xMove = 0;
    let yMove = 0;

    if (mouseX > width && endX > width) {
      xMove = -5;
    } else if (mouseX < 0 && endX < windowWidth) {
      xMove = 5;
    }

    if (mouseY > height && endY > height) {
      yMove = -5;
    } else if (mouseY < 0 && endY < livingRoomImg.height) {
      yMove = 5;
    }

    imgX += xMove;
    imgY += yMove;
    for (let i = 0; i < viruses.length; i++) {
      viruses[i].move(xMove, yMove);
    }
  } else {
  }
}

function removeDeadVirus() {
  for (let i = viruses.length - 1; i >= 0; i--) {
    if (viruses[i] === currentVirus) {
      viruses.splice(i, 1);
      hitVirus.play();
    }
  }

  if (viruses.length === 0) {
    gameOver("win");
  }
}

function handleTime() {
  if (!gameIsOver) {
    if (timer > 0) {
      timer--;
    } else {
      gameOver("time");
    }
  }

  fill(timer / timerCushion, 100, 100);

  rectMode(CORNER);
  rect(10, 20, timer / timerCushion, 10);
}

function handleHealth() {
  if (userIsInfected) {
    health -= 0.5;
  }

  if (health > 0) {
    fill(health / healthCushion, 100, 100);
    rectMode(CORNERS);
    rect(width - 10, 20, width - health / healthCushion, 30);
  } else {
    gameOver("health");
  }
}

function gameOver(result) {
  if (result === "health") {
    gameOverText = "Your health was too low to continue.";
  } else if (result === "time") {
    gameOverText = "You ran out of time.";
  } else if (result === "win") {
    gameOverText = "Yay! You killed all of the viruses!";
  }

  gameIsOver = true;
  screen++;
}
