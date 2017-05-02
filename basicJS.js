$(document).ready(function() {
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d");
    
    
    
    /* The game runs in different gameStates. They are as follows:
        1 ------ Intro
        2 ------ Main Menu
        3 ------ Help
        4 ------ Credits
        5 ------ Game
        6 ------ Ending
    */
    
    var gameState = 1;
    
    //Intro
    if (gameState === 1) {
        //Load background:
        var testBG = new Image();
        testBG.src = "assets/testBG.png";
        testBG.onload = function() {
        ctx.drawImage(testBG, 0, 0);
        //Intro animation-to-come:
        ctx.font = "25px Verdana";
        ctx.fillText("Fish Conservation Simulator 2017", 35 ,50);
            
        //Button, for test purposes only:
        var testButton = new Image();
        testButton.src = "assets/testButton.png";
        testButton.onload = function () {
        ctx.drawImage(testButton, 450, 325);
        };
                    
    };

    };
    
    
    
    if (gameState === 5) {
        
    }
    
    
});