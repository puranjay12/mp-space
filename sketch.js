var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var rockets, rocket1, rocket2, rocket3, rocket4;

var track, rocket1_img, rocket2_img, rocket3_img, rocket4_img;

function preload(){
  track = loadImage("track.jpg");
  rocket1_img = loadImage("rocket1.png");
  rocket2_img = loadImage("rocket2.png");
  rocket3_img = loadImage("rocket3.png");
  rocket4_img = loadImage("rocket4.png");
  //ground = loadImage("../images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
   
  }
}  

