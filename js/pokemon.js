


const listWrapper = document.querySelector(".list-wrapper");
const genWrapper= document.querySelector(".gen-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");


  const generations = {
    Gen1: {
      start: 1,
      end: 151,
    },
    Gen2: {
      start: 152,
      end: 251,
    },
    Gen3: {
      start: 252,
      end: 386,
    },
    Gen4: {
      start: 387,
      end: 493,
    },
    Gen5: {
      start: 494,
      end: 649,
    },
    Gen6: {
      start: 650,
      end: 721,
    },
    Gen7: {
      start: 722,
      end: 809,
    },
    Gen8: {
      start: 810,
      end: 905,
    },
    
    Gen9: {
      start: 906,
      end: 1025,
    },
    AllGen: {
      start: 1,
      end: 1025
    }
  };
const allPokemon= [];

  const fetchPokemons = async (gen) => {
    const { start, end } = generations[gen];

    for (let i = start; i <= end; i++) {
      const pokemonName = i.toString();
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  
      let res = await fetch(url);
     let allPokemon = await res.json();
      //console.log(allPokemon);
      displayPokemons(allPokemon);
    }
  };

 

async function fetchPokemonDataBeforeRedirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
      
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to fetch Pokemon data before redirect");
  }
}



const displayPokemons = (pokemon) => {
  //listWrapper.innerHTML = "";

    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
        <div class="number-wrap">
            <p class="caption-fonts">#${pokemon.id}</p>
        </div>
        <div class="img-wrap">
            <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}" />
        </div>
        <div class="name-wrap">
            <p class="body3-fonts">#${pokemon.name}</p>
        </div>
    `;

    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemon.id);
      if (success) {
        window.location.href = `./details/detail.html?id=${pokemon.id}`;
      }
    });

    listWrapper.appendChild(listItem);
  
}

const changeGeneration = () => {
  const genSelect = document.getElementById("genSelect");
  genSelect.addEventListener("click", (event) => {
    const selectedGeneration = event.target.getAttribute("data-value");
    console.log(selectedGeneration);
    const activeGen = document.querySelector(".active");
    if (selectedGeneration) {
      listWrapper.innerHTML = "";
      fetchPokemons(selectedGeneration);
      activeGen.classList.remove("active");
      event.target.classList.add("active");
    }
  });
};

fetchPokemons("AllGen");
     


//searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;

  if (numberFilter.checked) {
    filteredPokemons = allPokemon.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];
      return pokemonID.startsWith(searchTerm);
    });
  } else if (nameFilter.checked) {
    filteredPokemons = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm)
    );
  } else {
    filteredPokemons = allPokemon;
  }

  displayPokemons(filteredPokemons);

  if (filteredPokemons.length === 0) {
    notFoundMessage.style.display = "block";
  } else {
    notFoundMessage.style.display = "none";
  }
}

const closeButton = document.querySelector(".search-close-icon");
closeButton.addEventListener("click", clearSearch);

function clearSearch() {
  searchInput.value = "";
  displayPokemons(allPokemon);
  notFoundMessage.style.display = "none";
}
changeGeneration();