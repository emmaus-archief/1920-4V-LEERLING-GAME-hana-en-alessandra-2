/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const STARTSCHERM = 0;
const SPELEN = 1;
const GAMEOVER = 2;
//var spelStatus = SPELEN;
var spelStatus = STARTSCHERM;



var spelerX = 200; // x-positie van speler
var spelerY = 100; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 200;   // x-positie van vijand
var vijandY = 50;   // y-positie van vijand

var score = 0; // aantal behaalde punten

var w = 100 // voor wolkjes (was uiteindelijk niet nodig)

var xBeginK = 460 // x-positie startknop
var yBeginK = 320 // y-positie startknop

var p = 100 // voor wolkjes (zorgt voor beweging)



var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);



/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

// teken startscherm
var tekenStartscherm = function () {
    background(255, 245, 105);

    fill(randomColor);
    rect(xBeginK + 5, yBeginK + 150, 390, 100);

    fill(255, 255, 255);
    textSize(28);
    textFont('Helvetica');
    text("Klik op spatie om te beginnen", xBeginK + 15, yBeginK + 210);

    fill(0, 0, 0);
    textSize(85);
    textFont('Courier New');
    text("Sun Catcher", xBeginK - 60, yBeginK - 180);


    noStroke()
    fill(217, 54, 54)
    ellipse(725,325,275,275);
    fill(247, 255, 105)
    ellipse(725,325,250,250);
    fill(181, 255, 243)
    ellipse(725,325,225,225);
    fill(218, 148, 255)
    ellipse(725,325,200,200);
    fill(255, 245, 105)
    
    ellipse(725,325,175,175);
    ellipse(805,370,150,150);
    rect(600,380,200,90);
    fill("white")
    rect(475,w+275,w+50,w-50);
    ellipse(475,w+300,w-50,w-50);
    ellipse(625,w+285,w-20,w-20);
    ellipse(515,w+265,w-30,w-30);
    ellipse(565,w+265,w,w);

    fill("white")
    rect(825,w+175,w+50,w-50);
    ellipse(825,w+200,w-50,w-50);
    ellipse(975,w+185,w-20,w-20);
    ellipse(865,w+165,w-30,w-30);
    ellipse(915,w+165,w,w);
};




/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill("lightblue");
  rect(20, 20, width - 2 * 20, height - 2 * 20);
  fill(93, 201, 127);
  rect(0,450,1400,250);

  //wolk 1
  noStroke()
  fill("white")
  rect(p,w+50,w+50,w-50);
  ellipse(p,w+75,w-50,w-50);
  ellipse(p+150,w+60,w-20,w-20);
  ellipse(p+40,w+40,w-30,w-30);
  ellipse(p+90,w+40,w,w);

  //wolk 2
  noStroke()
  fill("white")
  rect(p+300,w+250,w+50,w-50);
  ellipse(p+300,w+275,w-50,w-50);
  ellipse(p+450,w+260,w-20,w-20);
  ellipse(p+340,w+240,w-30,w-30);
  ellipse(p+390,w+240,w,w);

  // wolk 3
  noStroke()
  fill("white")
  rect(p+800,w+150,w+50,w-50);
  ellipse(p+800,w+175,w-50,w-50);
  ellipse(p+950,w+160,w-20,w-20);
  ellipse(p+840,w+140,w-30,w-30);
  ellipse(p+890,w+140,w,w);
  

  // beweging wolkjes
  p = p + 3;

  if (p > 1250) {
      p = - 1000;
  }
 

// bloem 1
fill(27, 166, 70);
rect(50,370,18,80);
fill(157, 110, 219);
ellipse(80,370,50,30);
ellipse(60,350,30,50);
ellipse(40,370,50,30);
ellipse(60,390,30,50);
fill(187, 232, 151);
ellipse(60,370,30,30);

// bloem 2
fill(27, 166, 70);
rect(460,550,18,70);
fill(62, 103, 184);
ellipse(490,540,50,30);
ellipse(470,560,30,50);
ellipse(450,540,50,30);
ellipse(470,520,30,50);
fill(252, 160, 78);
ellipse(470,540,30,30);

// bloem 3
fill(27, 166, 70);
rect(1050,460,18,75);
fill(245, 242, 93);
ellipse(1080,450,50,30);
ellipse(1060,430,30,50);
ellipse(1040,450,50,30);
ellipse(1060,470,30,50);
fill(240, 158, 237);
ellipse(1060,450,30,30);

// struikje
fill(27, 166, 70);
rect(681, 435, 170, 40);
ellipse(689, 449, 53, 53);
ellipse(730, 450, 50, 50);
ellipse(760, 430, 45, 45);
ellipse(800, 445, 60, 60);
ellipse(845, 450, 50, 50);

// stipjes in struikje
fill(194, 60, 67);
ellipse(700, 445, 10, 10);
ellipse(750, 465, 10, 10);
ellipse(770, 432, 10, 10);
ellipse(813, 450, 10, 10);
ellipse(854   , 436, 10, 10);


};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    fill(255, 213, 0);
    ellipse(x, y, 25, 25);
    

};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {
   


};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */

var tekenSpeler = function(x, y) {
   fill("white");
  //rect(mouseX, 450, 100, 50);
  image(spelerimage, x, y, 200, 195);
  //image(img,10,10,60,50);
  
};

var spelerimage=0;
function preload() {
    spelerimage = loadImage('./plaatjes/mand4.png');
};

var tekenScore = function(x, y) {
    textSize(30);
    fill(53, 39, 207);
    text(""+score, width-100, 50, 150, 50);
};
/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    vijandY = vijandY + 10;
    if (vijandY>height) {
        vijandY=0;
        vijandX = random (100, 1150);
    }

    if (score > 10){
    vijandY = vijandY + 3;
    }
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {
  
}



/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
  spelerX = mouseX;
  spelerY = 350;
};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */






 
var checkVijandGevangen = function() {
    //x + 10, y + 100, x + 190, y+100
    var linkerXVanglijn = spelerX + 10;
    var rechterXVanglijn = spelerX + 190;
    var bovenYVanglijn = spelerY + 100;
    var onderYVanglijn = spelerY + 120;



    if (vijandX >= linkerXVanglijn &&
        vijandX <= rechterXVanglijn &&
        vijandY >= bovenYVanglijn &&
        vijandY <= onderYVanglijn) {

            return true;
        }
    
    
    return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    
  return false;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');

  vijandX = random(100,800);
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case STARTSCHERM:
        tekenStartscherm();
        if (keyIsDown(32)) {// 32=spatie
           spelStatus = SPELEN;
        }
        break;
    };
    
    case SPELEN:
      beweegVijand();
      beweegKogel();
      beweegSpeler();
      
      if (checkVijandGevangen()) {
        // punten erbij
        score++;
        console.log("Score is nu: " + score);

        // nieuwe vijand maken
        vijandY=0;
        vijandX = random (100, 1150);
      }
      
      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);
      tekenScore();
    
     

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}
