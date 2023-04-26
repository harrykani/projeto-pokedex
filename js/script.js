const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

function notFound() {
  pokemonImage.style.display = 'none';
  pokemonName.innerHTML = 'Not found :c';
  pokemonNumber.innerHTML = '';
}

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  pokemonImage.style.display = 'none';
  
  const data = await fetchPokemon(pokemon);

  if (data) { 
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonImage.style.display = 'block';
    input.value = '';
    
    if (data.id > 649) {
      notFound();
    }
    
    decreaseFontSize(data);
    
    searchPokemon = data.id;
  } else {
    notFound();
  }
}

/*

function decreaseFontSize(data) {
  let numberElement = pokemonNumber;
  let nameElement = pokemonName;
  let dataElement = document.querySelector('.pokemon__data');
  
  if ((numberElement.textContent === '641' ||
       numberElement.textContent === '642' ||
       numberElement.textContent === '645') ||
      (nameElement.textContent === 'tornadus-incarnate' ||
       nameElement.textContent === 'thundurus-incarnate' ||
       nameElement.textContent === 'landorus-incarnate')) {
    dataElement.style.fontSize = '1.3rem';
  }
} 

*/

function decreaseFontSize(pokemonName) {
  let nameElement = document.querySelector('.pokemon__name');
  let dataElement = document.querySelector('.pokemon__data');
  
  if (nameElement.textContent.length > 18) {
    dataElement.style.fontSize = '1.2rem';
    dataElement.style.top = '55%';
  }  else if (nameElement.textContent.length > 16) {
    dataElement.style.fontSize = '1.3rem';
  }  else if (nameElement.textContent.length > 14) {
    dataElement.style.fontSize = '1.5rem';
  } else {
    dataElement.style.fontSize = 'clamp(8px, 5vw, 25px)';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  if (searchPokemon < 649) {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  }
});


renderPokemon(searchPokemon);