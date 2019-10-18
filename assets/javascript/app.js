$(function() {
	var topics = [
		"astronomy",
		"travel",
		"history",
		"soccer",
		"movies",
		"anime"
  ];

  var offset = 0;

  // Get local storage data and assign it to newTopics array
  var newTopics = JSON.parse(localStorage.getItem("newTopics"));

  // If data is found, add topics to topics array else assign and empty array to newTopics array
  if(!Array.isArray(newTopics)) {
    newTopics = [];
  } else {
    newTopics.forEach(function(topic){
      topics.unshift(topic);
    });
  }

  // Function will loop through topics newTopics to create and append
  // buttons for each string in the array
  function addGifButtons() {

    $(".gif-buttons").children().remove();

    topics.forEach(function(topic) {

      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=tJ7NkC6kpacg7ss87ZS2d3E4FRKb6CBg&q=" + topic + "&limit=1";

      var button = $("<button>").text(topic);

      ajaxRequest(queryURL, button);

      $(".gif-buttons").append(button);
      $(".gif-buttons").scrollLeft();

   });
 }

addGifButtons();

	// Click event button prepends a new button to gif-buttons
  // Condition check for empty strings and ajax request checks
  // for non-empty data response
	$(".add-gif__button").click(function() {
    var topicText = $(".add-gif__input").val().toLowerCase();

		if (topicText) {

      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=tJ7NkC6kpacg7ss87ZS2d3E4FRKb6CBg&q=" + topicText + "&limit=10";

			$.ajax({
				url: queryURL,
				method: "GET"
			}).then(function(response) {

          // If response.data which contains the data images-URLs is empty, do not add new topic text
          // Store topic in local storage
          if (response.data.length != 0 && !topics.includes(topicText)) {
            newTopics.push(topicText);
            localStorage.setItem("newTopics", JSON.stringify(newTopics));
            topics.unshift(topicText);
            addGifButtons();

        }

      });

		}

		$(".add-gif__input").val("");
  });

  // 'Enter' key pressed event on input form
  $(".add-gif__input").keypress(function(e){
    if(e.which == 13){
        $(".add-gif__button").click();//Trigger add button click event
    }
  });

  // Adds click event to all gif-buttons. Clicking a gif button triggers
  // a search request to Giphy API based on the text button. Then, a loop
  // goes through the response data retrieving the URL gif image which gets
  // attach to the new created image tag, to finally prepend the image to
  // gif-image-area
	$(".gif-buttons").on("click", "button",  function() {

      var topic = $(this).text();
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=tJ7NkC6kpacg7ss87ZS2d3E4FRKb6CBg&q=" + topic + "&limit=10&offset=" + offset;
      offset+= 5;

			$.ajax({
				url: queryURL,
				method: "GET"
			}).then(function(response) {

        response.data.forEach(function(data){

          var div = $("<div>");
          var span = $("<span>");
          span.text("Rating: " + data.rating.toUpperCase());

          var url = data.images.fixed_height_downsampled.url;
          var img = $("<img>").attr("src", url);

          img.attr({
            "data-stillGif": data.images.fixed_height_still.url,
            "data-animatedGif": img.attr("src"),
            "data-state": "animate"
          });

          // onload attribute will be triggered once the image is downloaded
          var downloadingImage = new Image();
          downloadingImage.onload = function(){

              img.src = this.src;

              div.append(img, span);

              $(".gif-images-area").prepend(div);

          };

          downloadingImage.src = url;

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
