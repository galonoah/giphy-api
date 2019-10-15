$(function(){

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=tJ7NkC6kpacg7ss87ZS2d3E4FRKb6CBg&q=tech&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });

});