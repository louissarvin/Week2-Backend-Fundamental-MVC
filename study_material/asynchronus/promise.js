import fetch from "node-fetch";

// Fungsi untuk mendapatkan data Pokémon dengan Promises
const getPokemonDataPromise = function(pokemonName) {
  let pokemon;

  // Level 1 - Ambil data Pokémon dasar
  return (
    getPokemonBaseData(pokemonName)
      // Level 2 - Set Pokémon dasar dan lanjutkan
      .then((p) => {
        pokemon = p;
        return p;
      })
      // Level 3 - Ambil tipe dan statistik Pokémon
      .then((pokemon) => Promise.all([getPokemonTypes(pokemon), getPokemonStats(pokemon)]))
      // Gabungkan data tipe dan statistik ke dalam objek Pokémon
      .then((result) => mergeData(result))
  );

  function getPokemonBaseData(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  }

  function getPokemonTypes(pokemon) {
    return fetch(pokemon.types[0].type.url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  }

  function getPokemonStats(pokemon) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  }

  function mergeData(result) {
    const [types, stats] = result;
    if (types) {
      pokemon.types = types;
    }
    if (stats) {
      pokemon.stats = stats;
    }
    return pokemon;
  }
};

// Contoh penggunaan
getPokemonDataPromise('pikachu')
  .then((pokemon) => {
    console.log('Pokemon data:', pokemon);
  })
  .catch((error) => {
    console.error('Error fetching Pokémon data:', error);
  });
