$(document).ready(function () {

    var topics = ["health food", "fitness", "pilates", "nutrition", "skin care", "running", "weight lifting", "skin care"];

    function getGiphyFunction() {
        var chosen=$(this).attr("data-name");
        var jqueryURL ="https://api.giphy.com/v1/gifs/search?q=" +chosen+"&api_key=2hmfwLu9FCTywzkURnLFoPDqdeyUUhpU";

        $.ajax({
            URL: jqueryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
          var results=data.result;
          for(var i=0; i<results[i]; i++){
            var classification=$("<p>").text("Rating"+results[i].rating).appendTo("#health");
            var imgContainer=$("<img>").attr("src", results[i].images.original.url).appendTo("#health");
          } });
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

    $("<body>").on("click", ".buttonC", getGiphyFunction);
        createButtons();
        getGiphyFunction();
});