


$(document).ready(function () {
    var topics = ["health food", "fitness", "pilates", "nutrition", "skin care", "running", "weight lifting"];


    function getGiphyFunction() {
        var chosen=$(this).attr("data-name");
        var jqueryURL ="https://api.giphy.com/v1/gifs/random?api_key=2hmfwLu9FCTywzkURnLFoPDqdeyUUhpU";

        $.ajax({
            URL: jqueryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var classification=$("<p>").text("Rating"+response.data.rating).appendTo("#health");
            var imgContainer=$("<img>").attr("src", response.images.fixed_height.url).appendTo("#health");
        });
    }

    function createButtons() {
        $("#buttons-container").empty();
        for (var i = 0; i < topics.length; i++) {
            var buttonsCreated = $("<button class='buttonC btn btn-primary m-1'>");
            buttonsCreated.text(topics[i]).attr("data-name", topics[i]).appendTo("#buttons-container");

        }

        $("#addHealthItem").on("click", function (event) {

            event.preventDefault();
            var item = $("#healthAddTxt").val().trim();
            topics.push(item);
            createButtons();

        });

    }
    createButtons();
    $("<body>").on("click", ".buttonC", getGiphyFunction);
        createButtons();
        getGiphyFunction();
    
});