$(document).ready(function() {

    var topics = ["health food", "fitness", "pilates", "nutrition", "skin care", "running", "weight lifting", "skin care", "soccer", "basketball", "volleyball"];
  

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
            $("#healthAddTxt").clear();
        });
    }

    $(document).on("click", ".buttonC", function(){
    $("#health").empty();  
    var chosen = $(this).attr("data-name");
    console.log(chosen);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
    chosen + "&api_key=2hmfwLu9FCTywzkURnLFoPDqdeyUUhpU";    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(res) {
        console.log(res);
            for (var i = 0; i < res.data.length; i++) {
                if(res.data[i].rating==="g"){
                console.log(res.data[i]);
                var imgContainer = $("<div class='card col-lg-2 col-md-4 col-sm-6 m-3'>");
                var cardImage= $("<img class='card-img-top image-responsive'>");
                cardImage.addClass("imgHeight");
                cardImage.attr("src", res.data[i].images.original.url);
                var cardBody=$("<div class='card-body'>");
                var cardTitle=$("<h5 class='card-title'></h5>");
                cardTitle.text("Rating: " + res.data[i].rating);
                var cardRating=cardBody.add(cardTitle);

                var allElements=imgContainer.append(cardImage, cardRating);
                allElements.appendTo("#health");
                }
            }
        });
    });

    createButtons();
});
    
