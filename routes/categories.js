const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Listar categorias (GET /categories)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findByUserId(req.session.userId);
    res.render('categories/index', { categories }); // ajuste se não tiver view específica
  } catch (err) {
    res.status(500).send('Erro ao listar categorias');
  }
});

// Criar nova categoria (POST /categories)
router.post('/', async (req, res) => {
  try {
    const { name, color } = req.body;
    await Category.create({
      userId: req.session.userId,
      name,
      color: color || '#3498db'
    });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
});

// Deletar categoria (DELETE /categories/:id)
router.delete('/:id', async (req, res) => {
  try {
    await Category.delete(req.params.id); // Category.delete deve existir no seu Model
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
});

module.exports = router;
