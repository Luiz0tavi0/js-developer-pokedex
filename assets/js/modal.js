import pokeApi from "./poke-api.js";
const modal = document.querySelector('#modal');
const closeModalButton = document.querySelector("#closeModalButton");
const favoriteModalButton = document.querySelector("#favoriteModalButton");
const toggleModal = () => modal.classList.toggle('hidde');

closeModalButton.addEventListener('click', toggleModal);




function makeModal(idPokemon) {
    
    toggleModal();
    console.log('clicou no pokemon: ', idPokemon);


    // content.appendChild(modal);

}

export default makeModal;