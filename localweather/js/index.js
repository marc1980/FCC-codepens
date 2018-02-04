$(document).ready(function(){
  var farenheit = 0;
  var celcius = 0;
if ("geolocation" in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition(function(position) {
  console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
  $("#geoLongLat").text("The weather for Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
  
  $.ajax({
  method: "GET",
  url: "https://cors-everywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather",
  data: "lat=" + position.coords.latitude + 
        "&lon=" + position.coords.longitude + 
        "&appid=f2ef744d7edec17cf64fd6a487b645d0",
  success: function(data){
    console.log("The weather in: " + data.name)
    $("#place").text(data.name);
    $("#description").text(data.weather[0].description);
    $("#temp").text( data.main.temp);
    $("#icon").attr("src", "http://openweathermap.org/img/w/"+ data.weather[0].icon +".png");
    farenheit = data.main.temp;
    celcius = (data.main.temp -32) / 1.8;
  }
});

});
} else {
  /* geolocation IS NOT available */
  alert("Geolocation is not supported.")
}

});

      $("#optionF").on("click", function(){
    $("#temp").text( farenheit);
  });
   $("#optionC").on("click", function(){
      console.log("optionC clicked " + celcius);
      $("#temp").text( celcius);
  });