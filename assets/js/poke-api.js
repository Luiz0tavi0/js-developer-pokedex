import Pokemon from './pokemon-model.js';
import { API_URL } from './constants.js';
const pokeApi = {}


function convertPokeApiDetailToPokemon({ id, name, sprites: { other: { dream_world: { front_default } } }, types }) {
    const typesPokemon = types.map(typeSlot => typeSlot.type.name);
    const pokemon = new Pokemon({
        number: id,
        name,
        type: typesPokemon[0],
        types: typesPokemon,
        photo: front_default
    });
    return pokemon;
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `${API_URL}?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
export default pokeApi;