require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Middlewares básicos
app.use(express.json());
// Method override: permite DELETE/PUT via formulários HTML (usa ?_method=DELETE)
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('public'));

// Configuração da view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sessão segura via cookie
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
  }
}));

// CSRF - deve ser aplicado só nas rotas que precisam
const csrfProtection = csrf({ cookie: false });

// Rotas externas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const categoryRoutes = require('./routes/categories');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/categories', categoryRoutes);

// Rota principal
app.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/auth/login');
  }
});

// Rota do dashboard autenticado
app.get('/dashboard', csrfProtection, async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  try {
    const Task = require('./models/Task');
    const Category = require('./models/Category');
    const tasks = await Task.findByUserId(req.session.userId);
    const categories = await Category.findByUserId(req.session.userId);
    res.render('dashboard', {
      user: req.session.user,
      tasks,
      categories,
      csrfToken: req.csrfToken()
    });
  } catch (error) {
    res.status(500).send('Erro ao carregar dashboard');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
