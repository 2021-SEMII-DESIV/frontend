(() => {
    // Variables
    const form = document.getElementById('pk-form');
    const pkIdInput = document.getElementById('pkid');
    const pkResponseContainer = document.getElementById('pk-response-container');
    const pkName = document.getElementById('pkname');
    const pkImage = document.getElementById('pkimg');
    const pkWeight = document.getElementById('pkweight');
    const pkHeight = document.getElementById('pkheight');
    const pkAbilities = document.getElementById('pkabilities');
    const pkMoves = document.getElementById('pkmoves');

    // Endpoints
    const getPokemonInfo = async (pkId) => {
        try {
            const pkInfoRaw = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkId}/`);
            const {
                abilities, 
                moves, 
                name, 
                id, 
                height,
                weight,
                sprites: {
                    front_default: frontDefault,
                }
            } = await pkInfoRaw.json();
            return {
                id,
                name,
                abilities: abilities.map(({ability: { name }}) => name),
                moves: moves.map(({move: { name }}) => name),
                height,
                weight,
                frontDefault
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    // Utils
    const showResponseCard = () => {
        pkResponseContainer.classList.remove('hidden');
    }
    const drawPokemonInfoIntoHTML = (moves) => {
        console.log(moves);
        pkName.innerHTML = moves.name;
        pkImage.src = moves.frontDefault;
        pkWeight.innerHTML = `Weight: ${moves.weight}`;
        pkHeight.innerHTML = `Height: ${moves.height}`;
        pkAbilities.innerHTML = moves.abilities.join('<p>')};
        pkMoves.innerHTML = moves.moves.join('<p>');
        return;
    }

    // Handler
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const pkMoves = await getPokemonInfo(pkIdInput.value);
        if(pkMoves === undefined){
            alert('Hubo un error consiguiendo los movimientos de los Pokemones.');
        }
        drawPokemonInfoIntoHTML(pkMoves);
        showResponseCard();
    };

    // Eventos
    form.addEventListener('submit', formSubmitHandler);
})();