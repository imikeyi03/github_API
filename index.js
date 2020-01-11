'use strict';

const mediaType = "application/vnd.github.nebula-preview+json";
const searchURL = 'https://api.github.com';

function displayResults(responseJson) {
  $('#results-list').empty('');
  
  responseJson.forEach(repo =>
    $('#results-list').append(`<a href="${repo.html_url}"><li>${repo.name}</a></li>`)
  );

  //display the results section  
  $('#results').removeClass('hidden');
};


function getNews(searchTerm) {
  const url = searchURL + '/users/' + searchTerm + '/repos';
  
  const options = {
    headers: new Headers({
      "Accept": mediaType})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-user-handle').val();
    getNews(searchTerm);
  });
}

$(watchForm);