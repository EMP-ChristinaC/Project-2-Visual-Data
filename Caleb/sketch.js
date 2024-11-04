let data;
let games = [];
let counter = 0;
cCounter = 0;
let cursor;
let cursorY = 30;
let sound;
let mCheck = true;
let imgs = ['ff1.png', 'ff2.png', 'ff3.png', 'ff4.png', 'ff5.png', 'ff6.png', 'ff7.png', 'ff8.png', 'ff9.png', ];
let mats = ['materia1.png', 'materia2.png', 'materia3.png', 'materia4.png', 'materia5.png', ]
let mat = [];
let matNum = 0;
let matslot = false;
let victory;
let played = false;


function preload(){
  data = loadJSON("PS1Games.json");
  cursor = loadImage('ffcursor.png');
  sound = loadSound('ffcursorsound.mp3');
  victory = loadSound('victory.mp3');
  for(let i = 0; i < mats.length; i++){
    mat[i] = loadImage(mats[i]);
  }
}

function setup() {
  noCursor();
  createCanvas(600, 400);
  for(i = 0; i < 2000; i++){
    if(data[i].Game.includes("Final Fantasy")){
      let g = data[i].Game;
      let y = data[i].Year;
      let d = data[i].Dev;
      let p = data[i].Publisher;
      let img = loadImage(imgs[counter]);
      games[counter] = new Game(g, y, d, p, img);
      counter++;
    }
  }
  
}
function mousePressed(){
  if(sound.isPlaying() == false){
    sound.play();
  }
  if(matNum == 0){
    if(dist(mouseX, mouseY, 100, 300) <= 20){
      matNum++;
    }
  }
  else if(matNum == 1){
    if(dist(mouseX, mouseY, 200, 300) <= 20){
      matNum++;
    }
    
  }
  else if(matNum == 2){
    if(dist(mouseX, mouseY, 300, 300) <= 20){
      matNum++;
    }
  }
  else if(matNum == 3){
    if(dist(mouseX, mouseY, 400, 300) <= 20){
      matNum++;
    }
  }
  else if(matNum == 4){
    if(dist(mouseX, mouseY, 500, 300) <= 20){
      matNum++;
    }
  }
}
    

function keyPressed(){
  if(key == 'e'){
      matNum = 0;
      console.log(cursorY, cCounter);
      gameScreen();
      mCheck = false;
  }
  
  if(mCheck == true){
    if(keyCode == UP_ARROW){
      cursorY -= 40;
      console.log(cursorY, cCounter);
      sound.play();
      cCounter--;
    }
    
    if(keyCode == DOWN_ARROW){
      cursorY += 40;
      console.log(cursorY, cCounter);
      sound.play();
      cCounter++;
    }
    if(cursorY < 30 ){
      cursorY = 350;
      cCounter = games.length - 1;
    }
    if(cursorY > 350){
      cursorY = 30;
      cCounter = 0;
    }
    
  }
  if(key == 'd' && mCheck == false){
    
    
  }
  if(key == 'b'){
    console.log(cursorY, cCounter);
    mCheck = true;
    matNum = 0;
    victory.stop();
    played = false;
  }
  
}



function draw() {
  
  if(mCheck == true){
    background(0);
    fill(0, 0, 200);
    stroke(255);
    strokeWeight(2);
    rectMode(CENTER);
    rect(width/2, height/2, width - 10, height - 10, 10);
    fill(255);
    let gameY = 30;
    let memberY = gameY + 10;
    for(i = 0; i < 9; i++){
      noStroke();
      text(games[i].game, 50, gameY);
      gameY += 40;
    }
    tint(255, 255);
    imageMode(CENTER);
    image(cursor, 30, cursorY, 25, 15);
  }
  else{
    gameScreen();
  }
  if(matNum == 5){
    image(mat[4], mouseX, mouseY, 40, 40);
  }
  else{
    image(mat[matNum], mouseX, mouseY, 40, 40);
  }
  
}

function gameScreen(){
  background(0);
  fill(0, 0, 200);
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);
  rect(width/2, height/2, width - 10, height - 10, 10);
  fill(255);
  noStroke();
  for(let i = 0; i < mat.length; i++){
    if(matslot == false){
      tint(255, 50);
    }
    image(mat[i], 100+i*100, 300, 40, 40);
    tint(255, 128);
  }
  
  if(matNum == 1){
    tint(255, 255);
    image(mat[0], 100+0*100, 300, 40, 40);
    text(games[cCounter].game, 50, 30);
  }
  if(matNum == 2){
    tint(255, 255);
    image(mat[0], 100+0*100, 300, 40, 40);
    image(mat[1], 100+1*100, 300, 40, 40);
    text(games[cCounter].game, 50, 30);
    text(games[cCounter].year, 50, 80);
  }
  if(matNum == 3){
    tint(255, 255);
    image(mat[0], 100+0*100, 300, 40, 40);
    image(mat[1], 100+1*100, 300, 40, 40);
    image(mat[2], 100+2*100, 300, 40, 40);
    text(games[cCounter].game, 50, 30);
    text(games[cCounter].year, 50, 80);
    text(games[cCounter].dev, 50, 130);
  }
  if(matNum == 4){
    tint(255, 255);
    image(mat[0], 100+0*100, 300, 40, 40);
    image(mat[1], 100+1*100, 300, 40, 40);
    image(mat[2], 100+2*100, 300, 40, 40);
    image(mat[3], 100+3*100, 300, 40, 40);
    text(games[cCounter].game, 50, 30);
    text(games[cCounter].year, 50, 80);
    text(games[cCounter].dev, 50, 130);
    text(games[cCounter].pub, 50, 180);
  }
  if(matNum == 5){
    tint(255, 255);
    image(mat[0], 100+0*100, 300, 40, 40);
    image(mat[1], 100+1*100, 300, 40, 40);
    image(mat[2], 100+2*100, 300, 40, 40);
    image(mat[3], 100+3*100, 300, 40, 40);
    image(mat[4], 100+4*100, 300, 40, 40);
    image(games[cCounter].img, width/2, height/2, width, height);
    if(victory.isPlaying() == false && played == false){
      victory.play();
      played = true;
    }
  }
  console.log(mouseX, mouseY);
}

class Game{
  constructor(tempG, tempY, tempD, tempP, tempI){
    this.game = tempG;
    this.year = tempY;
    this.dev = tempD;
    this.pub = tempP;
    this.img = tempI;
  }
}
