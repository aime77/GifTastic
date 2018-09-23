$(document).ready(function () {

    var topics = ["health food", "fitness", "pilates", "nutrition", "skin care", "running", "weight lifting", "skin care", "soccer", "basketball", "volleyball", "football", "barre", "detox"];
    var item;
    function createButtons() {
        $("#buttons-container").empty();
        for (var i = 0; i < topics.length; i++) {
            var buttonsCreated = $("<button class='buttonC btn btn-primary m-1'>");
            buttonsCreated.text(topics[i]).attr("data-name", topics[i]).appendTo("#buttons-container");
        }
    }

    $("#addHealthItem").on("click", function (event) {
        event.preventDefault();
        item = $("#healthAddTxt").val().trim();
        console.log(item);
        if (item === "") {
            return item;
            //or break;
        }
        topics.push(item);
        createButtons();
        $("#healthAddTxt").val("");
    });

    var returnRes;
    $(document).on("click", ".buttonC", function () {
        $("#health").empty();
        var chosen = $(this).attr("data-name");
        console.log(chosen);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            chosen + "&api_key=2hmfwLu9FCTywzkURnLFoPDqdeyUUhpU&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {
            console.log(res);
            returnRes = res;
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].rating === "g" || res.data[i].rating === "pg") {
                    console.log(res.data[i]);
                    var imgContainer = $("<div class='card col-lg-3 col-md-4 col-sm-6 px-3 my-3 py-3 float-left'>");
                    var cardImage = $("<img class='card-img-top image-responsive'>");
                    cardImage.addClass("gif");
                    cardImage.attr("src", res.data[i].images.original_still.url);
                    cardImage.attr("data-state", "still");
                    var ul = $("<ul class='list-group list-group-flush'>");
                    var li1 = $("<li class='list-group-item'>");
                    var li2 = $("<li class='list-group-item'>");
                    var link = $("<a class='card-link'>").attr("href", res.data[i].images.original.url).text("Download GIF");
                    li1.text("Rating: " + res.data[i].rating);
                    var group = ul.add(li1).add(li2).add(link);
                    var cardTitle = $("<div class=title><h5 class='card-title'></h5></div>");
                    if (res.data[i].title === "") {
                        res.data[i].title = "Unamed Gif";
                    }
                    cardTitle.text("#" + res.data[i].title);

                    var allElements = imgContainer.append(cardTitle, cardImage, group);
                    allElements.appendTo("#health");
                }
            }
            return returnRes;
        });
    });
    $(document.body).on("click", ".gif", returnRes, function () {
        var chosen = $(this);
        var state = chosen.attr("data-state");
        for (var i = 0; i < returnRes.data.length; i++) {
            if (chosen.attr("src") === returnRes.data[i].images.original_still.url) {
                chosen.attr("src", returnRes.data[i].images.original.url);
                state = "animate";
            }
            else if (chosen.attr("src") === returnRes.data[i].images.original.url) {
                chosen.attr("src", returnRes.data[i].images.original_still.url);
                state = "still";
            }
        }
    });
    createButtons();
});

