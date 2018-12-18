import $ from 'jquery'

let baseUrl = 'https://wordwatch-api.herokuapp.com'

$(document).ready(() => {
  getFavoriteWord()
})

const getFavoriteWord = () => {
  $('.word-count').html('')
  fetch(`${baseUrl}/api/v1/top_word`)
    .then(result => result.json())
    .then(favoriteWord => appendFavoriteWord(favoriteWord))
    .catch(error => ({ error }))
}

const appendFavoriteWord = (favoriteWord) => {
  let word = Object.keys(favoriteWord['word']).pop();
  let quantity = favoriteWord['word'][word];
  $('.word-count').append(`<p>${word}: ${quantity}</p>`)
}

const addWords = () => {
  let userText = $('textarea#text-area').val();
  let textArray = userText.split(' ');
  textArray.forEach(function(word) {
    addWord(word);
  });
  getFavoriteWord();
};

const addWord = (word) => {
  fetch(`${baseUrl}/api/v1/words`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      word: {
        value: `${word}`
      }
    })
  })
}

const wordLoop = (word) => {
  let i = 0;
  while (i < 200) {
    addWord(word);
    i++;
  }
}

wordLoop('shaun')

$('#break-down-button').click(addWords);
