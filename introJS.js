
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'intro-test', { preload: preload, create: create });

function preload(){
    game.load.image('menuscreen','assets/menubackground.png')
    game.load.spritesheet('button', 'assets/buttons.png', 193 , 71);
}

function create(){
game.add.tileSprite(0, 0, 1000, 600, 'menuscreen');    
button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
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


function actionOnClick () {
    window.open("fishgamesite.html", "_self");
    

}