import pokeApi from "./poke-api.js";
import makeModal from "./modal.js";
import { constants } from './constants.js';
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');



function convertPokemonToLi({ type, number, name, types, photo }) {
    const listItemPokemon = document.createElement('li');
    listItemPokemon.classList.add("pokemon", type);

    const spanNumber = document.createElement('span');

    spanNumber.textContent = number.toString()
    spanNumber.classList.add('number');
    const spanName = document.createElement('span');
    spanName.classList.add('name');
    spanName.textContent = name.toString();


    listItemPokemon.appendChild(spanNumber);
    listItemPokemon.appendChild(spanName);

    const detailList = document.createElement('div');
    detailList.className = "detail";
    const typesList = document.createElement('ol');
    typesList.className = 'types';

    types.forEach(type => {
        let itemType = document.createElement('li');
        let itemText = document.createTextNode(type);
        itemType.classList.add('type', type);
        itemType.appendChild(itemText);
        typesList.appendChild(itemType);
    })
    detailList.appendChild(typesList);

    const pokemonPhoto = document.createElement('img');
    pokemonPhoto.setAttribute('src', photo);
    pokemonPhoto.setAttribute('alt', name);

    detailList.appendChild(pokemonPhoto);

    listItemPokemon.appendChild(detailList);
    listItemPokemon.addEventListener('click', () => makeModal(number));
    return listItemPokemon;

}

function loadPokemonItens(offset, limit) {
    const fragment = document.createDocumentFragment();

    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            for (let pokemon of pokemons)
                fragment.appendChild(convertPokemonToLi(pokemon));
            pokemonList.appendChild(fragment);
        });
}

loadPokemonItens(constants.OFFSET, constants.LIMIT);

loadMoreButton.addEventListener('click', () => {
    constants.OFFSET += constants.LIMIT;

    const qtdRecordsWithNexPage = constants.OFFSET + constants.LIMIT;

    if (qtdRecordsWithNexPage >= constants.MAX_RESULTS) {
        const newLimit = constants.MAX_RESULTS - constants.OFFSET;
        loadPokemonItens(OFFSET, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(constants.OFFSET, constants.LIMIT);
    }
});

// makeModal()