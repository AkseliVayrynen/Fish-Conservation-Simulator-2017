
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'intro-test', { preload: preload, create: create });

function preload() {

    game.load.image('testButton', 'assets/testButton.png')
    game.load.image('background','assets/introBGTest.png');

}

var button;
var background;

function create() {


    background = game.add.tileSprite(0, 0, 1000, 600, 'background');

    button = game.add.button(game.world.centerX - 95, 400, 'testButton', actionOnClick, this, 2, 1, 0);


}


function actionOnClick () {
    window.open("fishgamesite.html", "_self");
    

}