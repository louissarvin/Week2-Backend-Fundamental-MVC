import axios from "axios";

const apiUrl = 'https://pokeapi.co/api/v2'; // URL dasar API Pokémon

// Mengambil data Pokémon dasar
const getPokemonAsync = async function(pokemonName) {
  try {
    const response = await axios.get(`${apiUrl}/pokemon/${pokemonName}`);
    return response.data;
  } catch (error) {
    handleAxiosErrors(error, 'Pokemon');
  }
};

// Mengambil data tipe Pokémon
const getPokemonTypesAsync = async function(pokemon) {
  try {
    // Mengambil tipe Pokémon dari data dasar
    const types = await Promise.all(
      pokemon.types.map(async (typeInfo) => {
        const response = await axios.get(typeInfo.type.url);
        return response.data;
      })
    );
    return types;
  } catch (error) {
    handleAxiosErrors(error, 'Types');
  }
};

// Mengambil statistik Pokémon
const getPokemonStatsAsync = async function(pokemon) {
  try {
    // Mengambil statistik Pokémon dari data dasar
    const response = await axios.get(`${apiUrl}/pokemon/${pokemon.id}`);
    return response.data.stats;
  } catch (error) {
    handleAxiosErrors(error, 'Stats');
  }
};

// Fungsi untuk menangani kesalahan dari axios
function handleAxiosErrors(error, context) {
  console.error(`Error fetching ${context}:`, error);
}

// Fungsi utama untuk mengambil data Pokémon lengkap
const getPokemonDataAsync = async function(pokemonName) {
  try {
    const pokemon = await getPokemonAsync(pokemonName);
    const types = await getPokemonTypesAsync(pokemon);
    const stats = await getPokemonStatsAsync(pokemon);
    // Gabungkan data
    return {
      ...pokemon,
      types,
      stats
    };
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
};

// Contoh penggunaan
getPokemonDataAsync('pikachu')
  .then((pokemon) => {
    console.log('Pokemon data:', pokemon);
  })
  .catch((error) => {
    console.error('Error fetching Pokémon data:', error);
  });