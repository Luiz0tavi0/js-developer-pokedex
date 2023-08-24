import pokeApi from "./poke-api.js"
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    const listItemPokemon = document.createElement('li');
    listItemPokemon.classList.add("pokemon", pokemon.type);

    const spanNumber = document.createElement('span');
    spanNumber.textContent = pokemon.number.toString()
    spanNumber.classList.add('number');
    const spanName = document.createElement('span');
    spanName.classList.add('name');
    spanName.textContent = pokemon.name.toString();


    listItemPokemon.appendChild(spanNumber);
    listItemPokemon.appendChild(spanName);

    const detailList = document.createElement('div');
    detailList.className = "detail";
    const typesList = document.createElement('ol');
    typesList.className = 'types';

    pokemon.types.forEach(type => {
        let itemType = document.createElement('li');
        let itemText = document.createTextNode(type);
        itemType.classList.add('type', type);
        itemType.appendChild(itemText);
        typesList.appendChild(itemType);
    })
    detailList.appendChild(typesList);

    const pokemonPhoto = document.createElement('img');
    pokemonPhoto.setAttribute('src', pokemon.photo);
    pokemonPhoto.setAttribute('alt', pokemon.name);

    detailList.appendChild(pokemonPhoto);

    listItemPokemon.appendChild(detailList);
    // return listItemPokemon.outerHTML;
    return listItemPokemon;

    // return `
    // <li class="pokemon ${pokemon.type}">
    //     <span class="number">#${pokemon.number}</span>
    //     <span class="name">${pokemon.name}</span>

    //     <div class="detail">
    //         <ol class="types">
    //             ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    //         </ol>

    //         <img src=${pokemon.photo} alt=${pokemon.name}>
    //     </div>
    // </li>
    // `
}

function loadPokemonItens(offset, limit) {
    const fragment = document.createDocumentFragment();

    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            for (let pokemon of pokemons)
                fragment.appendChild(convertPokemonToLi(pokemon));
            pokemonList.appendChild(fragment);
        })

}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})