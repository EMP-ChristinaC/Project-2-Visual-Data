
//Credit to
/*
Textbox Sound Effect:
jonasfdb
https://www.youtube.com/watch?v=CD1-2eZA2Zo

Music Background:
Pix
https://www.youtube.com/watch?v=D5L36JDKxR0

Character Sprite:
Elizabeth Gray
https://www.pinterest.com/pin/heres-some-free-bonus-sprites-enjoy--280560251767070398/

Quest Image:
Doglysium
https://www.deviantart.com/doglysium/art/Exclamation-Mark-Signos-de-exclamacion-920533126

Background Image:
Franekk
https://x.com/Franrekk/status/1818599856807825465

Button, Footstep Sound Effect:
ZapSplat

*/

//background image
let backgroundImg;

//data
let yearData = {};
let countTotal = 0;

//character movement
let moveX = 50;
let moveY = 50;
let switchimage = 0;
let interval = 200;
let showimage = true;

//buttcon placement
let buttonSpots = [
  [110, 515],
  [280, 320],
  [620, 215],
  [830, 115],
  [970, 365],
];
let buttonDistance = 35;


//footstep sound
let sounds = [
  new Audio('music/footstep1.mp3'),
  new Audio('music/footstep2.mp3'),
  new Audio('music/footstep3.mp3'),
  new Audio('music/footstep4.mp3')
]

let isPlaying = false;
let playInterval;

//character trail
let playerTrail = [];
let trailLimit = 600;


function preload() {
  backgroundImg = loadImage("images/World-Map.png");
  markerImg = loadImage("images/Marker.png");

  spriteUpImg = loadImage("images/SpriteUM.png");
  spriteUpTwoImg = loadImage("images/SpriteUR.png");


  spriteDownImg = loadImage("images/SpriteDM.png");
  spriteDownTwoImg = loadImage("images/SpriteDL.png");


  spriteLeftImg = loadImage("images/SpriteLM.png");
  spriteLeftTwoImg = loadImage("images/SpriteLR.png");


  spriteRightImg = loadImage("images/SpriteRM.png");
  spriteRightTwoImg = loadImage("images/SpriteRL.png");

  Font = loadFont("font/Minecraft.ttf");
  song = loadSound("music/CherryTree.mp3");
  button = loadSound("music/buttonpress 2.mp3");
  textbox = loadSound("music/textbox.mp3");

  data = loadJSON("SwitchGames.json");
}

function setup() {
  let canvas = createCanvas(1100, 600); //this is needed to create a div id for our canvas
  canvas.parent('portrait');

  //filtering json data
  for (var item in data) {
    if (data.hasOwnProperty(item)) {
      if (data[item]["Genre"].toLowerCase().includes("adventure")) {
        let tempYear = data[item]["Year"];
        yearData[tempYear] = (yearData[tempYear] || 0) + 1;
        countTotal++;
      }
    }
  };

  console.log("Total Games: " + countTotal);
  console.log(yearData);
  //font
  textFont(Font);

}

function draw() {
  
  //backgroung image
  background(220);
  imageMode(CENTER);
  image(backgroundImg, 550, 300, 1100, 600);

  //Buttons The Player Will Hover 
  //Locations will be determined how much games were made in that year.
  //Looks like a line graph
  for (let i = 0; i < buttonSpots.length; i++) {
    strokeWeight(4);
    fill(212, 175, 55);
    ellipse(buttonSpots[i][0], buttonSpots[i][1] + 5, 75, 25);

    strokeWeight(3);
    fill(31, 79, 209);
    ellipse(buttonSpots[i][0], buttonSpots[i][1], 55, 20);
  }

  //Where the information will show up
  let onSpot = null;
  for (let i = 0; i < buttonSpots.length; i++) {
    if (buttonSpots[i][0] - buttonDistance < moveX
      && moveX < buttonSpots[i][0] + buttonDistance
      && buttonSpots[i][1] - buttonDistance < moveY
      && moveY < buttonSpots[i][1] + buttonDistance) {

      onSpot = i;

      switch (onSpot) {
        case 0:
          boxTest("2017");
          //text("2017 - " + yearData["2017"], 55, 100);
          break;
        case 1:
          boxTest("2018");
          //text("2018 - " + yearData["2018"], 45, 100);
          break;
        case 2:
          boxTest("2019");
          //text("2019 - " + yearData["2019"], 45, 100);
          break;
        case 3:
          boxTest("2020");
          //text("2020 - " + yearData["2020"], 45, 100);
          break;
        case 4:
          boxTest("2021");
          //text("2021 - " + yearData["2021"], 45, 100);
          break;
        default:
          break;
      }
    }
  }
  if (onSpot == null)
    boxReset();
  quest();
  gameKey();

  //world box reset
}
function boxReset() {
  slide = 0;
  keyType = 0;
  result1 = "";
  result2 = "";
  buttonSound1 = true;
  textboxSound = true;
}

