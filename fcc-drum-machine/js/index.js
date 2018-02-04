

$( ".drum-pad" ).click(function() {
  var id = $(this).attr("id");
  var keyid = id.substr(0,1);
  keyPressed(keyid);
});

$(document).keypress(function(e) {
  var keys = ["q","w","e","a","s","d","z","x","c"];
  if(keys.indexOf(e.key) >= 0) {
    // key pressed
    keyPressed(e.key);
  }
});
  
 


function keyPressed(key){
  console.log( key );
  // play sound
  var audio = document.getElementById( key.toUpperCase() );
  audio.currentTime = 0;
  audio.play(); 

  //display sound
  $( "#display" ).html( "<h1> Sound: "+ key +"</h1>" );
  
}