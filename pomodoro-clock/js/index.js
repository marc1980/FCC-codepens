$(document).ready(function(){
  var breakSetting = 5;
  var pomodoroSetting = 25;
  var timer = 1500; //25 * 60  
  var running = false;
  var min = 0;
  var sec = 0;
  var intervalID;
  var timerType = "session"; // or break
  var beep = document.getElementById("beep");
  
  $("#start_stop").click(function(){
    console.log("timer clicked, running: " + running);
    if(running === false){
      running = true;
      intervalID = setInterval(countDown, 1000);
    }
    else{
     clearInterval(intervalID);
      running = false;
    }
    
  });
  
  $("#reset").click(function(){
    console.log("reset clicked, running: " + running);
    if(running === true){
      clearInterval(intervalID);
      running = false;
    }
    beep.pause();
    beep.currentTime = 0;
    breakSetting = 5;
    pomodoroSetting = 25;
    timer = pomodoroSetting * 60;
    timerType = "session";
    $("#break-length").html("" + breakSetting);
    $("#session-length").html("" + pomodoroSetting);
    $("#time-left").html( pomodoroSetting + ":00" );
    $("#timer-label").html(timerType);
  });
  
 function countDown()
        {
          if(timer !== 0){
            --timer;
          displayTime(timer);
          }
          else{
            beep.play();
            if (timerType === "session"){ 
              timer = breakSetting * 60;
              timerType = "Break!";
              displayTime(timer);
            }
            else{
              timer = pomodoroSetting * 60;
              timerType = "session";
              displayTime(timer);
            }
            $("#timer-label").html(timerType);
          }
        }

  function displayTime(timer){
      min = pad(parseInt(timer/60)); 
      sec = pad(timer%60);
      $("#time-left").html(min + ":" + sec);
  }
  
 function pad(val)
        {
            var valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
        }

    $("#break-decrement").click(function(){
      if(running === false){
        if( breakSetting > 1 ){
          breakSetting -= 1;
        }
        $("#break-length").html("" + breakSetting);
      }
    });
      $("#break-increment").click(function(){
      if(running === false){
        if(breakSetting < 60){
           breakSetting += 1;
           }
        $("#break-length").html("" + breakSetting);
      }
    });
      $("#session-decrement").click(function(){
      if(running === false){
        if( pomodoroSetting > 1 ){
           pomodoroSetting -= 1;
           }
        timer = pomodoroSetting * 60;
        $("#session-length").html("" + pomodoroSetting);
        $("#time-left").html( pomodoroSetting + ":00" );
      }
    });
      $("#session-increment").click(function(){
      if(running === false){
        if( pomodoroSetting < 60 ){
           pomodoroSetting += 1;
           }
        timer = pomodoroSetting * 60;
        $("#session-length").html("" + pomodoroSetting);
        $("#time-left").html( pomodoroSetting + ":00" );
      }
    });
  
});