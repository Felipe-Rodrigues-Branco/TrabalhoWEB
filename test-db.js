require('dotenv').config();
const pool = require('./models/db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro na conexão:', err);
  } else {
    console.log('Conectado! Hora atual do banco:', res.rows[0].now);
  }
  pool.end();
});
