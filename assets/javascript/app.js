$(function() {
	var topics = [
		"astronomy",
		"travel",
		"science",
		"soccer",
		"web development",
		"comic-con"
  ];

  // Function will loop through topics list to create and append
  // buttons for each string in the array
  function addGifButtons() {

    $(".gif-buttons").children().remove();

    topics.forEach(function(topic) {

      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=tJ7NkC6kpacg7ss87ZS2d3E4FRKb6CBg&q=" + topic + "&limit=1";

      var button = $("<button>").text(topic);

      ajaxRequest(queryURL, button);

      $(".gif-buttons").append(button);

   });
 }

addGifButtons();

	// Click event button prepends a new button to gif-buttons
	// if input text is not empty
	$(".add-gif__button").click(function() {
    var topicText = $(".add-gif__input").val();

    topics.unshift(topicText);
      console.log(topics);

		if (topicText) {
      addGifButtons();
		}

		$(".add-gif__input").val("");
  });

  // Adds click event to all gif-buttons. Clicking a gif button triggers
  // a search request to Giphy API based on the text button. Then, a loop
  // goes through the response data retrieving the URL gif image which gets
  // attach to the new created image tag, to finally prepend the image to
  // gif-image-area
	$(".gif-buttons").on("click", "button",  function() {

      var topic = $(this).text();
			var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=tJ7NkC6kpacg7ss87ZS2d3E4FRKb6CBg&q=" + topic + "&limit=10";

			$.ajax({
				url: queryURL,
				method: "GET"
			}).then(function(response) {

        response.data.forEach(function(data){

          var url = data.images.fixed_height_downsampled.url;
          var img = $("<img>").attr("src", url);

          img.attr({
            "data-stillGif": data.images.fixed_height_still.url,
            "data-animatedGif": img.attr("src"),
            "data-state": "animate"
          });

          $(".gif-images-area").prepend(img);

        });

			},);
  });

  // Add click event to Pause and play gif images
  // if data-sate equals still, gif-image url change to animated
  // else gif-image change to still image
  $(".gif-images-area").on("click", "img", function(){
    if ($(this).attr("data-state") === "still" ) {

      $(this).attr("src", $(this).attr("data-animatedGif"));
      $(this).attr("data-state", "animate");

    } else {

      $(this).attr("src", $(this).attr("data-stillGif"));
      $(this).attr("data-state", "still");

    }

  });

  // Function adds a gif background to gif buttons
  function ajaxRequest (queryURL, el) {
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      el.css("background-image", "url("+ response.data[0].images.downsized_medium.url +")")
    });
  }

});
