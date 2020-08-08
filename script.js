/*global createCanvas, gameOver,tutorialScreenSetup, drawTutorialScreen, imageMode, playScreenSetup, drawStartScreen, drawEndScreen, Button, drawPlayScreen, collidePointRect, Virus, stroke, strokeWeight, LEFT, RIGHT, round, textAlign, rectMode, CORNER, random, key, image, collidePointCircle, ellipse, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/

let canvas,
  livingRoomImg,
  imgX,
  imgY,
  font,
  finalImg,
  virusImg,
  pillIsUsed,
  vaccineIsUsed,
  virusAttach,
  getMedicine,
  viruses,
  title,
  currentVirus,
  numVaccines,
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
  healingText,
  select,
  startingHealth,
  vaccines,
  buttonFill,
  buttonShadowFill, nextButton,
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
  hardButton,
  tryAgainButton, backButton, 
  homeButton,
  buttonY,
  tutorialButton,
  pillImg,
  imgResized,
  pills,
  numPills,
  vaccineImg; 

let video;
let flipVideo;
let label = '...waiting';
let classifier;

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

  livingRoomImg = loadImage("/assets/room.png");
  virusImg = loadImage("/assets/virus.png");
  pillImg = loadImage(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fpill.png?v=1596901041477"
  );
  vaccineImg = loadImage(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fvaccine.png?v=1596907887802"
  );
  
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Ag_4DvWc_/model.json');
}

function setup() {
  canvas = createCanvas(600, 600);
  canvas.parent("canvas-div");
  
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
  
  colorMode(HSB);
  if (screen === 2) {
    playScreenSetup();
   } else if (screen === 1) {
     tutorialScreenSetup();
   }

  //see buttons.js for button object constructor
  easyButton = new Button(width / 4, height * 0.75, "Easy", 0);
  mediumButton = new Button(width / 2, height * 0.75, "Medium", 1);
  hardButton = new Button(width * 0.75, height * 0.75, "Hard", 2);
  tutorialButton = new Button(width / 2, height / 2, "Tutorial");
  
  tryAgainButton = new Button(width * 0.37, height * 0.75, "Play Again", level, 2);
  homeButton = new Button(width * 0.65, height * 0.75, "Home", level, 1);
  
  backButton = new Button(width * .15, height * .92, "Back");
  //nextButton = new Button(width * .87, height * .92, "Next")
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  checkMousePosition();
  classifyVideo();
}


//see screens.js for draw screen functions
function draw() {
  if (screen === 0) {
    drawStartScreen();
  } else if (screen === 1) {
    drawTutorialScreen();
  } else if (screen === 2) {
    drawPlayScreen();
  } else if (screen === 3) {
    drawEndScreen();
  }
  
  // textFont("Helvetica");
  // text(frameCount, 20, 100); //debug screen order
}

//see buttons.js for show and mousePressed functions
function drawButtons() {
  easyButton.show();
  mediumButton.show();
  hardButton.show();
  tutorialButton.show();
  
  easyButton.mousePressed();
  mediumButton.mousePressed();
  hardButton.mousePressed();
  tutorialButton.mousePressed();
}

function mouseClicked() {

  if (screen === 2 && !gameIsOver) {
    pillIsUsed = false;
    vaccineIsUsed = false;
    healingText = "";
    for (let i = 0; i < viruses.length; i++) {
      if (viruses[i].checkClicked()) {
        //console.log("clicked");
        //userIsFighting = true;
        currentVirus = viruses[i];
      }
    }

    if (userIsInfected) {
      for (let i = pills.length - 1; i >= 0; i--) {
        if (pills[i].checkClicked()) {
          pills.splice(i, 1);
        }
      }

      for (let i = vaccines.length - 1; i >= 0; i--) {
        if (vaccines[i].checkClicked()) {
          vaccines.splice(i, 1);
        }
      }
    }
  }
}

function keyPressed() {
  if (screen === 2 && key === "a") {
    currentVirus.isAttacked = false;
    currentVirus.isAlive = false;
  }
}

function checkMousePosition() {
  if (!gameIsOver || screen === 1) {
    let xMove = moveImageX();
    let yMove = moveImageY();

    imgX += xMove;
    imgY += yMove;

    if (screen === 2) {
      for (let i = 0; i < viruses.length; i++) {
        viruses[i].move(xMove, yMove);
      }

      if (userIsInfected) {
        for (let i = 0; i < pills.length; i++) {
          pills[i].move(xMove, yMove);
        }

        for (let i = 0; i < vaccines.length; i++) {
          vaccines[i].move(xMove, yMove);
        }
      }
    }
  }
}

function moveImageX() {
  let xMove = 0;
  let endX = imgX + livingRoomImg.width / 2;

  if (mouseX > width && endX > width) {
    xMove = -5;
  } else if (mouseX < 0 && endX < livingRoomImg.width) {
    xMove = 5;
  }

  return xMove;
}

function moveImageY() {
  let yMove = 0;
  let endY = imgY + livingRoomImg.height / 2;

  let xMove = moveImageX();
  if (mouseY > height && endY > height) {
    yMove = -5;
  } else if (mouseY < 0 && endY < livingRoomImg.height) {
    yMove = 5;
  }

  return yMove;
}

function removeDeadVirus() {
  for (let i = viruses.length - 1; i >= 0; i--) {
    if (viruses[i] === currentVirus) {
      viruses.splice(i, 1);
      hitVirus.play();
    }
  }

  if (viruses.length === 0 && !userIsInfected) {
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
    rect(width - 10, 20, width - 10 - health / healthCushion, 30);
  } else {
    gameOver("health");
  }
}
