runIntro();

function runIntro() {

var game = new Phaser.Game(1000, 600, Phaser.CANVAS, 'test2', { preload: preload, create: create });


    
function preload() {
    
game.load.image('kokeilukuva', 'assets/menubackground.png');
game.load.spritesheet('button', 'assets/buttons2.png', 193 , 71);
}
    
function create() {
    var s = game.add.sprite(0,0, 'kokeilukuva');
    button = game.add.button(400, 300, 'button', painettu, this, 2, 1, 0);
    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    button.onInputUp.add(up, this);
}  
function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
    console.log(gameState);
}

function out() {
    console.log('button out');
}
    
function painettu() {
    window.open("fishgamesite.html", '_self');
}
}