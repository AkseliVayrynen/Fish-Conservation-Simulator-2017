runIntro();

function runIntro() {

var game = new Phaser.Game(1000, 600, Phaser.CANVAS, 'test2', { preload: preload, create: create });


var startButton;
    
function preload() {
    
game.load.image('kokeilukuva', 'assets/menubackground.png');
game.load.image('nappula', 'assets/testButton.png');
}
    
function create() {
    var s = game.add.sprite(0,0, 'kokeilukuva');
    startButton = game.add.button(500, 475, 'nappula', painettu, this, 2, 1, 0);
    
}
    
function painettu() {
    window.open("fishgamesite.html", '_self');
}
}