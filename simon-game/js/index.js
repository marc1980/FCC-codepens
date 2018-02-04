$("document").ready(function(){
  console.log("document ready");
  
  var game = [];
  var gameInput = [];
  var strict = false;
  var counter = 0;  
  var notification = "";
  
  setTimeout(function(){ newGame(); }, 3000);
  
  $("#resetBtn").click(function(){
    newGame();
  });
  
   $("#strictBtn").click(function(){
    if(strict === false){
       strict = true;
      notify("strict mode activated");
    }
    else{
       strict = false;
       notify("strict mode deactivated");
    }
   }); 
     
   $(".button").click(function(){
     // add input to game input - first letter of the color
     var letter = this.classList[1].substr(0,1);
     gameInput.push(letter); 
     playSound(letter);
     // check if input sofar is correct
     for(i=0; i<gameInput.length; i++){
          if(gameInput[i] !== game[i]){
            // if input not correct: notify and clear input --. if strict mode; new game
            if(strict === false){
              gameInput = [];
              notify("Wrong move! Try again");
              playSoundSeries(0);
            }
            else{
              notify("We have to be strict, start over!");
              newGame();
            }
          }
     }    
     // if input complete and correct update counter and play next
     if(gameInput.length >= counter){
          if(counter !== game.length){
            // correct! next round
            notify("Correct! Next round");
            counter += 1;
            $(".counter").text(counter);
            gameInput = [];
            // play next sounds
            playSoundSeries(0);
            }
          else{
            // next game
            notify("Game finished, next one!");
            setTimeout(function(){ newGame(); }, 5000);
          }
          }
     
       
  });
     
  function playSound(_color){
    switch (_color){
        case "y": 
          $(".yellow").css( "background-color", "yellow" );
          setTimeout(function(){ $(".yellow").css( "background-color", "" ); }, 500);
          var yellowSnd = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
          yellowSnd.play();
          break;
        case "g": 
          $(".green").css( "background-color", "green" );
          setTimeout(function(){ $(".green").css( "background-color", "" ); }, 500);
          var greenSnd = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
          greenSnd.play();
          break;
        case "r": 
          $(".red").css( "background-color", "red" );
          setTimeout(function(){ $(".red").css( "background-color", "" ); }, 500);
          var redSnd = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
          redSnd.play();
          break;
        case "b":
          $(".blue").css( "background-color", "blue" );
          setTimeout(function(){ $(".blue").css( "background-color", "" ); }, 500);
          var blueSnd = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
          blueSnd.play();
          break;
       }
  }

        function playSoundSeries(j){
          if(j < counter){
            setTimeout(function(){
              j++;
              playSound(game[j-1]);
              playSoundSeries(j);
            }, 1000);
          }
        }
  
  function newGame(){
    game = [];
    gameInput = [];
    //strict = false;
    counter = 0;
    notification = "";
    
    // create new random game array
    for(k=0; k<20; k++){
    var x = Math.floor((Math.random() * 4) + 1);
      switch(x){
        case 1: game.push("y");
          break;
        case 2: game.push("g");
          break;
        case 3: game.push("b");
          break;
        case 4: game.push("r");
          break;
      }
    }
    console.log(game);
    // initialize counter and notification
    counter = 1;
    $(".counter").text(counter);
    // start first element
    playSoundSeries(0);
  }
  
  function notify(_txt){
    $(".notification").text(_txt);
    setTimeout(function(){ $(".notification").text(""); }, 3000);
  }
  
});