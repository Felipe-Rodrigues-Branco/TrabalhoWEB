const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Listar tarefas (GET /tasks)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findByUserId(req.session.userId);
    res.render('tasks/index', { tasks }); // ajuste se não tiver view específica
  } catch (err) {
    res.status(500).send('Erro ao listar tarefas');
  }
});

// Criar nova tarefa (POST /tasks)
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, categoryId } = req.body;
    await Task.create({
      userId: req.session.userId,
      categoryId: categoryId || null,
      title,
      description,
      priority: priority || 'media',
      status: 'pending',
      dueDate: null
    });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
});

// Deletar tarefa (DELETE /tasks/:id)
router.delete('/:id', async (req, res) => {
  try {
    await Task.delete(req.params.id); // Task.delete deve existir no seu Model
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
});

module.exports = router;
