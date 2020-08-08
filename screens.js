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
  text("Pose for the camera using these motions to\n find and eradicate the virus!", width / 2, height * 0.35);
  text("Pick a Level to Start", width / 2, height * 0.65);
  textSize(8);
  text("made for melonjam twentytwenty", width / 2, height * 0.95);
  drawButtons();
}

/* ---------------------------- PLAY SCREEN --------------------------------------- */

function playScreenSetup() {
  if (level === 0) {
    numViruses = 3;
    timer = 1000;
    health = 1000;
  } else if (level === 1) {
    numViruses = 6;
    timer = 1500;
    health = 750;
  } else if (level === 2) {
    numViruses = 9;
    timer = 2000;
    health = 500;
  }
  
  infectedViruses = [];
  viruses = [];
  userIsInfected = false;
  gameIsOver = false;
  gameOverText = "";
  imgX = width / 2;
  imgY = height / 2;
  image(livingRoomImg, imgX, imgY);
  livingRoomImg.resize(windowWidth, 0);

  for (let i = 0; i < numViruses; i++) {
    viruses.push(new Virus());
  }

  timerCushion = timer / 100;
  healthCushion = health / 100;
}


function drawPlayScreen() {
  imageMode(CENTER);
  image(livingRoomImg, imgX, imgY);

  checkMousePosition();
  for (let i = 0; i < viruses.length; i++) {
    viruses[i].show();
  }

  for (let i = 0; i < infectedViruses.length; i++) {
    infectedViruses[i].show();
  }

  if (gameIsOver) {
    fill("black");
    userIsInfected = false;
    textAlign(CENTER);
    text(gameOverText, width / 2, height / 2);
  }

  if (userIsInfected) {
    textAlign(CENTER);
    fill("black");
    text(
      "Oh no! The virus got too close and infected you!",
      width / 2,
      height / 2 - 10
    );
    text("Your health is decreasing!", width / 2, height / 2 + 10);
    text("Look for medicine to heal you!", width / 2, height / 2 + 30);
    // virusAttach.play();
  }
  stroke(255);
  strokeWeight(4);
  textFont(font);
  handleTime();
  handleHealth("");
  fill("black");
  textAlign(LEFT);
  text("Time", 10, 15);
  textAlign(RIGHT);
  text("Health", width - 20, 15);
  textAlign(CENTER);
  
  if (level === 0 || level === 1) {
    fill('white');
    noStroke();
    rect(width - 150, height * 0.93 , 170, height - 85, 20);
    fill('black');
    text("Viruses Remaining: ", width / 2, height * 0.9);
    textFont("Helvetica");
    text(viruses.length, width * 0.65, height * 0.9);
  }

  //console.log(viruses.length);
}

/* ----------------------------END SCREEN --------------------------------------- */

function drawEndScreen() {
  noStroke();
  background("#ffc9b2");
  fill(255);
  textFont(font);
  textSize(12);
  textAlign(CENTER);
  text(gameOverText, width / 2, height * 0.45);
  text("click to try again", width / 2, height * 0.55);
}