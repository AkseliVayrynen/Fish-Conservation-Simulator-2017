
//Creating a new Phaser Game:
var game = new Phaser.Game(1000, 600, Phaser.CANVAS, 'test', { preload: preload, create: create, update: update, render: render });


// toimiiks tää nyt



/* The game physics, with the help of phaser.io */

function preload() {

    game.load.image('analog', 'assets/black.png');
    game.load.image('arrow', 'assets/longarrow2.png');
    game.load.spritesheet('ball', 'assets/resizeimage.net-output.png', 64, 64);
    game.load.image('goal', 'assets/goaltest.png');
    game.load.image('wall', 'assets/wall.png');
    game.load.image('deadfish', 'assets/dead fisu.png');

}

var arrow;
var ball;
var catchFlag = false;
var launchVelocity = 0;
var text;
var count;
var goal;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // set global gravity
    game.physics.arcade.gravity.y = 0;
    game.stage.backgroundColor = '#42d4f4';
    
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
    
    ball = game.add.sprite(100, 400, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.anchor.setTo(0.5, 0.5);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(0.9, 0.9);
    
    // Enable input.
    ball.inputEnabled = true;
    ball.input.start(0, true);
    ball.events.onInputDown.add(set);
    ball.events.onInputUp.add(launch);
    
    animation = ball.animations.add('swim');
    ball.animations.play('swim',30,true);
    
    
    //Great wall:
    var greatWall = game.add.sprite(700, 0, 'wall');

    //Moving Goal:
    goal = game.add.sprite(700, 0, 'goal');
    game.physics.enable([goal], Phaser.Physics.ARCADE);
    
    goal.body.velocity.setTo(0, 150);
    goal.body.collideWorldBounds = true;
    goal.body.bounce.setTo(1,1);
    
     count = 0;

    
    text = game.add.text(game.world.centerX, game.world.centerY, "Fish saved: 0", {
        font: "35px Arial",
        fill: "black",
        align: "center"
    });

    text.anchor.setTo(1,5, 6);

    
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
    
    
    //Point counter:
    if (fishX >= 650 && catchFlag != true) {
        ball.body.moves = false;
        ball.loadTexture('deadfish', 0);
        ball.x = 100;
        ball.y = 400;
        
        /* 
        ADD MAKES FISH ALIVE AGAIN:
        ball.loadTexture('ball', 0);
        animation = ball.animations.add('swim');
        ball.animations.play('swim',30,true);
        updateText(); */
    }
    

}


function updateText() {

    count++;
    text.setText("Fish saved: " + count );

}


function render() {



}
