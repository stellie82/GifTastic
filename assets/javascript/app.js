$(document).ready(function () {

    // Create an array of 90s shows.
    var shows = ["Friends", "Seinfeld", "Frasier"];

    function displayInfo() {
        var showName = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&rating=PG-13&q=" + tvShow + "&api_key=3vzQRZcFXY3zkusaoBZc5T6RrA4IJcVu";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // Create a div to hold the movie.
            var showDiv = $("<div class='show'>");

            // Store and display the rating data.
            var rating = response.Rated;
            var ratingText = $("<p>").text("Rating: " + rating);
            showDiv.append(ratingText);

            // Store and display the image.
            var imgURL = response.Poster;
            var image = $("<img>").attr("src", imgURL);
            showDiv.append(image);

            // Put the show above the previously displayed show.
            $("#show-view").prepend(showDiv);
        });
    }

    function renderButtons() {

        // Clear the list of shows prior to adding new shows.
        $("#show-buttons").empty();

        for (i = 0; i < shows.length; i++) {
            var a = $("<button>");
            a.addClass("show");
            a.attr("data", shows[i]);
            a.text(shows[i]);
            $("#show-buttons").append(a);
        };
    };

    // Create function to trigger AJAX call.
    $("#find-show").on("click", function (event) {

        // Preventing the submit button from trying to submit the form.
        event.preventDefault();

        var show = $("#show-input").val().trim();

        shows.push(show);

        renderButtons();
    });

    $(document).on("click", ".show", testAlert);

    renderButtons();



});