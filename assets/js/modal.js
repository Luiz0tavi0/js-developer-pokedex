const modal = document.querySelector('#modal');
modal.addEventListener('click', () => { console.log('clicou no modal') });



function makeModal() {
    const modal = document.createElement('div')
    modal.className = "modal";



    content.appendChild(modal);

}

export default makeModal;