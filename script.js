/*global createCanvas, gameOver,noCursor, tutorialScreenSetup, drawTutorialScreen, imageMode, playScreenSetup, drawStartScreen, drawEndScreen, Button, drawPlayScreen, collidePointRect, Virus, stroke, strokeWeight, LEFT, RIGHT, round, textAlign, rectMode, CORNER, random, key, image, collidePointCircle, ellipse, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/

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
  buttonShadowFill,
  nextButton,
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
  tryAgainButton,
  backButton,
  homeButton,
  buttonY,
  tutorialButton,
  pillImg,
  imgResized,
  pills,
  numPills,
  vaccineImg,
  upPose,
  downPose,
  rightPose,
  leftPose,
  paragraphFont, pBoldFont, stillPose, sprayBottleImg;

let video;
let flipVideo;
let label = "...waiting";
let classifier;

function preload() {
  virusClicked = loadSound("/assets/sound_files/click_virus.wav");
  hitVirus = loadSound("/assets/sound_files/hit_virus.wav");
  select = loadSound("/assets/sound_files/select.wav");
  getMedicine = loadSound("/assets/sound_files/get_medicine.wav");
  virusAttach = loadSound("/assets/sound_files/virus_attach.wav");
  
  title = loadFont("/assets/fonts/Heading-Pro-Wide-ExtraBold-trial.ttf");
  font = loadFont("/assets/fonts/Heading-Pro-Wide-Regular-trial.ttf");
  paragraphFont = loadFont("/assets/fonts/Poppins-Light.ttf");
  pBoldFont = loadFont("/assets/fonts/Poppins-SemiBold.ttf");

  livingRoomImg = loadImage("/assets/images/room.png");
  virusImg = loadImage("/assets/images/virus.png");
  pillImg = loadImage("/assets/images/pill.png");
  vaccineImg = loadImage("/assets/images/vaccine.png");
  sprayBottleImg = loadImage("/assets/images/spraybottle.png");

  upPose = loadImage("/assets/images/up.png");
  downPose = loadImage("/assets/images/down.png");
  leftPose = loadImage("/assets/images/left.png");
  rightPose = loadImage("/assets/images/right.png");
  stillPose = loadImage("/assets/images/still.png");

  classifier = ml5.imageClassifier(
    "https://teachablemachine.withgoogle.com/models/Ag_4DvWc_/model.json"
  );
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
  tutorialButton = new Button(width / 2, height / 2, "How to Play");

  tryAgainButton = new Button(
    width * 0.37,
    height * 0.75,
    "Play Again",
    level,
    2
  );
  homeButton = new Button(width * 0.65, height * 0.75, "Home", level, 1);

  backButton = new Button(width * 0.15, height * 0.92, "Back");
 
  noCursor();
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
 
  //cursor("/assets/images/spraybottle.png");
  
 image(sprayBottleImg, mouseX, mouseY, 30, 30);
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
  healingText = "";
  if (screen === 2 && !gameIsOver) {
    pillIsUsed = false;
    vaccineIsUsed = false;
    
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
  if (screen === 2 && key === " ") {
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

  if (label == "Right" && endX > width) {
    xMove = -5;
  } else if (label == "Left" && endX < livingRoomImg.width) {
    xMove = 5;
  }

  return xMove;
}

function moveImageY() {
  let yMove = 0;
  let endY = imgY + livingRoomImg.height / 2;

  let xMove = moveImageX();
  if (label == "Down" && endY > height) {
    yMove = -5;
  } else if (label == "Up" && endY < livingRoomImg.height) {
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
