// Create an array of 90s shows.
var shows = ["Friends", "Seinfeld"];

function renderButtons() {

    // Clear the list of shows prior to adding new shows.
    $("#show-buttons").empty();

    for (i = 0; i < shows.length; i++) {
        var a = $("<button>");
        a.addClass("show");
        a.attr("data-name", shows[i]);
        a.text(shows[i]);
        $("show-buttons").append(a);
    };
};

// Create function to trigger AJAX call.
$("#find-show").on("click", function (event) {

    // Preventing the submit button from trying to submit the form.
    event.preventDefault();

    var tvShow = $("#show-input").val().trim();

    shows.push(tvShow);

    renderButtons();
});

document.on("click", ".show", testAlert);

renderButtons();


// var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&rating=PG-13&q=" + tvShow + "&api_key=3vzQRZcFXY3zkusaoBZc5T6RrA4IJcVu";

// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (response) {
//     $("#show-view").text(JSON.stringify(response));
// });


// $(document).ready(function () {
// });