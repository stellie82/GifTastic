$(document).ready(function () {

    // Create an array of 90s shows.
    var shows = ["Friends", "Seinfeld", "Frasier"];

    function displayInfo() {
        var show = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&rating=PG-13&q=" + show + "&api_key=3vzQRZcFXY3zkusaoBZc5T6RrA4IJcVu";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (i = 0; i < response.data.length; i++) {

                // Create a div to hold the movie.
                var showDiv = $("<div class='show'>");

                // Store and display the rating data.
                var rating = response.data[i].rating;
                var ratingText = $("<p>").text("Rating: " + rating);
                showDiv.append(ratingText);

                // Store and display the image.
                var imgURL = response.data[i].images.fixed_height_still.url;
                var image = $("<img>").attr("src", imgURL).attr("class", "still");
                showDiv.append(image);

                var imgURL2 = response.data[i].images.fixed_height.url;
                var image2 = $("<img>").attr("src", imgURL2).attr("class", "animated");
                showDiv.append(image2);

                // Put the show above the previously displayed show.
                $("#show-view").prepend(showDiv);
            }
        });
    }

    function renderButtons() {

        // Clear the list of shows prior to adding new shows.
        $("#show-buttons").empty();

        for (i = 0; i < shows.length; i++) {
            var a = $("<button>");
            a.addClass("show-button");
            a.attr("data", shows[i]);
            a.text(shows[i]);
            $("#show-buttons").append(a);
        };
    };

    // Create function to trigger AJAX call.
    $("#add-show").on("click", function (event) {

        // Preventing the submit button from trying to submit the form.
        event.preventDefault();

        var show = $("#show-input").val().trim();

        shows.push(show);

        renderButtons();
    });

    $(document).on("click", ".show-button", displayInfo);

    renderButtons();



});