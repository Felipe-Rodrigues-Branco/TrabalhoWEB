const express = require('express');
const router = express.Router();

// Rota para listar usuários (GET)
router.get('/', (req, res) => {
  res.send('Lista de usuários');
});

module.exports = router;
