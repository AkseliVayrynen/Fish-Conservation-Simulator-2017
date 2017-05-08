/*
THIS IS A GAME MADE FOR VJP 2017 AT AALTO UNIVERSITY BY KINNARI, PÖNTINEN, VÄYRYNEN.
HAVE FUN!
*/

/*
In order to run different "windows" in the game, we use gameStates.

        The gameStates are as follows:
        1 --------- Intro
        2 --------- Main Menu
        3 --------- The game itsel
        4 --------- Help


*/
var gameState = 3;

if (gameState === 3) {
    runGame();
} 


//THE GAME ITSELF:

function runGame() {

    
var game = new Phaser.Game(1000, 600, Phaser.CANVAS, 'test', { preload: preload, create: create, update: update, render: render });




/* The game physics, with the help of phaser.io */

function preload() {
  //  game.load.audio('BG', 'assets/gamemusic.mp3');
    game.load.image('analog', 'assets/black.png');
    game.load.image('arrow', 'assets/nuoli.png');
    game.load.spritesheet('ball', 'assets/resizeimage.net-output.png', 64, 64);
    game.load.spritesheet('happyfish', 'assets/Staattinenhymy2.png', 64, 64);
    game.load.spritesheet('happyfish2', 'assets/ernukala.png', 64, 64);
    game.load.spritesheet('goal', 'assets/vesi.jpg', 100,150);
    game.load.spritesheet('wall', 'assets/wall.jpg', 100, 600);
    game.load.image('deadfish', 'assets/kuollutkala.png');
  //  game.load.audio('noSuccess', 'assets/epaonnistuminen.ogg');
   // game.load.audio('yay', 'assets/yay.wav');
    game.load.image('menuscreen','assets/menubackground.png');
    game.load.image('gamescreen','assets/gamescreen.png')
    game.load.image('pow1','assets/pow1.png')
    game.load.image('pow2','assets/pow2.png')
    game.load.image('pow3','assets/pow3.png')
    game.load.image('pow4','assets/pow4.png')
    game.load.image('pow5','assets/pow5.png')

}

var arrow;
var ball;
var catchFlag = false;
var launchVelocity = 0;
var text;
var count = 0;
var goal;
var failureSound;
var successSound;
var isDead = false;
var timeLeft = 10;
var timeToEnd = 1000;
var backGroundMusic;
var rectTimer = {
    x: 165,
        y: 25,
        w: 170,
        h: 50,
    };
var greatWall = {}
var greatWall2 = {}
var effect = {}
var effectNum = {}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // set global gravity
    game.physics.arcade.gravity.y = 0;
    game.add.tileSprite(0, 0, 1000, 600, 'gamescreen')
    
    backGroundMusic = game.add.audio('BG');
    backGroundMusic.play();
    
    var graphics = game.add.graphics(0,0);
   // graphics.beginFill(0x049e0c);
    // draw a background rectangle for the timer
    graphics.beginFill(0x000000, 1);
    graphics.drawRect(160, 20, 180, 60);
    graphics.endFill();
    window.graphics = graphics;
    graphics.drawRect(395, 350, 10, 250);
    analog = game.add.sprite(400, 300, 'analog');
    
    game.physics.enable(analog, Phaser.Physics.ARCADE);

    analog.body.allowGravity = false;
    analog.width = 8;
    analog.rotation = 220;
    analog.alpha = 0;
    analog.anchor.setTo(0.5, 0.0);
    
    arrow = game.add.sprite(400, 300, 'arrow');

    game.physics.enable(arrow, Phaser.Physics.ARCADE);

    arrow.anchor.setTo(0.1, 0.5);
    arrow.body.moves = false;
    arrow.body.allowGravity = false;
    arrow.alpha = 0;
    
   
    
    
    //Great wall:
    greatWall = game.add.sprite(700, 375, 'wall');
    game.physics.enable([greatWall], Phaser.Physics.ARCADE);
    greatWall.body.gravity.y = 0;
    greatWall.body.velocity.setTo(0,0);
    greatWall.body.collideWorldBounds = false;
    greatWall.body.bounce.setTo(0,0);
 
    greatWall2 = game.add.sprite(700, -375, 'wall');
    game.physics.enable([greatWall2], Phaser.Physics.ARCADE);
    greatWall2.body.gravity.y = 0;
    greatWall2.body.velocity.setTo(0,0);
    greatWall2.body.collideWorldBounds = false;
    greatWall2.body.bounce.setTo(0,0);
        
    //Moving Goal:
    /*goal = game.add.sprite(700, 0, 'goal');
    game.physics.enable([goal], Phaser.Physics.ARCADE);
    goal.body.gravity.y = 0;
    goal.body.velocity.setTo(0, 150);
    goal.body.collideWorldBounds = true;
    goal.body.bounce.setTo(1,1);*/
    
    effect = game.add.sprite(670,greatWall.y-100,'pow'+effectNum)
    effect.alpha = 0
    
    count = 0;
    
    text = game.add.text(game.world.centerX, game.world.centerY, "Fish saved: " + count, {
        font: "35px Arial",
        fill: "black",
        align: "center"
    });

    text.anchor.setTo(0.5, 6);
    
     ball = game.add.sprite(400, 300, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.anchor.setTo(0.5, 0.5);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(0.9, 0.9);
    
    
    // Enable input.
    ball.inputEnabled = true;
    ball.input.start(0, true);
    ball.events.onInputDown.add(set);
    ball.events.onInputUp.add(launch);
    
    
    happyfish1= game.add.sprite(800, 400, 'happyfish');
    game.physics.enable([happyfish1], Phaser.Physics.ARCADE);
    happyfish1.body.velocity.setTo(0, 50);
    happyfish1.body.collideWorldBounds = true;
    happyfish1.body.bounce.setTo(1,1);
    
    
    happyfish2= game.add.sprite(850, 200, 'happyfish');
    game.physics.enable([happyfish2], Phaser.Physics.ARCADE);
    happyfish2.body.velocity.setTo(0, -70);
    happyfish2.body.collideWorldBounds = true;
    happyfish2.body.bounce.setTo(1,1);
    
    happyfish3= game.add.sprite(900, 100, 'happyfish2');
    game.physics.enable([happyfish3], Phaser.Physics.ARCADE);
    happyfish3.body.gravity.x = 400;
    happyfish3.body.collideWorldBounds = true;
    happyfish3.body.bounce.setTo(1,1);
    
    happyfish4= game.add.sprite(830, 350, 'happyfish');
    game.physics.enable([happyfish4], Phaser.Physics.ARCADE);
    happyfish4.body.gravity.x = 400;
    happyfish4.body.collideWorldBounds = true;
    happyfish4.body.bounce.setTo(1,1);
    
    
   // sprite animations  
    animation = ball.animations.add('swim');
    ball.animations.play('swim',30,true);
    
    animation2 = happyfish1.animations.add('swim2');
    happyfish1.animations.play('swim2',20,true);

    animation3 = happyfish2.animations.add('swim2');
    happyfish2.animations.play('swim2',20,true);
    
    animation4 = happyfish3.animations.add('swim2');
    happyfish3.animations.play('swim2',20,true);
    
    animation5 = happyfish4.animations.add('swim2');

    happyfish4.animations.play('swim2',30,true);
    

    happyfish4.animations.play('swim2',20,true);

}

function set(ball, pointer) {
    ball.body.moves = false;
    ball.body.velocity.setTo(0, 0);
    ball.body.allowGravity = false;
    catchFlag = true;

}

var bounceVelocityX = 0;
var bounceVelocityY = 0;
var goingUp = false;
var goingUp2 = true;
    
function moveWall(){
    if(!goingUp){
    greatWall.y = greatWall.y+5
    if(greatWall.y>600){
        goingUp = true
    }
    }
    else if(goingUp){
        greatWall.y = greatWall.y-5
        if(greatWall.y<150){
            goingUp=false
        }
    }  
}
    function moveWall2(){
    if(!goingUp){
    greatWall2.y = greatWall2.y+5
    if(greatWall2.y>375){
        goingUp2 = true
    }
    }
    else if(goingUp){
        greatWall2.y = greatWall2.y-5
        if(greatWall2.y<0){
            goingUp2=false
        }
    }  
}  
    
function launch() {
    catchFlag = false;
    //CHANGE THIS VALUE IF YOU WANT TO CHANGE GRAVITY!!!
    ball.body.gravity.y = 400;
    ball.body.moves = true;
    arrow.alpha = 0;
    analog.alpha = 0;
    Xvector = (arrow.x - Math.min(ball.x,400)) * 3;
    Yvector = (arrow.y - ball.y) * 3;
    bounceVelocityX = Math.abs(Xvector)-1.5*Math.abs(Xvector)
    bounceVelocityY = Math.abs(Yvector)-1.2*Math.abs(Yvector)    
    ball.body.allowGravity = true;  
    ball.body.velocity.setTo(Xvector, Yvector);

}
    
function bounce(){
if(ball.x>630&&isDead){
    updateGravity();
   ball.body.velocity.setTo(bounceVelocityX,bounceVelocityY);
    ball.body.bounce.setTo(0.4, 0.5);
}    
}
function updateGravity(){
    if(!isDead){
        ball.body.gravity.y = 1200;
    }
}

function randomise(){
    effectNum = Math.floor((Math.random() * 5) + 1);
}    
    
function update() {

    arrow.rotation = game.physics.arcade.angleBetween(arrow, ball);
    bounce();
    reduceTime();
    updateRect();
    moveWall();
    moveWall2();
    if (catchFlag == true)
    {
        //  Track the ball sprite to the mouse  
        ball.x = Math.max(50,Math.min(390,game.input.activePointer.worldX));   
        ball.y = Math.max(101,Math.min(game.input.activePointer.worldY,560));
        
        arrow.alpha = 1;    
        analog.alpha = 1.0;
        analog.rotation = arrow.rotation - 3.14 / 2;
        analog.height = game.physics.arcade.distanceToPointer(arrow);
        launchVelocity = analog.height;
    }
    
    var fishX = ball.x;
    var fishY = ball.y;
    //If fish hits the wall:
    if (fishX >= 650 && catchFlag != true && !isDead) {
        if (ball.y < greatWall.y- 160|| ball.y > greatWall.y) {
        failure();
         console.log("seinä")
        console.log(greatWall.y)
        console.log("seinä2")
        console.log(greatWall2.y)
        }
        
        function fade(){
             effect.alpha = 0;
        }
    //If fish goes thru the goal
    if (fishX >= 750 && catchFlag != true && !isDead) {
        ball.x = 900;
        randomise()
        if(goingUp){
            effect = game.add.sprite(670,greatWall.y-200,'pow'+effectNum)
        }
        else if(!goingUp){
            effect = game.add.sprite(670,greatWall.y-100,'pow'+effectNum)
        }
        effect.alpha = 1;
        successSound = game.add.audio('yay');
        successSound.play();
        updateSaveText();
        giveMoreTime();
        backtoStart();
        game.time.events.add(Phaser.Timer.SECOND * 0.2, fade, this);
        
        }
    }
    

}

function failure() {
      //  ball.body.moves = false;
       // ball.x = 270;
        ball.loadTexture('deadfish', 0);
        isDead = true;
        failureSound = game.add.audio('noSuccess');
        failureSound.play();
        game.time.events.add(Phaser.Timer.SECOND * 2, backtoStart, this);
}
 
function makeFishAlive() {
        ball.loadTexture('ball', 0);
        animation = ball.animations.add('swim');
        ball.animations.play('swim',30,true);
}
        
function backtoStart() {
    makeFishAlive();
    ball.body.moves = false;
    ball.x = 400;
    ball.y = 300;
    isDead = false;
}
        
function updateSaveText() {
    if (timeToEnd > 0) { 
        count++;
        text.setText("Fish saved: " + count);
    }
}

function updateRect(){
    floor = new Phaser.Rectangle(rectTimer.x, rectTimer.y, rectTimer.w, rectTimer.h);
    rectTimer.w =  165*(timeToEnd/1000);
} 

function reduceTime() {
    if (timeToEnd > 0) {
        //Beginning:
    if (count < 10) {
        timeToEnd = timeToEnd - 1;
    }
        //After first ten fish
    if (count >= 10 && count < 20) {
        timeToEnd = timeToEnd - 2;
    }
        //After 20
    if (count >= 20 && count < 30) {
        timeToEnd = timeToEnd  - 3;
    }
        //After 30
    if (count >= 30 && count < 40) {
        timeToEnd = timeToEnd - 4;
    }
        
    if (count >= 40) {
        timeToEnd = timeToEnd - 5;
    }
    }
}

function giveMoreTime() {
    if (timeToEnd > 0) {
        timeToEnd = Math.min(1000,timeToEnd + 350);
    }
}

function render() {
    if(timeToEnd>666){
        game.debug.geom(floor,'#62f442');
    }
    if(timeToEnd<667 && timeToEnd>200){
        game.debug.geom(floor,'#fff716');
    }
    if(timeToEnd<201){
        game.debug.geom(floor,'#ff1616');
    }
}
}
