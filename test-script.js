/*global createCanvas, imageMode, collidePointRect, Virus, stroke, strokeWeight, LEFT, RIGHT, round, textAlign, rectMode, CORNER, random, key, image, collidePointCircle, ellipse, CORNERS, colorMode, loadImage, textSize, getAudioContext, loadFont, textFont, textAlign, text, noStroke, HSB, background, collideRectCircle, mouseX, mouseY, fill, windowWidth, windowHeight, width, height, soundFormats, loadSound, rect, rectMode, CENTER*/

let canvas,
  livingRoomImg,
  imgX,
  imgY,
  font,
  finalImg,
  virusImg,
  viruses,
  title,
  currentVirus,
  timer,
  health,
  gameIsOver,
  gameOverText,
  timerCushion,
  userIsInfected,
  infectedViruses, screen = 0, buttonW, buttonH, buttonFill, buttonShadowFill, level, easyButtonY, easyButtonClicked;

function preload() {
    title = loadFont("https://cdn.glitch.com/b409a92a-1f80-49e0-a812-620661773dbd%2FHeading-Pro-Wide-ExtraBold-trial.ttf?v=1596837029666")
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
  canvas = createCanvas(400, 400);
  canvas.parent("canvas-div");
  colorMode(HSB);
  buttonFill = [5, 50, 100];
  buttonShadowFill = [5, 60, 100];
  buttonW = width / 5;
  buttonH = height / 12;
  easyButtonY = height * .75;
  if(screen === 1){
    playScreenSetup();
  }
  
  
}
function draw() {
  
  if(screen === 0){
    drawStartScreen();
  } else if(screen === 1){
    drawPlayScreen();
  } else if (screen === 2){
    drawEndScreen();
  }
}

function playScreenSetup(){
  infectedViruses = [];
  userIsInfected = false;
  gameIsOver = false;
  gameOverText = ""
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

function drawStartScreen(){
  background("#ffc9b2");
  fill(255)
  textFont(title)
  textSize(70)
 // textAscent(200)
  textAlign(CENTER);
  text("title", width /2, height * .25);
  textFont(font)
  textSize(12)
  text("instructions", width /2, height * .45);
  text("click to start", width /2, height * .55);
  text("made for melonjam twentytwenty", width /2, height * .95);
  drawButtons();
  
}
function drawPlayScreen(){
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

function drawEndScreen(){
  background(100);
  textAlign(CENTER);
  text(gameOverText, width /2, height * .45);
  text("click to try again", width /2, height * .55);
  
}

function drawButtons(){
  rectMode(CENTER);
  noStroke();
  fill(buttonShadowFill);
  rect(width / 2, height * .75 + 5, buttonW, buttonH, 10);
  rect(width / 4, height * .75 + 5, buttonW, buttonH, 10);
  rect(width * .75, height * .75 + 5, buttonW, buttonH, 10);
  fill(buttonFill);
  rect(width / 2, height * .75, buttonW, buttonH, 10);
  rect(width / 4, easyButtonY, buttonW, buttonH, 10);
  rect(width * .75, height * .75, buttonW, buttonH, 10);
  textAlign(CENTER);
  fill("white")
  text("easy", width / 4, height * .76)
  text("medium", width / 2, height * .76)
  text("hard", width * .75, height * .76)
}
function mouseClicked() {
  
   if(screen === 2){
    screen=0;
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


function mousePressed(){
  if(screen === 0){
    easyButtonClicked = collidePointRect(mouseX, mouseY, width / 4, - buttonW easyButtonY, buttonW, buttonH);
    console.log(easyButtonClicked)
    if(easyButtonClicked){
      console.log("clicked")
      //level = 0;
      easyButtonY +=5;
      //drawButtons();
    }
    //screen++;
   // setTimeout(setup, 500);
   
  }
}
function mouseReleased(){
  if(screen === 0){
    if(easyButtonClicked){
      console.log("undo")
      easyButtonClicked = false;
      easyButtonY -= 5;
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
  screen++
}
