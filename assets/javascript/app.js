$(function() {
	var topics = [
		"astronomy",
		"travel",
		"science",
		"soccer",
		"web development",
		"comic-con"
  ];

  // Function will loop through topics list to create  and append
  // buttons for each string in the array
  function addGifButtons() {

    $(".gif-buttons").children().remove();

    topics.forEach(function(topic) {

      var button = $("<button>").text(topic);

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
          $(".gif-images-area").prepend(img);

        });

			},);
		});
});
