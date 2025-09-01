import fetch from "node-fetch";

// Fungsi untuk mendapatkan data Pokémon dengan callback
const getPokemonDataCallback = function(
  pokemonName, // Nama Pokémon yang ingin diambil datanya
  callback,    // Callback untuk menangani data berhasil
  callbackError // Callback untuk menangani error
) {
  // Ambil data dari API Pokémon
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Misalnya kita ingin menambahkan beberapa data tambahan (contoh: jenis Pokémon)
      const pokemon = {
        id: data.id,
        name: data.name,
        types: data.types.map(typeInfo => typeInfo.type.name)
      };

      // Panggil callback dengan data Pokémon
      callback(pokemon);
    })
    .catch(error => {
      // Panggil callbackError jika terjadi error
      callbackError(error);
    });
};

// Contoh penggunaan
const handlePokemonData = (pokemon) => {
  console.log('Pokemon data:', pokemon);
};

const handleError = (error) => {
  console.error('Error fetching Pokémon data:', error);
};

// Eksekusi fungsi dengan nama Pokémon 'pikachu'
getPokemonDataCallback('pikachu', handlePokemonData, handleError);
