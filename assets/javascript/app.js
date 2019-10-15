$(function(){

    var topics = ["astronomy", "travel", "science", "soccer", "web development", "comic-con"];

    // Loop will use topics list to create and append predefined buttons
    topics.forEach(function(topic){

        var button = $("<button>").text(topic);

        $(".gif-buttons").append(button);

    });

  // Click event button prepends a new button to gif-buttons
  // if input text is not empty, input value is use as  button's text name
   $(".add-gif__button").click(function(){

     var topicText = $(".add-gif__input").val();

     if (topicText) {

        var button = $("<button>").text(topicText);

        $(".gif-buttons").prepend(button);

     }

     $(".add-gif__input").val("");

   });

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=tJ7NkC6kpacg7ss87ZS2d3E4FRKb6CBg&q=tech&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });

});