var player = "O";
var computer = "X";
var grid = [["","",""], ["","",""], ["","",""]];
var scorePlayer = 0;
var scoreComputer = 0;
var running = false;

$("#switchXO").click(function(){
  if(running === false){
    if(player === "X"){
      player = "O";
      computer = "X";
    } else{
      player = "X";
      computer = "O";
    }
    updateUI();
  }  
});

$("#reset").click(function(){
  player = "X";
  computer = "O";
  grid = [["","",""], ["","",""], ["","",""]];
  scorePlayer = 0;
  scoreComputer = 0;
  running = false;  
//  update score en grid.
  updateUI();
});



$(".block").click(function(event){

  if( $(this).text() === "" ){
  running = true;
  $(this).text(player); 
    // id like r0c0; row 0 column 0
  var computerMove = [];
    
  var row = parseInt(event.target.id.charAt(1));
  var column = parseInt(event.target.id.charAt(3));
      
  grid[row][column] = player;
    
    if(checkWon(player) === true){
      console.log("player won! " + grid);
      nextGame(player);
    };

    computerMove = computerTurn();
    if(computerMove.length > 0){
      grid[computerMove[0]][computerMove[1]] = computer;
      $("#r" + computerMove[0] + "c" + computerMove[1]).text(computer);
    } 
    else{
      //game ended - equal --> new game
      console.log("nobody won " + grid);
      nextGame();
    }
    //updateUI();
    
    if(checkWon(computer) === true){
      console.log("computer won! " + grid);
      nextGame(computer);
    }
  
    //any open blocks left? otherwise new game
    if(!grid[0].includes("") && !grid[1].includes("") && !grid[2].includes("")){
      nextGame();
    }
    
  } 
});


function computerTurn(){
  var move = [];
  var corner = [
   [0,0],
   [0,2],
   [2,0],
   [2,2]];
  var edge = [
   [0,1],
   [1,0],
   [1,2],
   [2,1]];
  var twoInARowComputer = checkTwoInARow(computer);
  var twoInARowPlayer = checkTwoInARow(player);
  
  // Self 2-in-row and 3rd open -> 3rd
  if(twoInARowComputer.length !== 0){
    move = twoInARowComputer;
  }
  // Other 2-in-a-row + not blocked -> block
  else if(twoInARowPlayer.length !== 0){
    move = twoInARowPlayer;
  }
   // center open --> choose center
  else if(grid[1][1] === ""){
    move = [1,1];
  }
    // corners open -> random corner
  else if(grid[0][0] === "" || grid[0][2] === "" || grid[2][0] === "" || grid[2][2] === "") {
    var i = 0;
    while(move.length === 0){
      i = Math.floor(Math.random() * 4);
      if(grid[corner[i][0]][corner[i][1]] === ""){
         move = corner[i];
         }
    }
      
    }
     // random edge
  else if(grid[0][1] === "" || grid[1][0] === "" || grid[1][2] === "" || grid[2][1] === "") {
    while(move.length === 0){
      var i = 0;
      i = Math.floor(Math.random() * 4);
      if(grid[edge[i][0]][edge[i][1]] === ""){
         move = edge[i];
      }
    }
      
  }
  
  console.log("Computer Move: " + move);
  return move;
  }


function checkWon(XO){
  
 if(grid[0][0] ===  XO && grid[0][1] === XO && grid[0][2] === XO ||
    grid[1][0] ===  XO && grid[1][1] === XO && grid[1][2] === XO ||
    grid[2][0] ===  XO && grid[2][1] === XO && grid[2][2] === XO ||
    
    grid[0][0] ===  XO && grid[1][0] === XO && grid[2][0] === XO ||
    grid[0][1] ===  XO && grid[1][1] === XO && grid[2][1] === XO ||
    grid[0][2] ===  XO && grid[1][2] === XO && grid[2][2] === XO ||
    
    grid[0][0] ===  XO && grid[1][1] === XO && grid[2][2] === XO ||
    grid[2][0] ===  XO && grid[1][1] === XO && grid[0][2] === XO){
 
  return true;
  }
 
    
}

function checkTwoInARow(XO){
  var ret = [];
    //winning pairs, with missing one
  var pairs = [
    [[0,0],[0,1], [0,2]],
    [[0,0],[0,2], [0,1]],
    [[0,1],[0,2], [0,0]],
    [[1,0],[1,1], [1,2]],
    [[1,0],[1,2], [1,1]],
    [[1,1],[1,2], [1,0]],
    [[2,0],[2,1], [2,2]],
    [[2,0],[2,2], [2,1]],
    [[2,1],[2,2], [2,0]],
    [[0,0],[1,0], [2,0]],
    [[0,0],[2,0], [1,0]],
    [[1,0],[2,0], [0,0]],
    [[0,1],[1,1], [2,1]],
    [[0,1],[2,1], [1,1]],
    [[1,1],[2,1], [0,1]],
    [[0,2],[1,2], [2,2]],
    [[0,2],[2,2], [1,2]],
    [[1,2],[2,2], [0,2]],
    [[0,0],[1,1], [2,2]],
    [[0,0],[2,2], [1,1]],
    [[1,1],[2,2], [0,0]],
    [[2,0],[1,1], [0,2]],
    [[2,0],[0,2], [1,1]],
    [[0,2],[1,1], [2,0]]]
  for( i=0; i < pairs.length; i++ ){
    if(grid[pairs[i][0][0]][pairs[i][0][1]] === XO &&
       grid[pairs[i][1][0]][pairs[i][1][1]] === XO &&
       grid[pairs[i][2][0]][pairs[i][2][1]] === ""){
          ret = pairs[i][2];
    }
    
  }
  return ret;
}

function updateUI(){
  // update score and X/O
  $("#score").html('Score: Computer(' + computer + ') ' + scoreComputer + ' - You(' + player + ') ' + scorePlayer );
  // remove won message
  $("#whoWon").html("tic tac toe");
  // update grid
  for(i=0;i<3;i++){
    for(j=0;j<3;j++){
      $( "#r" + i + "c" + j ).html( grid[i][j] );
    }
  }
}

function nextGame(XO){
    
  //update score
  if(XO === player){
    scorePlayer += 1;
  } 
  else if(XO === computer){
    scoreComputer += 1;
  }
  
  //show winner message for x sec
  switch(XO) {
    case player:
        $("#whoWon").html("tic tac toe - You won!");
        break;
    case computer:
        $("#whoWon").html("tic tac toe - Computer won!");
        break;
    default:
        $("#whoWon").html("tic tac toe - Nobody won");
}
    
  // clear grid
  grid = [["","",""], ["","",""], ["","",""]];
  
  // update UI with a delay
  setTimeout(function(){ updateUI(); }, 3000);
  
}