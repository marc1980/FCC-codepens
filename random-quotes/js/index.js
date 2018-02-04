function getQuote(){
  console.log( "function getQuote");
  $.ajax({
    url: " https://crossorigin.me/https://api.forismatic.com/api/1.0/",
    data: "method=getQuote&key=457653&format=json&lang=en",
    type: "GET",
    dataType : "json",
    success: function(data){
      console.log("data: " + data.quoteText); 
      $("#quote").text('"' + data.quoteText + '"');
      $("#quoter").text(data.quoteAuthor);
      $("#btnTweet").attr('href', 'https://twitter.com/intent/tweet?text='+ data.quoteText);
    },
})
  .fail(function( xhr, status, errorThrown ) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
  })
}

$(document).ready(function(){
  console.log("document ready!");
  
  getQuote();
  
  $("#btnNewQuote").on("click", function() {
    console.log("buton new quote clicked!");
    getQuote();
  });

  
});