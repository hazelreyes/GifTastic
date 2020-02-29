var topics = [
  "ice cream",
  "eggs",
  "hot dog",
  "waffles",
  "steak",
  "pizza",
  "candy",
  "macaroni and cheese",
  "spaghetti",
  "salad",
  "cake",
  "pie",
  "potato",
  "sushi",
  "rice",
  "lasagna",
  "pancakes",
  "fried chicken",
  "fruit salad",
  "tacos"
];

function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.addClass("button");
    button.attr("data-food", topics[i]);
    button.text(topics[i]);
    $("#buttons-view").append(button);
  }
}

function displayGifAndRating() {
  var food = $(this).attr("data-food");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    food +
    "&api_key=mPp4LHG20VcH6glkCCSUVYdmw7cfdUsZ&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");
      var gifImage = $("<img>");
      gifImage
        .attr("src", results[i].images.fixed_height_still.url)
        .attr("data-still", results[i].images.fixed_height_still.url)
        .attr("data-animate", results[i].images.fixed_height.url)
        .attr("data-state", "still")
        .addClass("gif");
      var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
      gifDiv.append(gifImage);
      gifDiv.append(p);
      $("#gifs-view").prepend(gifDiv);
    }
  });
}

function animateOrUnanimateGif() {
  var state = $(this).attr("data-state");
  var animatedSource = $(this).attr("data-animate");
  var stillSource = $(this).attr("data-still");

  if (state === "still") {
    $(this).attr("src", animatedSource);
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", stillSource);
    $(this).attr("data-state", "still");
  }
}

renderButtons();

$(document).on("click", ".button", displayGifAndRating);

function addInputSubmitEvent(form, input) {
  input.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == 13) {
      form.submit();
      return false;
    }
  };
}

$("#add-gif").on("click", function(event) {
  event.preventDefault();
  var newGif = $("#gif-input")
    .val()
    .trim();

  if (newGif === "") {
    alert("Please input a food type.");
  } else {
    topics.push(newGif);
    $("#gif-input").val("");
    renderButtons();
  }
});

$(document).on("click", ".gif", animateOrUnanimateGif);
