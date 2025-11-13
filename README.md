TaskFlow - Sistema de Gerenciamento de Tarefas
Sistema web para gerenciamento de tarefas com categorias, autenticação de usuários e proteção CSRF.

Arquitetura
Aplicação SSR (Server-Side Rendering) usando Node.js/Express com PostgreSQL.

Camadas:

Views (EJS): Páginas renderizadas no servidor

Routes: Endpoints HTTP

Controllers: Lógica de negócio/validação

Models: Consulta/acesso ao banco

Middlewares: Controle de autenticação e proteção CSRF

Segurança:

Senhas com hash via bcrypt

Sessões com cookies HttpOnly e SameSite=strict

CSRF obrigatório em todo formulário

Validação server-side

Pré-requisitos
Node.js 16+

PostgreSQL 13+

npm (ou yarn)

Como Executar
1. Clone o repositório
cd taskflow

2. Instale as dependências
npm install

3. Configure o banco de dados
Crie um banco PostgreSQL e execute o script SQL:

psql -U seu_usuario -d seu_banco -f database/init.sql

4. Configure o arquivo .env
Copie o arquivo exemplo e preencha conforme seu setup:
cp .env.example .env

Exemplo de .env:
DATABASE_URL=postgresql://usuario:senha@localhost:5432/taskflow
SESSION_SECRET=gere_um_secret_aleatorio
PORT=3000
NODE_ENV=development

5. Instale o método override

npm install method-override

6. Inicie o servidor
Desenvolvimento:

npm run dev

Produção:

npm start

Acesse em http://localhost:3000


Primeiro uso
Registre um novo usuário em /auth/register.

Será feito login automaticamente; você irá para o dashboard.

Crie categorias para separar suas tarefas.

Cadastre tarefas ligadas às categorias.

Edite/exclua tarefas e categorias pelo painel.

Efetue logout quando desejar.

Endpoints principais
Método	Rota	Descrição
GET	/	Redireciona para login/dashboard
GET	/auth/login	Página de login
POST	/auth/login	Autenticar usuário
GET	/auth/register	Página de registro
POST	/auth/register	Criar nova conta
POST	/auth/logout	Encerrar sessão
GET	/dashboard	Dashboard principal (autenticado)
GET	/tasks	Listar tarefas
POST	/tasks	Criar tarefa
PUT	/tasks/:id	Editar tarefa
DELETE	/tasks/:id	Excluir tarefa
GET	/categories	Listar categorias
POST	/categories	Criar categoria
PUT	/categories/:id	Editar categoria
DELETE	/categories/:id	Excluir categoria

Estrutura de Pastas

taskflow/
├── server.js             # Servidor principal
├── database/             # Scripts SQL
├── models/               # Modelos para acessar o banco
├── controllers/          # Lógica de negócio e validação
├── routes/               # Rotas HTTP do app
├── middleware/           # Middlewares personalizados
├── views/                # Templates EJS
├── public/               # Arquivos estáticos
├── .env / .env.example   # Variáveis de ambiente
└── docs/system-design/   # Diagramas de arquitetura

Tecnologias
Node.js + Express

PostgreSQL

EJS (template engine)

express-session

bcrypt

csurf

dotenv

method-override

Deploy & Produtivo
Pronto para deploy em Render, Railway, Supabase, ElephantSQL, etc.

Basta definir as variables de ambiente (DATABASE_URL, SESSION_SECRET, etc.)

Para produção, defina NODE_ENV=production no .env.

Licença: MIT
