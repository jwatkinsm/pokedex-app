let allGens= [];

fetch('https://pokeapi.co/api/v2/generation')
.then((response) => response.json())
.then((data) => {
  allGens = data.results;
 displayGens(allGens);
});

export function displayGens(generation) {
    genWrapper.innerHTML = "";
  
  
    generation.forEach((generation) => {
      const genItem = document.createElement("div");
      genItem.className = "gen-item";
      genItem.innerHTML = `<div class="number-wrap">
              <Button class="body3-fonts">${generation.name}</Button>
          </div>`;   
  
      
          genWrapper.appendChild(genItem);
          });
        }