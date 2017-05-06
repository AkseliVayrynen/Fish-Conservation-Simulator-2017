/*
THIS IS A GAME MADE FOR VJP 2017 AT AALTO UNIVERSITY BY KINNARI, PÖNTINEN, VÄYRYNEN.
HAVE FUN!
*/

/*
In order to run different "windows" in the game, we use gameStates.

        The gameStates are as follows:
        1 --------- Intro
        2 --------- Main Menu
        3 --------- The game itself
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
    game.load.audio('BG', 'assets/gamemusic.mp3');
    game.load.image('analog', 'assets/black.png');
    game.load.image('arrow', 'assets/longarrow2.png');
    game.load.spritesheet('ball', 'assets/resizeimage.net-output.png', 64, 64);
    game.load.spritesheet('happyfish', 'assets/resizeimage.net-output.png', 64, 64);
    game.load.spritesheet('happyfishleft', 'assets/happyfishtotheleft.png', 64, 64);
    game.load.image('goal', 'assets/goaltest.png');
    game.load.image('wall', 'assets/wall.png');
    game.load.image('deadfish', 'assets/dead fisu.png');
    game.load.audio('noSuccess', 'assets/epaonnistuminen.mp3');

}

var arrow;
var ball;
var catchFlag = false;
var launchVelocity = 0;
var text;
var count = 0;
var goal;
var failureSound;
var isDead = false;
var timeLeft = 10;
var timeText;
var timeToEnd = 1500;
var backGroundMusic;


function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // set global gravity
    game.physics.arcade.gravity.y = 0;
    game.stage.backgroundColor = '#42d4f4';
    
    backGroundMusic = game.add.audio('BG');
    backGroundMusic.play();
    
    var graphics = game.add.graphics(0,0);
   // graphics.beginFill(0x049e0c);
    graphics.drawRect(395, 350, 10, 250);

    analog = game.add.sprite(400, 350, 'analog');

    game.physics.enable(analog, Phaser.Physics.ARCADE);

    analog.body.allowGravity = false;
    analog.width = 8;
    analog.rotation = 220;
    analog.alpha = 0;
    analog.anchor.setTo(0.5, 0.0);
    
    arrow = game.add.sprite(400, 350, 'arrow');

    game.physics.enable(arrow, Phaser.Physics.ARCADE);

    arrow.anchor.setTo(0.1, 0.5);
    arrow.body.moves = false;
    arrow.body.allowGravity = false;
    arrow.alpha = 0;
    
   
    
    
    //Great wall:
    var greatWall = game.add.sprite(700, 0, 'wall');
    //Moving Goal:
    goal = game.add.sprite(700, 0, 'goal');
    game.physics.enable([goal], Phaser.Physics.ARCADE);
    goal.body.gravity.y = 0;
    goal.body.velocity.setTo(0, 150);
    goal.body.collideWorldBounds = true;
    goal.body.bounce.setTo(1,1);
    
    count = 0;

    
    text = game.add.text(game.world.centerX, game.world.centerY, "Fish saved: " + count, {
        font: "35px Arial",
        fill: "black",
        align: "center"
    });

    text.anchor.setTo(0.5, 6);
    
    timeText = game.add.text(game.world.centerX, game.world.centerY, "Time left: ", {
        font: "35px Arial",
        fill: "black",
        align: "center"
    });
    
    timeText.anchor.setTo(1.7, 6);
    
     ball = game.add.sprite(100, 400, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.anchor.setTo(0.5, 0.5);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(0.9, 0.9);
    //CHANGE THIS VALUE IF YOU WANT TO CHANGE GRAVITY!!!
    ball.body.gravity.y = 400; 
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
    
    happyfish3= game.add.sprite(900, 100, 'happyfish');
    
    
    happyfish4= game.add.sprite(930, 350, 'happyfishleft');
    
    
    
   // sprite animations  
    animation = ball.animations.add('swim');
    ball.animations.play('swim',30,true);
    
    animation2 = happyfish1.animations.add('swim2');
    happyfish1.animations.play('swim2',30,true);

    animation3 = happyfish2.animations.add('swim2');
    happyfish2.animations.play('swim2',30,true);
    
    animation4 = happyfish3.animations.add('swim2');
    happyfish3.animations.play('swim2',30,true);
    
    animation5 = happyfish4.animations.add('swim2');
    happyfish4.animations.play('swim2',30,true);
    
}

function set(ball, pointer) {

    ball.body.moves = false;
    ball.body.velocity.setTo(0, 0);
    ball.body.allowGravity = false;
    catchFlag = true;

}

function launch() {

    catchFlag = false;
    
    ball.body.moves = true;
    arrow.alpha = 0;
    analog.alpha = 0;
    Xvector = (arrow.x - ball.x) * 3;
    Yvector = (arrow.y - ball.y) * 3;
    ball.body.allowGravity = true;  
    ball.body.velocity.setTo(Xvector, Yvector);

}

function update() {

    arrow.rotation = game.physics.arcade.angleBetween(arrow, ball);
    
    reduceTime();
  
    
    if (catchFlag == true)
    {
        //  Track the ball sprite to the mouse  
        ball.x = game.input.activePointer.worldX;   
        ball.y = game.input.activePointer.worldY;
        
        arrow.alpha = 1;    
        analog.alpha = 0.5;
        analog.rotation = arrow.rotation - 3.14 / 2;
        analog.height = game.physics.arcade.distanceToPointer(arrow);  
        launchVelocity = analog.height;
    }
    
    var fishX = ball.x;
    var fishY = ball.y;
    

    //If fish hits the wall:
    if (fishX >= 650 && catchFlag != true && !isDead) {
        if (ball.y < goal.y || ball.y > goal.y + 150) {
        failure();
        }
    
    //If fish goes thru the goal
    if (fishX >= 750 && catchFlag != true && !isDead) {
        ball.x = 900;
        updateSaveText();
        giveMoreTime();
        backtoStart();
        
        }
    }
    

}

function failure() {
        ball.body.moves = false;
        ball.x = 670;
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
    ball.x = 100;
    ball.y = 400;
    isDead = false;
}
        
function updateSaveText() {
    if (timeToEnd > 0) { 
        count++;
        text.setText("Fish saved: " + count);
    }
}

function reduceTime() {
    if (timeToEnd > 0) {
        //Beginning:
    if (count < 10) {
        timeToEnd = timeToEnd - 1;
        timeText.setText("Time left: " + timeToEnd);
    }
        //After first ten fish
    if (count >= 10 && count < 20) {
        timeToEnd = timeToEnd - 2;
        timeText.setText("Time left: " + timeToEnd);
    }
        //After 20
    if (count >= 20 && count < 30) {
        timeToEnd = timeToEnd  - 3;
        timeText.setText("Time left: " + timeToEnd);
    }
        //After 30
    if (count >= 30 && count < 40) {
        timeToEnd = timeToEnd - 4;
        timeText.setText("Time left: " + timeToEnd);
    }
        
    if (count >= 40) {
        timeToEnd = timeToEnd - 5;
        timeText.setText("Time left: " + timeToEnd);
    }
    } else {
        timeText.setText("YOU LOST!");
    }
}

function giveMoreTime() {
    if (timeToEnd > 0) {
        timeToEnd = timeToEnd + 350;
        timeText.setText("Time left: " + timeToEnd);
    }
}

function render() {


}
}
