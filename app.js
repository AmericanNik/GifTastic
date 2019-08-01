$(document).ready(function(){
  console.log('ready');

let topics = ['murica','freedom','usa','patriot','america','donald trump', 'hillary clinton','barack obama'];
let docButtonHolder = $('#buttonHolder');
let docDisplay = $('#display');
let userInput = $('#userInput')
let inputBox = $('#inputBox');
let userSubmit = $('#userSubmit');


console.log(topics);

userSubmit.on('click', function(event){
  console.log('submitted!');
  userGives = inputBox.val().trim()
  topics.push(userGives)
  inputBox.val('');
  generateButtons();

});

const generateButtons = function(){
  $('#buttonHolder').empty();

  topics.forEach(function(topic){

    console.log(topic);
    let button = $('<button>').on('click', function(){
      docDisplay.empty();
      let queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=42Jbadnmd723gU0vIJSYwE3eeyXksAjT&limit=10&rating=g&q="+topic;
      $.ajax({
        url: queryUrl,
        method: "GET"
      }).then(function(response){
        console.log(response);
        response.data.forEach(img => {
        const image = $('<img />').attr('src', img.images.original.url);
        docDisplay.prepend(image);
        });
        // console.log('replied!');
        // docDisplay.prepend($('<img>'));
      });

    });
    docButtonHolder.append(button.text(topic));

  });
};

generateButtons();


});
