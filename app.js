var topics= ["Barack Obama", "Martin Luther King Jr", "Nelson Mandela", "Cesar Chavez", "Rosa Parks",]


function createButtons(){

    for( var i = 0; i < topics.length; i++){
        
        $("#buttonArea").append(`<button value='${topics[i]}' class='btn btn-primary mx-1 my-1 topicArr'>${topics[i]}</button>`);
        $("#search").empty()
    };
}


// This on click is to move the search term into the array
$("#search").on("click", function(event){
    var userInput = $("#gifsearch").val().trim();
    if(userInput===""){
        alert("Cannot Search Empty")
    }else{
    
        topics.push(userInput);
   
    
        createButtons();
    }
   
   
});

$(document).on("click", ".topicArr", function(event){
    var search = $(this).attr("value");
    // console.log(search);
    
    var queryURL = `https://api.giphy.com/v1/gifs/search?q="${search}"&api_key=r9RmuzodMsGstW4cpda6IAHXBufVEfwZ&limit=10`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var result = response.data;
        console.log(result);
        for (var j =0; j<result.length;j++){
            var imageDiv = $("<div class='col-md-3'>");
            var imgTag = $("<img class='img-fluid mt-3'>");
            imgTag.attr("src", result[j].images.fixed_height_small.url);
            imageDiv.append(imgTag);
            $("#imageArea").append(imageDiv);
        }


    });


});
