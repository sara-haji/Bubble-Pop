// variables
let movingBubbleSpeed = [];
let movingBubbleSize;
let movingBubbleNum = 20;

let movingBubbleUpX = [];
let movingBubbleUpY = [];
let movingBubbleUpIsRect = [];

let movingBubbleDownX = [];
let movingBubbleDownY = [];
let movingBubbleDownIsRect = [];

let movingBubbleLeftX = [];
let movingBubbleLeftY = [];
let movingBubbleLeftIsRect = [];

let movingBubbleRightX = [];
let movingBubbleRightY = [];
let movingBubbleRightIsRect = [];

let score;

let maxTime = 60 * 20;
let timer;

let imgWinner;

let selected = "M";

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);

  // initialization of bubbles at the start of the game as well as timer
  initializationBubblesUp();
  initializationBubblesDown();
  initializationBubblesLeft();
  initializationBubblesRight();
  timer = maxTime;
}

function draw() {
  //print(selected);
  background(0);

  // press S to start game
  // basic concept 2/5: conditionals
  if (selected === "S") {
    // basic concept 3/5: user-defined functions
    movingBubbleUp();
    upHitTest();
    movingBubbleDown();
    downHitTest();
    movingBubbleLeft();
    leftHitTest();
    movingBubbleRight();
    rightHitTest();
    drawScore();
    Timer();
  } else {
    // shows menu before pressing start
    menu();
  }

  // controls menu screens such as the gameOver screen and the youWin screen
  if (selected === "G") {
    gameOver();
  } else if (selected === "R") {
    menu();
  }

  if (selected === "T") {
    youWin();
  }
}

// menu
function menu() {
  score = 30; 
  background(0);

  // title of game
  strokeWeight(10);
  textFont('ArialRoundedMTBold');
  stroke(157, 241, 255); // blue
  fill(255, 157, 244); // pink
  textSize(120);

  text("Bubble Pop!", 45, 180);

  // rectangle border around instructions
  strokeWeight(5);
  stroke(255, 157, 244); // pink
  fill(0); // black
  rect(390, 390, 750, 325);

  // Instructions
  textFont('AppleGothic');
  textSize(45);
  stroke(0);
  strokeWeight(0);
  fill(157, 241, 255); // light blue

  text('POP the bubbles with your mouse', 40, 300);
  text('in order to increase your score.', 70, 350);

  text('But ', 200, 400);
  fill('#FF527E'); // coral
  text('WATCH OUT!!!', 280, 400);

  fill(157, 241, 255); // light blue
  text('The        ones make you lose 2pts', 30, 450);
  text('and the           ones end the game!', 30, 500);

  fill(255, 157, 244); // pink
  text('pink', 125, 450);

  fill(197, 82, 255); // light purple
  text('purple', 200, 500);
  text("click the 'S' key to start the game", 45, 650);

  textSize(20);
  fill(255, 157, 244); // pink
  text("Created By: Sara Haji", 300, 700);
}

// displays the gameOver screen
function gameOver() {
  selected = "G";
  background(0);
  strokeWeight(10);
  textFont('ArialRoundedMTBold');
  stroke(157, 241, 255); // blue
  fill(255, 157, 244); // pink

  textSize(110);
  text("Game Over :(", 40, 400);

  textSize(30);
  noStroke();
  fill(157, 241, 255);
  textFont('AppleGothic');
  text("PRESS 'R' TO RETURN TO MENU", 130, 500);
}

// displays the winner image on the winner screen
// extended concepts 3/3: loading and displaying images
function winnerImage() {
  imgWinner = loadImage("data/winner.jpg");
  image(imgWinner, 50, 50);
}

// displays the youWin screen
function youWin() {
  winnerImage();
  selected = "T";
  score = 100;
  background(0);
  strokeWeight(10);
  textFont('ArialRoundedMTBold');
  stroke(157, 241, 255); // blue
  fill(255, 157, 244); // pink
  textSize(110);

  text("You Win :)", 120, 400);

  textSize(30);
  noStroke();
  fill(157, 241, 255);
  textFont('AppleGothic');

  text("PRESS 'R' TO RETURN TO MENU", 130, 500);
}

// initializations for all directions of bubbles
function initializationBubblesUp() {
  movingBubblesSize = width / 20;
  score = 0;

  for (let i = 0; i < movingBubbleNum; i++) {
    movingBubbleUpX[i]= random(20, 780);
    movingBubbleUpY[i] = random(600, 800); 
    if (random() < 0.5) {
      movingBubbleUpIsRect[i] = true;
    } else {
      movingBubbleUpIsRect[i] = false;
    }
    movingBubbleSpeed[i] = random(0.5, 2);
  }
  score = 0;
}

function initializationBubblesDown() {
  movingBubblesSize = width / 15;
  score = 0;

  for (let i = 0; i < movingBubbleNum; i++) {
    movingBubbleDownX[i]= random(20, 780);
    movingBubbleDownY[i] = random(-10, 350); 
    if (random() < 0.5) {
      movingBubbleDownIsRect[i] = true;
    } else {
      movingBubbleDownIsRect[i] = false;
    }
    movingBubbleSpeed[i] = random(0.5, 2);
  }
}

