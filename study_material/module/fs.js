const fs = require('fs');
const path = require('path');

// Sync: Hanya untuk inisialisasi awal
try {
  const config = fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8');
  console.log('Konfigurasi server:', JSON.parse(config));
} catch (error) {
  console.error('Gagal baca config:', error);
}

// Async: Untuk operasi runtime
fs.promises.writeFile('server.log', `${new Date()} - Server started\n`, { flag: 'a' })
  .then(() => console.log('Log berhasil ditambahkan'))
  .catch(err => console.error('Error logging:', err));