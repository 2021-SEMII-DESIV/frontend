(() => {
    const form = document.getElementById('pokemon-form');
    const formSubmitHandler = async (event) => {
        event.preventDefault();
        const output = document.querySelector('.pokemon-output');
        const pkid = Number(document.getElementById('id').value);
        if (!pkid) {
            alert('El id debe ser un número válido.');
            return;
        }
        const rawResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkid}/`);
        const { id, name, weight, height, sprites: { front_default } } = await rawResponse.json();
        console.log({ id, name, weight, height, front_default });
        const html = `<div class="card"><h3>${name} (${id})</h3><p>Weight: ${weight}</p><p>Height: ${height}</p><img src="${front_default}"></div>`;
        output.innerHTML += html;
    };
    form.addEventListener('submit', formSubmitHandler);
})();