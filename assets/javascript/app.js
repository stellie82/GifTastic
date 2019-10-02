$(document).ready(function () {

    // Create an array of 90s shows.
    var topics = ["Friends", "Seinfeld", "Frasier", "Full House", "The X-Files", "Home Improvement"];

    // Create a function to display information for the shows.
    function displayInfo() {

        var show = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&q=" + show + "&api_key=3vzQRZcFXY3zkusaoBZc5T6RrA4IJcVu";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (i = 0; i < response.data.length; i++) {

                // Create a div to hold the movie.
                var showDiv = $("<div class='show'>");

                // Store each of the images in its state (animated or still).
                var imgURL = response.data[i].images.fixed_height_still.url;
                var stillURL = response.data[i].images.fixed_height_still.url;
                var animatedURL = response.data[i].images.fixed_height.url;
                var image = $("<img>").attr("src", imgURL).attr("class", "gifs").attr("state", "still").attr("clicked-image", animatedURL).attr("still-image", stillURL);
                showDiv.append(image);

                // Store and display the rating data.
                var rating = response.data[i].rating;
                var ratingText = $("<p>").text("Rating: " + rating.toUpperCase());
                showDiv.append(ratingText);

                // List each of the shows displayed above.
                $("#show-view").prepend(showDiv);
            }
        });
    }

    // Create a function that will animate the gif if clicked on.
    function clickedImage() {

        var currentState = $(this).attr("state");
        var animatedImage = $(this).attr("clicked-image");
        var stillImage = $(this).attr("still-image");

        if (currentState == "still") {
            $(this).attr("src", animatedImage);
            $(this).attr("state", "animated");
        }

        else if (currentState == "animated") {
            $(this).attr("src", stillImage);
            $(this).attr("state", "still");
        }
    }


    // Create a function to render the buttons for each of the shows.
    function renderButtons() {

        // Clear the list of shows prior to adding new shows.
        $("#show-buttons").empty();

        for (i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("btn btn-secondary btn-sm");
            a.addClass("show-button");
            a.css("margin-right", "10px");
            a.attr("data", topics[i]);
            a.text(topics[i]);
            $("#show-buttons").append(a);
        };
    };

    // Create a function to trigger the AJAX call.
    $("#add-show").on("click", function (event) {

        // Preventing the submit button from trying to submit the form.
        event.preventDefault();

        // This is where the user will enter their show choice and be added to the original array.
        var show = $("#show-input").val().trim();
        topics.push(show);

        renderButtons();
    });

    $(document).on("click", ".show-button", displayInfo);
    $(document).on("click", ".gifs", clickedImage);
    
    renderButtons();

});