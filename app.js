$(document).ready(function() {
  console.log('ready');

  let topics = ['murica', 'freedom', 'usa', 'patriot', 'america', 'donald trump', 'hillary clinton', 'barack obama'];
  let docButtonHolder = $('#buttonHolder');
  let docDisplay = $('#display');
  let userInput = $('#userInput')
  let inputBox = $('#inputBox');
  let userSubmit = $('#userSubmit');

  userSubmit.on('click', function(event) {
    userGives = inputBox.val().trim()
    topics.push(userGives);
    inputBox.val('');
    generateButtons();
  });

  const generateButtons = function() {
    $('#buttonHolder').empty();
    topics.forEach(function(topic) {
      let button = $('<button>').addClass('btn btn-dark').on('click', function() {
        docDisplay.empty();
        let queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=42Jbadnmd723gU0vIJSYwE3eeyXksAjT&limit=10&rating=g&q=" + topic;
        $.ajax({
          url: queryUrl,
          method: "GET"
        }).then(function(response) {
          response.data.forEach(img => {
            let image = $('<img />').attr('src', img.images.downsized_still.url).on('click', function() {
              let src = ($(this).attr('src') === img.images.downsized_still.url)
               ? img.images.original.url
               : img.images.downsized_still.url;
              $(this).attr('src', src);
            });
            docDisplay.prepend(image);
          });
        });
      });
      docButtonHolder.append(button.text(topic));
    });
  };
  generateButtons();
});
