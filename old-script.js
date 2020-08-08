/*global createCanvas, imageMode, Virus, stroke, strokeWeight, LEFT, RIGHT, round, textAlign, rectMode, CORNER, random, key, image, collidePointCircle, ellipse, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/

let canvas,
  livingRoomImg,
  imgX,
  imgY,
  font,
  finalImg,
  virusImg,
  viruses,
  currentVirus,
  virus_attach,
  get_medicine,
  timer,
  title,
  health,
  gameIsOver = false,
  gameOverText = "",
  timerCushion,
  userIsInfected = false,
  infectedViruses = [], screen, pillImg;

function preload() {
  virus_attach = loadSound("https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fvirus_attach.wav?v=1596838911494")
  title = loadFont("https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2FYear%202000.ttf?v=1596836354238")
  font = loadFont(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2FHeading-Pro-Wide-Regular-trial.ttf?v=1596834499234"
  );
  livingRoomImg = loadImage(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2Fliving-room-interior-cartoon-vector-20941629.jpg?v=1596816373329"
  );

  virusImg = loadImage(
    "https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2F6bb45751-0572-4522-8e4d-c9c572b8fe52_smilie-4901128_960_720.png?v=1596824410604"
  );
  
  
}

function setup() {
  canvas = createCanvas(600, 600);
  canvas.parent("canvas-div");
  colorMode(HSB);
  imgX = width / 2;
  imgY = height / 2;
  image(livingRoomImg, imgX, imgY);
  livingRoomImg.resize(windowWidth, 0);
  viruses = [];
  for (let i = 0; i < 3; i++) {
    viruses.push(new Virus());
  }

  timer = 1000;
  timerCushion = timer / 100;
  health = 1000;
}

function draw() {
  background(95);
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
}




function mouseClicked() {
  if (!gameIsOver) {
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
  if (key === "a") {
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
    fill(health / 10, 100, 100);
    rectMode(CORNERS);
    rect(width - 10, 20, width - health / 10, 30);
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
}
