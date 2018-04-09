var topics= ["Barack Obama", "Martin Luther King Jr", "Nelson Mandela", "Cesar Chavez", "Rosa Parks", "Malcom X","Mahatma Gandhi", ""]

// This function creates the original buttons on the page.
starterButtons(topics);

function starterButtons(topics){
    topics.forEach(topic => {
        createButtons(topic);
    });
}

// This function is used to create buttons of the subject the user has created
function createButtons(userInput){
        
        $("#buttonArea").append(`<button value='${userInput}' class='btn btn-primary mx-1 my-1 topicArr'>${userInput}</button>`);
        $("#search").empty();    
}
// This on click is to move the search term into the array
$("#search").on("click", function(event){
 
    // Here we grab the value of whatever the user is searching
    var userInput = $("#gifsearch").val().trim();
    // I try to make sure users cannot search an empty string.
    if(userInput===""){
        alert("Cannot Search Empty")
    // Here is where the function to create buttons is used
    }else{
       
    
        createButtons(userInput);
    }
   
   
});

// This on click event is to capture the value of the buttons the user clicks
$(document).on("click", ".topicArr", function(event){
    var search = $(this).attr("value");
    // console.log(search);
    
    // This puts the value of the button into the the giffy search API
    var queryURL = `https://api.giphy.com/v1/gifs/search?q="${search}"&api_key=r9RmuzodMsGstW4cpda6IAHXBufVEfwZ&limit=10`;

    // This is where we run the AJAX to run and get us the object we need
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        // This is the var of the object that we requested 
        var result = response.data;
        console.log(result);

        // A for loop to post all 10 of the gifs on the page
        for (var j =0; j<result.length;j++){
            // We are capturing the two images we need to make it still and animate
            var stillImg = result[j].images.downsized_still.url; 
            var movImg = result[j].images.fixed_height_small.url;
            // Constructing the div that we need to store the image.
            var imageDiv = $("<div class='col-md-3'>");
            var rating = $("<p>")
            rating.text(result[j].rating);
            var imgTag = $("<img class='img-fluid mt-3'>");
            // Here we attach the info so we can switch up the src later
            imgTag.attr("src", stillImg);
            imgTag.attr("giffy", movImg);
            imgTag.attr("data-still", stillImg)
            imgTag.attr("data-state", "still");
            imageDiv.append(imgTag);
            imageDiv.append(rating);
            // Here its being attached to the page
            $("#imageArea").prepend(imageDiv);
        }

         

    });

   


});


// This on click is to be able to change the state of the picture
$(document).on("click", "img", function(event){
    // Here we capture the current state of the gif by getting a specific attribute and send it into a conditional 
    var state = $(this).attr("data-state");
    console.log(state);
    // Here we change the still images to animate them
    if (state==="still"){
        $(this).attr("src", $(this).attr("giffy"));
        $(this).attr("data-state", "animate");
        // Here we change the animate images to still
      }else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
})
