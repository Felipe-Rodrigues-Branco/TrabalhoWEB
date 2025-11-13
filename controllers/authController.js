const User = require('../models/User');

exports.showLogin = (req, res) => {
  res.render('login', { error: null, csrfToken: req.csrfToken() });
};

exports.showRegister = (req, res) => {
  res.render('register', { error: null, csrfToken: req.csrfToken() });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    
    // Validações
    if (!name || !email || !password) {
      return res.render('register', { error: 'Todos os campos são obrigatórios', csrfToken: req.csrfToken() });
    }
    
    if (password !== confirmPassword) {
      return res.render('register', { error: 'As senhas não coincidem', csrfToken: req.csrfToken() });
    }
    
    if (password.length < 6) {
      return res.render('register', { error: 'A senha deve ter no mínimo 6 caracteres', csrfToken: req.csrfToken() });
    }
    
    // Verificar se email já existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.render('register', { error: 'Email já cadastrado', csrfToken: req.csrfToken() });
    }
    
    // Criar usuário
    const user = await User.create({ name, email, password });
    
    // Login automático
    req.session.userId = user.id;
    req.session.user = { id: user.id, name: user.name, email: user.email };
    
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('register', { error: 'Erro ao criar conta', csrfToken: req.csrfToken() });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.render('login', { error: 'Email e senha são obrigatórios', csrfToken: req.csrfToken() });
    }
    
    const user = await User.findByEmail(email);
    
    if (!user) {
      return res.render('login', { error: 'Email ou senha incorretos', csrfToken: req.csrfToken() });
    }
    
    const validPassword = await User.verifyPassword(password, user.password);
    
    if (!validPassword) {
      return res.render('login', { error: 'Email ou senha incorretos', csrfToken: req.csrfToken() });
    }
    
    req.session.userId = user.id;
    req.session.user = { id: user.id, name: user.name, email: user.email };
    
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'Erro ao fazer login', csrfToken: req.csrfToken() });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/dashboard');
    }
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
};
