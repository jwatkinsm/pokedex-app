
//    document.getElementById("coughtPokemon").addEventListener("click", pokemonCought);


//function getLocalStorage(key){
//    return JSON.parse(localStorage.getItem(key));
//}
 //function setLocalstorage(key, data){
 //   localStorage.setItem(key, JSON.stringify(data))
//}
function pokemonCought(){
    let coughtMonsters = getLocalStorage("so-cart");
    //check to see if there was anything there
    if (!coughtMonsters) {
        coughtMonsters = [];
    }
    // then add the current product to the list
    coughtMonsters.push(pokemon);
    setLocalstorage("so-cart", cought);
}
