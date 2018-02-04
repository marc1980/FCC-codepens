$(document).ready(function(){
var searchTerm = "";
//  var result = [];

$("#btnRandom").on("click", function(){
  var win = window.open("https://en.wikipedia.org/wiki/Special:Random", '_blank');
});
                  
$("#btnSearch").on("click", function(){
  if($("#searchTerm").val() !== ""){
    console.log("search: " + $("#searchTerm").val());
   $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + $("#searchTerm").val() + "&callback=?" ,function(data){
     $( ".card" ).remove();
     $('#results').append('<div class="card"><div id="result-item" class="card-block"></div></div>');
     
     for(key in data.query.pages ){
   //  console.log("==title==" + data.query.pages[key].title);
       
       $('#result-item').append(
         '<h4 class="card-title">' + data.query.pages[key].title + '</h4><p class="card-text">' + data.query.pages[key].extract + '</p><a href="https://en.wikipedia.org/?curid=' + data.query.pages[key].pageid + 'class="card-link">Card link</a>');
    
         
    
       
     };
   });

  };
});
});