var categories = ["Cat Fails", "Dogs with Shoes", "Fainting Goats", "Holiday", "Kids", "Accidents", "Ice", "Movies", "Slips", "Falls", "Rodents", "Hippopotamus", "Mean Tweets"];


function renderButtons() {
  var buttonContainer = $("#button-container");
  buttonContainer.html("")
  for (var i = 0; i < categories.length; i++) {
    newButton = $("<button>");
    newButton.text(categories[i])
    newButton.attr("id", categories[i])
    newButton.addClass("picture-button")
    buttonContainer.append(newButton)
  };
};

function addNewButton() {
  var category = $("#add-input").val().trim();
  if (category == ""){
    return;
  };
  categories.push(category)
  $("#button-container").val("")
  renderButtons()
};

$("#add-button").on("click", function(event) {
  event.preventDefault()
  addNewButton()
  
});

$("body").on("click", ".picture-button", function(event) {
  var funny = this.id;
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=" + 10 + "&q=funny+" + funny;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    
    $("#gif-container").text("")
    for (var i = 0; i < response.data.length; i++) {
      var newDiv = $("<div>");
      var newImg = $("<img>");

      // Find the original aspect ratio and set the image to width of 300px and a height that maintains the aspect ratio
      var aspectRatio = response.data[i].images.original_still.width / response.data[i].images.original_still.height;
      var width = 300;
      var height = width * (1 / aspectRatio);
      
      // Add attributes to the image
      newImg.attr("data-still", response.data[i].images.original_still.url)
      newImg.attr("src", response.data[i].images.original_still.url)
      newImg.attr("data-animate", response.data[i].images.original.url)
      newImg.attr("data-state", "still")
      newImg.attr("style", "height:" + height + "px;width:" + width + "px;")
      newImg.addClass("gif-class")

      // Add a class and rating text to the new div
      newDiv.attr("class", "image-div")
      newDiv.html("<p>Rating: " + response.data[i].rating.toUpperCase() + "<p>")
      // Add the image to the new div
      newDiv.prepend(newImg)
      // Add the new div to the gif-container
      $("#gif-container").prepend(newDiv)
    };
  });
});

$("body").on("click", $(".gif-class"), function(event) {
  var state = $(event.target).attr("data-state");
  if (state === "still") {
    $(event.target).attr("src", $(event.target).attr("data-animate"));
    $(event.target).attr("data-state", "animate");
  } else {
    $(event.target).attr("src", $(event.target).attr("data-still"));
    $(event.target).attr("data-state", "still");
  }
});



renderButtons();