function initializationBubblesLeft() {
  movingBubbleSize = width / 22;
  score = 0;

  for (let i = 0; i < movingBubbleNum; i++) {
    movingBubbleLeftX[i]= random(600, 800);
    movingBubbleLeftY[i] = random(0, 780);
    if (random() < 0.5) {
      movingBubbleLeftIsRect[i] = true;
    } else {
      movingBubbleLeftIsRect[i] = false;
    }
    movingBubbleSpeed[i] = random(0.5, 2);
  }
}

function initializationBubblesRight() {
  movingBubbleSize = width / 17;
  score = 0;

  for (let i = 0; i < movingBubbleNum; i++) {
    movingBubbleRightX[i]= random(0, 200);
    movingBubbleRightY[i] = random(0, 800);
    if (random() < 0.5) {
      movingBubbleRightIsRect[i] = true;
    } else {
      movingBubbleRightIsRect[i] = false;
    }
    movingBubbleSpeed[i] = random(0.5, 2);
  }
}

// direction of movement for each bubble
function movingBubbleUp() {
  strokeWeight(1);
  // basic concept 1/5: drawing shapes and using drawing attributes
  stroke(157, 241, 255); // blue
  for (let i = 0; i < movingBubbleNum; i++) {
    if (movingBubbleUpIsRect[i]) {
      fill(255, 157, 244, 99); // pink
      ellipse(movingBubbleUpX[i], movingBubbleUpY[i], movingBubblesSize, movingBubblesSize);
    } else {
      fill(54, 218, 245, 95); // blue
      ellipse(movingBubbleUpX[i], movingBubbleUpY[i], movingBubblesSize, movingBubblesSize);
    }
    movingBubbleUpY[i] -= movingBubbleSpeed[i];
  }
}

function movingBubbleDown() {
  strokeWeight(1);
  stroke(157, 241, 255); // blue

  // basci concept 4/5: loops
  for (let i = 0; i < movingBubbleNum; i++) {
    if (movingBubbleDownIsRect[i]) {
      fill(96, 245, 122, 95); //green
      ellipse(movingBubbleDownX[i], movingBubbleDownY[i], movingBubblesSize, movingBubblesSize);
    } else {
      fill(168, 82, 255, 95); // deadly purple
      ellipse(movingBubbleDownX[i], movingBubbleDownY[i], movingBubblesSize, movingBubblesSize);
    }
    movingBubbleDownY[i] += movingBubbleSpeed[i];
  }
}

function movingBubbleLeft() {
  strokeWeight(1);
  stroke(157, 241, 255); // blue
  for (let i = 0; i < movingBubbleNum; i++) {
    if (movingBubbleLeftIsRect[i]) {
      fill(255, 157, 244, 95); // pink
      ellipse(movingBubbleLeftX[i], movingBubbleLeftY[i], movingBubbleSize, movingBubbleSize);
    } else {
      fill(54, 218, 245, 95); // blue
      ellipse(movingBubbleLeftX[i], movingBubbleLeftY[i], movingBubbleSize, movingBubbleSize);
    }

    movingBubbleLeftX[i] -= movingBubbleSpeed[i];
  }
}

function movingBubbleRight() {
  strokeWeight(1);
  stroke(157, 241, 255); // blue
  for (let i = 0; i < movingBubbleNum; i++) {
    if (movingBubbleRightIsRect[i]) {
      fill(96, 245, 122, 95); //green
      ellipse(movingBubbleRightX[i], movingBubbleRightY[i], movingBubbleSize, movingBubbleSize);
    } else {
      fill(245, 228, 96, 95); // yellow
      ellipse(movingBubbleRightX[i], movingBubbleRightY[i], movingBubbleSize, movingBubbleSize);
    }

    movingBubbleRightX[i] += movingBubbleSpeed[i];
  }
}

// reset bubble functions
function resetOneBubbleUp(i) {
  movingBubbleUpX[i] = random(20, 780);
  movingBubbleUpY[i] = random(20, 780); 
  if (random() < 0.5) {
    movingBubbleUpIsRect[i] = true;
  } else {
    movingBubbleUpIsRect[i] = false;
  }
  movingBubbleSpeed[i] = random(0.5, 2);
}

function resetOneBubbleDown(i) {
  movingBubbleDownX[i] = random(20, 780);
  movingBubbleDownY[i] = random(20, 780); 
  if (random() < 0.5) {
    movingBubbleDownIsRect[i] = true;
  } else {
    movingBubbleDownIsRect[i] = false;
  }
  movingBubbleSpeed[i] = random(0.5, 2);
}

function resetOneBubbleLeft(i) {
  movingBubbleLeftX[i]= random(20, 780);
  movingBubbleLeftY[i] = random(0, 780);
  if (random() < 0.5) {
    movingBubbleLeftIsRect[i] = true;
  } else {
    movingBubbleLeftIsRect[i] = false;
  }
  movingBubbleSpeed[i] = random(0.5, 2);
}

