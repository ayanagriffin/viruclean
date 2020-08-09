/*global createCanvas, backButton, virusImg, vaccineImg, leftPose, rightPose, upPose, downPose, pillImg, tryAgainButton, homeButton, nextButton, healingText, Vaccine numVaccines, pillIsUsed, vaccineIsUsed, Pill, vaccines, startingHealth, imgResized, pills, numPills, font, handleTime, handleHealth, livingRoomImg, timerCushion, healthCushion, checkMousePosition, title, drawButtons, level, numViruses, timer, health, infectedViruses, viruses, gameIsOver, userIsInfected, imgX, imgY, gameOverText, imageMode, playScreenSetup, drawStartScreen, drawEndScreen, Button, drawPlayScreen, collidePointRect, Virus, stroke, strokeWeight, LEFT, RIGHT, round, textAlign, rectMode, CORNER, random, key, image, collidePointCircle, ellipse, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/


/*

  SCREEN 0: HOME SCREEN
  SCREEN 1: TUTORIAL SCREEN
  SCREEN 2: GAME SCREEN
  SCREEN 3: GAME OVER SCREEN
  
  */


/* ----------------------------START SCREEN--------------------------------------- */
function drawStartScreen() {
  background("#ffc9b2");
  fill(255);
  textFont(title);
  textSize(70);
  textAlign(CENTER);
  text("title", width / 2, height * 0.25);
  textFont(font);
  textSize(12);
  text(
    "Pose for the camera to\n find and eradicate the virus!",
    width / 2,
    height * 0.35
  );
  text("Pick a Level to Start", width / 2, height * 0.65);
  textSize(8);
  text("made for melonjam twentytwenty", width / 2, height * 0.95);
  drawButtons();
}

/* ---------------------------- TUTORIAL SCREEN --------------------------------------- */

function tutorialScreenSetup(){
  imgX = width / 2;
  imgY = height / 2;
  imgResized = false;
}

function drawTutorialScreen(){
  imageMode(CENTER);

  image(livingRoomImg, imgX, imgY);
  
  if (!imgResized) {
    livingRoomImg.resize(windowWidth * 1.5, 0);
    imgResized = true;
  }
  
  checkMousePosition();
  
  fill(255);
  rect(width / 2, height* 0.45, width * .9, height *0.8, 20)
  
  backButton.show();
  backButton.mousePressed();
  
  drawTutorial();
  
}

function drawTutorial(){
   fill(0);
  textFont(font);
  textSize(20);
  text("How to Play", width / 2, height * .22, width * .8, height / 4)
  
  image(virusImg, width* 0.2, height * .20, 65, 65);
  textSize(12);
  textAlign(LEFT);
  textFont(paragraphFont);
  text("This is the VIRUS.", width * 0.7, height * 0.28, width * .8, height / 4);
  text("To eradicate it, click on it, then press the spacebar \n\nbefore it gets too big!", width * 0.7, height * 0.31, width * .8, height / 4);
  
  textSize(14);
  textAlign(CENTER);
  textFont(font);
  text("If the virus hits you...", width / 2, height * .41, width * .8, height / 4)
  
  image(pillImg, width* 0.2, height * .37, 55, 55);
  textSize(12);
  textAlign(LEFT);
  textFont(paragraphFont);
  text("This is your medicine.", width * 0.7, height * 0.46, width * .8, height / 4);
  text("Find and click on it to stop your health from\n\ndecreasing.", width * 0.7, height * 0.49, width * .8, height / 4);
  
  image(vaccineImg, width* 0.2, height * .49, 55, 55);
  textSize(12);
  textAlign(LEFT);
  text("This is the vaccine.", width * 0.7, height * 0.573, width * .8, height / 4);
  text("Find and click on it to restore your health.", width * 0.7, height * 0.62, width * .8, height / 4);
  
  textSize(14);
  textAlign(CENTER);
  textFont(font);
  text("To look around the room...", width / 2, height * .69, width * .8, height / 4)
  textSize(12);
  textFont(paragraphFont);
  text("Pose for the camera using these four poses!\n\n Allow the camera permissions and try it out!", width / 2, height * .73, width * .8, height / 4)
  
  image(rightPose, width* 0.7, height * .72, 65, 65);
  image(leftPose, width* 0.58, height * .72, 65, 65);
  image(upPose, width* 0.25, height * .72, 65, 65);
  image(downPose, width* 0.42, height * .72, 65, 65);
  
  text("up", width / 4, height * .8)
  text("down", width / 2.4, height * .8)
  text("left", width * .56, height * .8)
  text("right", width * .715, height * .8)

  
}

