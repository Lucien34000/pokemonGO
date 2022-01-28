const BASE_URL = 'https://pokeapi.co/api/v2';

const fetchPokemons = () => {
  axios.get(`${BASE_URL}/pokemon`)
  .then( response => {
    for (const pokemon of response.data.results) {
      axios.get(pokemon.url)
      
      .then(response => {
        console.log(response);
        let pokemonList = document.getElementById('pokemonList');
        let img = response.data.sprites.front_default;
        let imgBack = response.data.sprites.back_default;
        let typesArr = response.data.types;
        let type = typesArr[0].type.name;
        let name = response.data.forms[0].name;

        pokemonList.innerHTML +=`
          <div class="column" style="min-width: 250px;">
            <div class="card">
              <div class="card-image" style="cursor:pointer;" onclick="toggleImage(this)">
                <figure class="image is-4by3">
                  <img src="${img}" alt="Placeholder image" class="front">
                  <img src="${imgBack}" alt="Placeholder image" class="is-hidden back">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">${name}</p>
                    <p class="subtitle is-6">${type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        
      })
      .catch(error => console.log(error));
    }
  })
  .catch (error => console.log(error));
};

function toggleImage(card) {
  let imgF = card.querySelector(".front");
  let imgB = card.querySelector(".back");

  imgF.addEventListener('click',() => {
    let showBack = false;
    showBack = !showBack;
    if (showBack === true) {
      imgF.classList.add('is-hidden');
      imgB.classList.add('animate__animated');
      imgB.classList.add('animate__flipInY');
      imgB.classList.remove('is-hidden');

      setTimeout(() => {
        imgB.classList.remove('animate__animated');
        imgB.classList.remove('animate__flipInY');
      }, 500);
    }
  })
  imgB.addEventListener('click',() => {
    let showBack = true;
    showBack = !showBack;
    if (showBack === false) {
      imgB.classList.add('is-hidden');
      imgF.classList.add('animate__animated');
      imgF.classList.add('animate__flipInY');
      imgF.classList.remove('is-hidden');

      setTimeout(() => {
        imgF.classList.remove('animate__animated');
        imgF.classList.remove('animate__flipInY');
      }, 1000);
    }
  })
}

fetchPokemons();