//world text
function boxTest(year) {

  if (buttonSound1) {
    button.play();
    buttonSound1 = false;
  }
  if (textboxSound) {
    textbox.play();
    textboxSound = false;
  }
  strokeWeight(3);
  fill(34, 186, 26);
  rect(5, 5, 280 * slide / 100, 130 * slide / 100);

  if (slide <= 100) {
    slide += 5
  }
  else {

    //World Text
    strokeWeight(3);
    fill(0);
    textSize(40);

    let world = 'World';
    let yearTest = year + " - ";


    if (keyType <= 10 && keyType % 2 == 0) {
      result1 = world.slice(0, keyType / 2);
    }

    text(result1, 90, 50);

    if (keyType >= 10 && keyType < 25 && keyType % 2 == 0) {
      result2 = yearTest.slice(0, (keyType - 10) / 2)
    }

    text(result2, 45, 100);

    if (keyType == 30) {
      text(yearData[year], 180, 100);
    }

    if (keyType < 30) {
      keyType++;
    }
  }
}


buttonSound2 = true;
// quest information
function quest() {

  if (mouseX > 0 && mouseX < 50 && mouseY > 480 && mouseY < 600) {
    if (buttonSound) {
      button.play();
      buttonSound = false;
    }
    //Box Pop Up
    strokeWeight(3);
    fill(255);
    rect(5, 465, 280, 130);

    //Instruction Pop Up
    strokeWeight(10);
    fill(0);
    textSize(20);
    text('How To Read World Data:', 10, 490);
    textSize(15);
    text('The first number is the year.\nThe second number is how much\ngames were made in the year.\n\nEx:[Year-GameMade]', 10, 510);
  } else {
    buttonSound = true;
    image(markerImg, 30, 540, 100, 150);
  }
}

stepInterval = 0;

//footstep play
function playRandomSound() {
  //if (isPlaying) return;

  //isPlaying = true;
  //playInterval = setInterval(() => {


    if (stepInterval == 0) {
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound.play();
    }

    stepInterval++;

    if (stepInterval >= 20) {
      stepInterval = 0;
    }
  //}, 300);
}

//player game control

musicPlay = true;

function gameKey() {

  strokeWeight(3);
  for (let i = 0; i < playerTrail.length; i++) {

    if (i == playerTrail.length - 1) {
      line(playerTrail[i][1], playerTrail[i][2], moveX, moveY);
    }
    else {
      line(playerTrail[i][1], playerTrail[i][2], playerTrail[i + 1][1], playerTrail[i + 1][2]);
    }

  }


  if (playerTrail.length > trailLimit) {
    playerTrail.shift();
  }

  let currentSprite = spriteDownImg;
//keys
  if (keyIsDown(UP_ARROW) ||
  keyIsDown(DOWN_ARROW) ||
  keyIsDown(LEFT_ARROW) ||
  keyIsDown(RIGHT_ARROW) ) {
  playRandomSound();
  if (musicPlay) {
    song.loop();
    musicPlay = false;
  }
}

  if (keyIsDown(UP_ARROW)) {
    moveY = moveY - 5;
    if (showimage) {
      currentSprite = spriteUpImg;
    } else {
      currentSprite = spriteUpTwoImg;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    moveY = moveY + 5;
    if (showimage) {
      currentSprite = spriteDownImg;
    } else {
      currentSprite = spriteDownTwoImg;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    moveX = moveX - 5;
    if (showimage) {
      currentSprite = spriteLeftImg;
    } else {
      currentSprite = spriteLeftTwoImg;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    moveX = moveX + 5;
    if (showimage) {
      currentSprite = spriteRightImg;
    }
    else {
      currentSprite = spriteRightTwoImg;
    }
  }

  if (millis() - switchimage > interval) {
    showimage = !showimage;
    switchimage = millis();
  }


  image(currentSprite, moveX, moveY, 50, 50);
  playerTrail.push([currentSprite, moveX, moveY]);

let canvasWidth = 1100;
let canvasHeight = 600;
let playerWidth = 50;
let playerHeight = 50;

  if (moveX < 50) {
    moveX = 50;
  }
  if (moveX > canvasWidth - playerWidth) {
    moveX = canvasWidth - playerWidth;
  }
  if (moveY < 50) {
    moveY = 50;
  }
  if (moveY > canvasHeight - playerHeight) {
    moveY = canvasHeight - playerHeight;
  }

}