/* ---------------------------- PLAY SCREEN --------------------------------------- */

function playScreenSetup() {
  if (level === 0) {
    numViruses = 3;
    timer = 1500;
    //startingHealth = 1000;
    numPills = 3;
    numVaccines = 2;
  } else if (level === 1) {
    numViruses = 6;
    timer = 1500;
   // startingHealth = 750;
    numPills = 2;
    numVaccines = 1;
  } else if (level === 2) {
    numViruses = round(random(15, 20));
    timer = 2000;
   // startingHealth = 500;
    numPills = 1;
    numVaccines = 1;
  }

  startingHealth = 1000;
  imgResized = false;
  health = startingHealth;
  infectedViruses = [];
  viruses = [];
  pills = [];
  vaccines = [];
  userIsInfected = false;
  gameIsOver = false;
  gameOverText = "";
  healingText = "";
  imgX = width / 2;
  imgY = height / 2;

  for (let i = 0; i < numViruses; i++) {
    viruses.push(new Virus());
  }

  for (let i = 0; i < numPills; i++) {
    pills.push(new Pill());
  }

  for (let i = 0; i < numVaccines; i++) {
    vaccines.push(new Vaccine());
  }

  timerCushion = timer / 100;
  healthCushion = health / 100;
}

function drawPlayScreen() {
  imageMode(CENTER);

  image(livingRoomImg, imgX, imgY);

  stroke(255);
  strokeWeight(4);
  textFont(font);
  // only want to resize it once to help efficiency
  if (!imgResized) {
    livingRoomImg.resize(windowWidth * 1.5, 0);
    imgResized = true;
  }

  checkMousePosition();
  for (let i = 0; i < viruses.length; i++) {
    viruses[i].show();
  }

  if (gameIsOver) {
    fill("black");
    userIsInfected = false;
    textAlign(CENTER);
    text(gameOverText, width / 2, height / 2);
  }

  if (userIsInfected) {
    pillIsUsed = false;
    vaccineIsUsed = false;
    healingText = "";
    for (let i = 0; i < pills.length; i++) {
      pills[i].show();
    }

    for (let i = 0; i < vaccines.length; i++) {
      vaccines[i].show();
    }

    for (let i = 0; i < infectedViruses.length; i++) {
      infectedViruses[i].show();
    }
    textAlign(CENTER);
    fill("black");
    text(
      "Oh no! The virus got too close and infected you!",
      width / 2,
      height / 2 - 10
    );
    text("Your health is decreasing.", width / 2, height / 2 + 10);
    text("Look for medicine to heal you!", width / 2, height / 2 + 30);
    // virusAttach.play();
  } else if (pillIsUsed && !gameIsOver) {
    healingText = "Your health is no longer decreasing!";
    if (viruses.length === 0) {
      gameOver("win");
    }
  } else if (vaccineIsUsed) {
    healingText = "Wow, you're fully healed!";
    if (viruses.length === 0) {
      gameOver("win");
    }
  }

  text(healingText, width / 2, height / 2);
  handleTime();
  handleHealth("");
  fill("black");
  textAlign(LEFT);
  text("Time", 10, 15);
  textAlign(RIGHT);
  text("Health", width - 20, 15);
  textAlign(CENTER);

  if (level === 0 || level === 1) {
    fill("white");
    noStroke();
    rect(width - 150, height * 0.93, 170, height - 85, 20);
    fill("black");
    text("Viruses Remaining: ", width / 2, height * 0.9);
    textFont("Helvetica");
    text(viruses.length, width * 0.65, height * 0.9);
  }

  //console.log(viruses.length);
}

/* ----------------------------END SCREEN --------------------------------------- */
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

function drawEndScreen() {
  noStroke();
  background("#ffc9b2");
  fill(255);
  textFont(font);
  textSize(20);
  text(gameOverText, width / 2, height * 0.45);

  tryAgainButton.show();
  homeButton.show();

  homeButton.mousePressed();
  tryAgainButton.mousePressed();
}
