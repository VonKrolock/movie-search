const form = document.querySelector('form');
const input = document.querySelector('#searchTerm');
const API_URL = 'http://www.omdbapi.com/?apikey=35aa9b11&s=';
const carouselImages = document.querySelector('.carousel__images');
const carouselButtons = document.querySelectorAll('.carousel__button');
const numberOfImages = document.querySelectorAll('.carousel__images img').length;
const resultsSection = document.querySelector('#results');

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  const searchTerm = input.value;
  getRezults(searchTerm);
}

function getRezults(searchTerm) {
  const url = `${API_URL}${searchTerm}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showRezults(data.Search))
    .catch(() => resultsSection.innerHTML = `<div class="container w-25 alert alert-danger" role="alert">No results for ${searchTerm}</div>`);
}

function showRezults(results) {
  let output = '';
  resultsSection.innerHTML = '';
  results.forEach((movie) => {
    output += `<div class="cards p-4 w-25">
                      <a class="link__imdb__card" href="http://imdb.com/title/${movie.imdbID}" target="__blank"><img src="${movie.Poster}" class="card-top" alt="${movie.Title}"></a> 
                  <div class="mt-3">
                      <a class="link__imdb" href="http://imdb.com/title/${movie.imdbID}" target="__blank">IMDb</a>
                      <h5 class="mt-2">${movie.Title}</h5>
                      <p>${movie.Year}</p>  
                  </div>
                </div> `;
  });
  carouselImages.innerHTML = output;
}

let imageIndex = 1;
let translateX = 0;
carouselButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (event.target.id === 'previous') {
      if (imageIndex !== 1) {
        imageIndex--;
        translateX += 285;
      }
    } else if (imageIndex !== numberOfImages) {
      imageIndex++;
      translateX -= 285;
    }
    carouselImages.style.transform = `translateX(${translateX}px)`;
  });
});