var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404" ];

var name = "";
var game = "";
var logo = "";
var url = "";
var status = "";


for(i=0; i<channels.length; i++){
  
  console.log("channel: " + channels[i]);
	getChannelDetails(channels[i]);
  }

function getChannelDetails(channel){
// get channel object for name and image
$.when(
$.ajax({
	url: "https://wind-bow.glitch.me/twitch-api/channels/" + channel,
//	data:
}),

// get steam to see the status
// 
$.ajax({
	url: "https://wind-bow.glitch.me/twitch-api/streams/" + channel,
//	data:
}))
  .then(function(dataChannel, dataStream){
    
  if(dataChannel[0].status === 404){
    name = "Account is closed";
    url = "#";
    logo = "https://res.cloudinary.com/df12kjieb/image/upload/v1492716006/person_pxwett.png"
	  status = "Offline";
  }
  else{

    name = dataChannel[0].name;
    url = dataChannel[0].url;
    game = "";
    
    if(dataChannel[0].logo === null){
       logo = "https://res.cloudinary.com/df12kjieb/image/upload/v1492716006/person_pxwett.png";
       }
       else{
       logo = dataChannel[0].logo;
       }
  
    
if (dataStream[0].stream === null){
	status = "Offline";
}
else{
	status = "Online";
  game = dataStream[0].stream.game;
}
  }

$("#all").append('<div class="row channel-card ' + status + '"><image class="col-xs-4 logo" src=' + logo + '><div class="col-xs-4"><p><a href=' + url+ '>' + name + '</a></p><p>' + game + '</p><p>' + status + '</p></div></div>');
  
});
}

$(document).ready(function(){
  
  $("#btnOnline").click(function(){
    $(".Online").show();
    $(".Offline").hide();
  });

$("#btnOffline").click(function(){
    $(".Online").hide();
    $(".Offline").show();
  });
  
  $("#btnAll").click(function(){
    $(".Online").show();
    $(".Offline").show();
  });
  
});