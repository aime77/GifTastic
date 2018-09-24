$(document).ready(function () {

    var topics = ["health foods", "fitness", "pilates", "nutrition", "skin care", "running", "weight lifting", "skin care", "green foods", "barre", "yoga", "detox", "whole foods", "diet"];
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
    var cardImage;
    var allElements;
    var link2;
    var returnRes;
    $(document.body).on("click", ".buttonC", function () {
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
                    cardImage = $("<img class='card-img-top image-responsive'>");
                    cardImage.addClass("gif");
                    cardImage.attr("src", res.data[i].images.original_still.url);
                    cardImage.attr("data-state", "still");
                    var ul = $("<ul class='list-group list-group-flush'>");
                    var li1 = $("<li class='list-group-item'>");
                    var link1 = $("<a class='card-link'>").addClass("btn btn-outline-primary").attr("href", res.data[i].images.original.url).text("Download GIF");
                    link2 = $("<button>").addClass("btn btn-outline-primary").attr("data-link", res.data[i].images.original_still.url).text("Add to Favorites");
                    link2.addClass("link2");
                    li1.text("Rating: " + res.data[i].rating);
                    var group = ul.add(li1).add(link1).add(link2);
                    var cardTitle = $("<div class=title><h5 class='card-title'></h5></div>");
                    if (res.data[i].title === "") {
                        res.data[i].title = "Unamed Gif";
                    }
                    cardTitle.text("#" + res.data[i].title);

                    allElements = imgContainer.append(cardTitle, cardImage, group);
                    allElements.appendTo("#health");
                }
            }
            console.log(link2);
            return returnRes;
        });
    });
    
    var favoritesTitle = $("<h2>Favorites GIFS<br></h2>");
    $(document.body).on("click", ".link2", function () {
        var favoritesArray = [];
        var chosen = $(this);
        var imgURL = chosen.attr("data-link");
        var gifFavorite = $("<img class='image-responsive col-lg-3 col-md-4 col-sm-6 px-1 my-3 py-1 float-left'>");
        gifFavorite.addClass("gifFavoriteClass")
        cardImage.attr("data-state", "still");
        console.log(imgURL);
        $("#favoriteSpaceTitle").append(favoritesTitle)
        favoritesArray.push(imgURL);
        console.log(favoritesArray);
        for (var i = 0; i < favoritesArray.length; i++) {
            gifFavorite.attr("src", favoritesArray[i]);
            gifFavorite.appendTo("#favoriteSpace");
        }


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

    $(document.body).on("click", ".gifFavoriteClass", returnRes, function () {
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

