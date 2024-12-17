


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
  const pokecontainer= document.createElement("div");
  pokecontainer.className= "poke";
  pokecontainer.innerHTML= `
             <svg
              width="24"
              height="24"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="ball"
              data-value="${pokemon.id}"
            >
              <path
                d="M29.7144 24C29.7144 27.1559 27.156 29.7143 24.0001 29.7143C20.8442 29.7143 18.2858 27.1559 18.2858 24C18.2858 20.8441 20.8442 18.2857 24.0001 18.2857C27.156 18.2857 29.7144 20.8441 29.7144 24Z"
                  fill=""
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24.0001 48C36.0909 48 46.0934 39.0593 47.7571 27.4286H33.7006C32.2885 31.4235 28.4786 34.2857 24.0001 34.2857C19.5217 34.2857 15.7117 31.4235 14.2997 27.4286H0.243164C1.90681 39.0593 11.9094 48 24.0001 48ZM14.2997 20.5714H0.243164C1.90681 8.94071 11.9094 0 24.0001 0C36.0909 0 46.0934 8.94071 47.7571 20.5714H33.7006C32.2885 16.5765 28.4786 13.7143 24.0001 13.7143C19.5217 13.7143 15.7117 16.5765 14.2997 20.5714ZM29.7144 24C29.7144 27.1559 27.156 29.7143 24.0001 29.7143C20.8442 29.7143 18.2858 27.1559 18.2858 24C18.2858 20.8441 20.8442 18.2857 24.0001 18.2857C27.156 18.2857 29.7144 20.8441 29.7144 24Z"
                fill=""
              />
            </svg>
  `;

  const ballList = document.querySelectorAll('.ball');
console.log(ballList);

ballList.forEach(ball =>{
  ball.addEventListener('click', ()=>{
    ball.classList.add('catch')
  })
  ball.addEventListener('dblclick', ()=>{
    ball.classList.remove('catch')
  })
})

  listWrapper.appendChild(pokecontainer);
  
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
            <p class="body3-fonts">${pokemon.name}</p>
        </div>
    `;

    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemon.id);
      if (success) {
        window.location.href = `./details/detail.html?id=${pokemon.id}`;
      }
    });

    pokecontainer.appendChild(listItem);
  
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

function handleSearch(pokemon) {
  const searchTerm = searchInput.value.toLowerCase();
  let x = document.getElementsByClassName("poke");

  for (i = 0; i < x.length; i++) {
    // checking  the name or type entered by user from search box if doesn't match than dont display the message
    if (!x[i].innerHTML.toLowerCase().includes(searchTerm)) {
      x[i].style.display = "none";
    }
    // checking  the name or type entered by user from search box if doesn't match than dont display the pokemon card
    else {
      x[i].style.display = "block";
    }
  }
}

const closeButton = document.querySelector(".search-close-icon");
closeButton.addEventListener("click", clearSearch);

function clearSearch() {
  searchInput.value = "";
  displayPokemons(allPokemon);
  notFoundMessage.style.display = "none";
}

function stopCatchAnimation() {
  const cart = document.querySelector('.ball');
  cart.classList.remove('catch');
}
changeGeneration();