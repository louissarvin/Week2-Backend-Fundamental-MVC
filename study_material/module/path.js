const path = require('path');

// Membuat path dinamis untuk multi-environment
const dataPath = path.join(__dirname, 'database', process.env.NODE_ENV, 'data.db');
console.log('Database path:', dataPath); // /app/database/production/data.db

// Ekstrak komponen path
const uploadedFile = '/users/john/uploads/profile.jpg';
console.log('File name:', path.basename(uploadedFile)); // profile.jpg
console.log('Ekstensi:', path.extname(uploadedFile)); // .jpg