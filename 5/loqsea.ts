type PokemonResponse = {
    name: string,
    url: string
}

async function fetchApi () {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    return response.json();
};

async function mostrarPorConsola () {
    const response = await fetchApi();

    const pokemones: PokemonResponse[] = response.results;

    console.log(pokemones);

    pokemones.forEach(async (pokemon) => {
        const data = await fetch(pokemon.url);
        // Destructuring para obtener solo las propiedades necesarias
        const {abilities} = await data.json();
        console.log(abilities);
    })


};

mostrarPorConsola();


