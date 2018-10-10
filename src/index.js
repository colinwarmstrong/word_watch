import $ from 'jquery'

let baseUrl = 'https://wordwatch-api.herokuapp.com'

$(document).ready(() => {
  fetch(`${baseUrl}/api/v1/top_word`)
    .then(result => result.json())
    .then(favoriteWord => appendFavoriteWord(favoriteWord))
    .catch(error => ({ error }))
})

const appendFavoriteWord = (favoriteWord) => {
  let word = Object.keys(favoriteWord['word']).pop();
  let quantity = favoriteWord['word'][word];
  $('.word-count').append(`
    <p>${word}: ${quantity}</p>`)
}

const addWord = (word) => {
  
}
