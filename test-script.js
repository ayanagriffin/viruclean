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
  numViruses;

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
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fliving-room-interior-cartoon-vector-20941629.jpg?v=1596816373329"
  );

  virusImg = loadImage(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fvirus.png?v=1596839714148"
  );
}

function setup() {
  canvas = createCanvas(400, 400);
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
}
function draw() {
  if (screen === 0) {
    drawStartScreen();
  } else if (screen === 1) {
    drawPlayScreen();
  } else if (screen === 2) {
    drawEndScreen();
  }
}

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
    text("Viruses Remaining: ", width / 2, height * 0.9);
    textFont("Helvetica");
    text(viruses.length, width * 0.7, height * 0.9);
  }

  //console.log(viruses.length);
}

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

function drawButtons() {
  rectMode(CENTER);
  noStroke();
  fill(buttonShadowFill);
  rect(width / 2, height * 0.75 + 5, buttonW, buttonH, 10);
  rect(width / 4, height * 0.75 + 5, buttonW, buttonH, 10);
  rect(width * 0.75, height * 0.75 + 5, buttonW, buttonH, 10);
  fill(buttonFill);
  rect(width / 2, mediumButtonY, buttonW, buttonH, 10);
  rect(width / 4, easyButtonY, buttonW, buttonH, 10);
  rect(width * 0.75, hardButtonY, buttonW, buttonH, 10);
  textAlign(CENTER);
  textSize(12);
  fill("white");
  text("Easy", width / 4, height * 0.764);
  text("Medium", width / 2, height * 0.764);
  text("Hard", width * 0.75, height * 0.764);
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
