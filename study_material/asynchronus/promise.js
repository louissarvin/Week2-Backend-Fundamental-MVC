// Import library node-fetch untuk melakukan HTTP request di Node.js
// node-fetch memungkinkan kita menggunakan fetch API seperti di browser
import fetch from "node-fetch";

// Definisi fungsi getPokemonDataPromise yang mengembalikan Promise
// Fungsi ini menggunakan Promise chaining untuk menangani operasi asynchronous bertingkat
const getPokemonDataPromise = function(pokemonName) {
  // Deklarasi variabel pokemon untuk menyimpan data yang akan dikumpulkan
  // Variabel ini akan digunakan untuk menggabungkan data dari berbagai API call
  let pokemon;

  // Return statement yang mengembalikan Promise chain
  // Promise chain ini akan menjalankan operasi secara berurutan
  return (
    // Level 1 - Ambil data Pokémon dasar dari API
    // getPokemonBaseData() mengembalikan Promise dengan data dasar pokemon
    getPokemonBaseData(pokemonName)
      
      // Level 2 - .then() pertama: menangani hasil dari getPokemonBaseData()
      .then((p) => {
        // Simpan data pokemon dasar ke variabel pokemon untuk digunakan nanti
        pokemon = p;
        // Return data pokemon untuk diteruskan ke .then() berikutnya
        return p;
      })
      
      // Level 3 - .then() kedua: menjalankan dua operasi secara parallel
      .then((pokemon) => 
        // Promise.all() menjalankan multiple promises secara bersamaan
        // Menunggu SEMUA promise selesai sebelum melanjutkan ke .then() berikutnya
        Promise.all([
          getPokemonTypes(pokemon),  // Ambil data tipe pokemon
          getPokemonStats(pokemon)   // Ambil data statistik pokemon
        ])
      )
      
      // Level 4 - .then() ketiga: menggabungkan semua data yang sudah dikumpulkan
      .then((result) => 
        // result berisi array [types, stats] dari Promise.all()
        // mergeData() akan menggabungkan semua data menjadi satu object
        mergeData(result)
      )
  );

  // Inner function: mengambil data dasar pokemon dari API
  function getPokemonBaseData(name) {
    // Melakukan HTTP GET request ke Pokemon API dengan nama pokemon
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        // Mengecek apakah HTTP response berhasil (status 200-299)
        if (!response.ok) {
          // Jika gagal, lempar error yang akan ditangkap oleh .catch()
          throw new Error('Network response was not ok');
        }
        // Jika berhasil, parse response body dari JSON ke JavaScript object
        return response.json();
      });
  }

  // Inner function: mengambil detail tipe pokemon dari URL yang ada di data dasar
  function getPokemonTypes(pokemon) {
    // Mengakses URL tipe pertama dari data pokemon yang sudah diambil sebelumnya
    // pokemon.types[0].type.url berisi URL detail untuk tipe pokemon
    return fetch(pokemon.types[0].type.url)
      .then(response => {
        // Mengecek apakah HTTP response berhasil
        if (!response.ok) {
          // Jika gagal, lempar error
          throw new Error('Network response was not ok');
        }
        // Parse response JSON menjadi JavaScript object
        return response.json();
      });
  }

  // Inner function: mengambil data statistik pokemon (seperti HP, Attack, Defense)
  function getPokemonStats(pokemon) {
    // Melakukan request ke endpoint yang sama dengan getPokemonBaseData
    // Tapi kali ini fokus pada data statistik pokemon
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .then(response => {
        // Mengecek apakah HTTP response berhasil
        if (!response.ok) {
          // Jika gagal, lempar error
          throw new Error('Network response was not ok');
        }
        // Parse response JSON menjadi JavaScript object
        return response.json();
      });
  }

  // Inner function: menggabungkan semua data yang telah dikumpulkan
  function mergeData(result) {
    // Destructuring assignment: memecah array result menjadi dua variabel
    // result[0] akan menjadi types, result[1] akan menjadi stats
    const [types, stats] = result;
    
    // Jika data types berhasil diambil (tidak null/undefined)
    if (types) {
      // Tambahkan/update data types ke object pokemon utama
      pokemon.types = types;
    }
    
    // Jika data stats berhasil diambil (tidak null/undefined)
    if (stats) {
      // Tambahkan/update data stats ke object pokemon utama
      pokemon.stats = stats;
    }
    
    // Return object pokemon yang sudah lengkap dengan semua data
    return pokemon;
  }
};

// ===== CONTOH PENGGUNAAN PROMISE =====

// Memanggil fungsi getPokemonDataPromise dengan parameter 'pikachu'
// Fungsi ini mengembalikan Promise, jadi kita bisa menggunakan .then() dan .catch()
getPokemonDataPromise('pikachu')
  
  // .then() akan dieksekusi jika Promise resolved (berhasil)
  .then((pokemon) => {
    // Parameter pokemon berisi data lengkap pokemon yang sudah digabungkan
    console.log('Pokemon data:', pokemon);
  })
  
  // .catch() akan dieksekusi jika Promise rejected (gagal)
  // Error bisa berasal dari network failure, API error, atau throw new Error()
  .catch((error) => {
    // Menampilkan error message ke console dengan format error
    console.error('Error fetching Pokémon data:', error);
  });
