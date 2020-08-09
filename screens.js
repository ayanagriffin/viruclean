/*global createCanvas, backButton, pBoldFont, paragraphFont, stillPose, virusImg, vaccineImg, leftPose, rightPose, upPose, downPose, pillImg, tryAgainButton, homeButton, nextButton, healingText, Vaccine numVaccines, pillIsUsed, vaccineIsUsed, Pill, vaccines, startingHealth, imgResized, pills, numPills, font, handleTime, handleHealth, livingRoomImg, timerCushion, healthCushion, checkMousePosition, title, drawButtons, level, numViruses, timer, health, infectedViruses, viruses, gameIsOver, userIsInfected, imgX, imgY, gameOverText, imageMode, playScreenSetup, drawStartScreen, drawEndScreen, Button, drawPlayScreen, collidePointRect, Virus, stroke, strokeWeight, LEFT, RIGHT, round, textAlign, rectMode, CORNER, random, key, image, collidePointCircle, ellipse, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/


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
  textSize(50);
  textAlign(CENTER);
  text("Viru   Clean", width / 2, height * 0.25);
  textFont(font);
  textSize(12);
  text(
    "Pose for the camera to find and eradicate the\n\ncoronavirus before it's too late!",
    width / 2,
    height * 0.34
  );
  
  imageMode(CENTER);
  image(sprayBottleImg, width* 0.46, height * .222, 70, 70)
  image(pillImg, width* 0.32, height * .50, 65, 65)
  image(vaccineImg, width* 0.67, height * .50, 70, 70)

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
  textFont(pBoldFont);
  text("This is the VIRUS.", width * 0.7, height * 0.28, width * .8, height / 4);
  textFont(paragraphFont);
  text("To eradicate it, click it, then press the spacebar to\n\n'spray' it before it gets too big!", width * 0.7, height * 0.31, width * .8, height / 4);
  
  textSize(14);
  textAlign(CENTER);
  textFont(font);
  text("If the virus hits you...", width / 2, height * .41, width * .8, height / 4)
  
  image(pillImg, width* 0.2, height * .37, 55, 55);
  textSize(12);
  textAlign(LEFT);
  textFont(pBoldFont);
  text("This is your MEDICINE.", width * 0.7, height * 0.46, width * .8, height / 4);
  textFont(paragraphFont);
  text("Find and click on it to stop your health from\n\ndecreasing.", width * 0.7, height * 0.49, width * .8, height / 4);
  
  image(vaccineImg, width* 0.2, height * .49, 55, 55);
  textSize(12);
  textAlign(LEFT);
  textFont(pBoldFont);
  text("This is the VACCINE.", width * 0.7, height * 0.58, width * .8, height / 4);
  textFont(paragraphFont);
  text("Find and click on it to restore your health.", width * 0.7, height * 0.615, width * .8, height / 4);
  
  textSize(14);
  textAlign(CENTER);
  textFont(font);
  text("To look around the room...", width / 2, height * .69, width * .8, height / 4)
  textSize(12);
  textFont(paragraphFont);
  text("Pose for the camera using these four poses!\n\n Allow the camera permissions and try it out!", width / 2, height * .73, width * .8, height / 4)
  
  image(upPose, width* 0.24, height * .72, 65, 65);
  image(downPose, width* 0.39, height * .72, 65, 65);
  image(rightPose, width* 0.64, height * .72, 65, 65);
  image(leftPose, width* 0.54, height * .72, 65, 65);
  image(stillPose, width* 0.78, height * .72, 65, 65);
  
  textFont(pBoldFont);
  text("Up", width / 4.25, height * .8)
  text("Down", width / 2.55, height * .8)
  text("Left", width * .52, height * .8)
  text("Right", width * .65, height * .8)
  text("Stop Screen", width * .785, height * .8)
 
}

/* ---------------------------- PLAY SCREEN --------------------------------------- */

function playScreenSetup() {
  if (level === 0) {
    numViruses = 4;
    timer = 1500;
    //startingHealth = 1000;
    numPills = 2;
    numVaccines = 2;
  } else if (level === 1) {
    numViruses = 8;
    timer = 1500;
   // startingHealth = 750;
    numPills = 2;
    numVaccines = 1;
  } else if (level === 2) {
    numViruses = round(random(15, 20));
    timer = 2000;
   // startingHealth = 500;
    numPills = 3;
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

  pillIsUsed = false;
  vaccineIsUsed = false;
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
  } else if (vaccineIsUsed && !gameIsOver) {
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
  healingText = "";
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