function resetOneBubbleRight(i) {
  movingBubbleRightX[i] = random(20, 780);
  movingBubbleRightY[i] = random(20, 780);
  if (random() < 0.5) {
    movingBubbleRightIsRect[i] = true;
  } else {
    movingBubbleRightIsRect[i] = false;
  }
  movingBubbleSpeed[i] = random(0.5, 2);
}

// Hittests
// extended concepts 1/3: circle hit testing
function upHitTest() {
  for (let i = 0; i < movingBubbleNum; i++) {
    if (movingBubbleUpIsRect[i]) {
      if (mouseX > movingBubbleUpX[i] - movingBubblesSize / 2 &&
        mouseX < movingBubbleUpX[i] + movingBubblesSize / 2 &&
        mouseY > movingBubbleUpY[i] - movingBubblesSize / 2 &&
        mouseY < movingBubbleUpY[i] + movingBubblesSize / 2) {
        score = score - 2;
        resetOneBubbleUp(i);
      }
    } else if (dist(mouseX, mouseY, 
      movingBubbleUpX[i], movingBubbleUpY[i]) < movingBubblesSize / 2) {
      score = score + 1;
      resetOneBubbleUp(i);
    } 

    if (movingBubbleUpY[i] < 0 + movingBubblesSize / 2) {
      resetOneBubbleUp(i);
    }
  }
}

function downHitTest() {
  for (let i = 0; i < movingBubbleNum; i++) {
    if (movingBubbleDownIsRect[i]) {
      if (mouseX > movingBubbleDownX[i] - movingBubblesSize / 2 &&
        mouseX < movingBubbleDownX[i] + movingBubblesSize / 2 &&
        mouseY > movingBubbleDownY[i] - movingBubblesSize / 2 &&
        mouseY < movingBubbleDownY[i] + movingBubblesSize / 2) {
        score = score + 1;
        resetOneBubbleDown(i);
      }
    } else if (dist(mouseX, mouseY, 
      movingBubbleDownX[i], movingBubbleDownY[i]) < movingBubblesSize / 2) {
      selected = "G";
      score = 0;
      //gameOverScreen();
    }

    if (movingBubbleDownY[i] > height + movingBubblesSize / 2) {
      resetOneBubbleDown(i);
    }
  }
}

function leftHitTest() {
  for (let i = 0; i < movingBubbleNum; i++) {
    // basic concept 5/5: arrays
    if (movingBubbleLeftIsRect[i]) {
      if (mouseX > movingBubbleLeftX[i] - movingBubbleSize / 2 &&
        mouseX < movingBubbleLeftX[i] + movingBubbleSize / 2 &&
        mouseY > movingBubbleLeftY[i] - movingBubbleSize / 2 &&
        mouseY < movingBubbleLeftY[i] + movingBubbleSize / 2) {
        score = score - 2;
        resetOneBubbleLeft(i);
      }
    } else if (dist(mouseX, mouseY, 
      movingBubbleLeftX[i], movingBubbleLeftY[i]) < movingBubbleSize / 2) {
      score = score + 1;
      resetOneBubbleLeft(i);
    } 

    if (movingBubbleLeftX[i] < 0) {
      resetOneBubbleLeft(i);
    }
  }
}

function rightHitTest() {
  for (let i = 0; i < movingBubbleNum; i++) {
    if (movingBubbleRightIsRect[i]) {
      if (mouseX > movingBubbleRightX[i] - movingBubbleSize / 2 &&
        mouseX < movingBubbleRightX[i] + movingBubbleSize / 2 &&
        mouseY > movingBubbleRightY[i] - movingBubbleSize / 2 &&
        mouseY < movingBubbleRightY[i] + movingBubbleSize / 2) {
        score = score + 1;
        resetOneBubbleRight(i);
      }
    } else if (dist(mouseX, mouseY, 
      movingBubbleRightX[i], movingBubbleRightY[i]) < movingBubbleSize / 2) {
      score = score + 1;
      resetOneBubbleRight(i);
    } 

    if (movingBubbleRightX[i] > 800 ) {
      resetOneBubbleRight(i);
    }
  }
}

// key pressed functions
function keyPressed() {
  // extended concepts 2/3: keyboard event functions
  if (key === "s" || key === "S") {
    timer = maxTime;
    selected = "S";
    initializationBubblesUp();
    initializationBubblesDown();
    initializationBubblesLeft();
    initializationBubblesRight();
  }

  if (key === "m" || key === "M") {
    selected = "M";
  }

  if (key === "r" || key === "R") {
    selected = "M";
  }
}

// displays the score on the screen
function drawScore() {
  fill(255);
  noStroke(0);
  textAlign(LEFT);
  textSize(24);
  text("Score: " +  score, 10, 700);

  if (score > 29) {
    youWin();
  }
}

// displays the timer on the screen
function Timer() {
  fill(255);
  noStroke(0);
  textAlign(LEFT);
  textSize(24);
  text("Timer: " + timer, 10, 730);

  timer = timer - 1;
  if (timer === -1) {
    timer = 0;
    gameOver();
    score = 0;
    print(timer);
  }

  if (score > 29) {
    youWin();
  }
}
