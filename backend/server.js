const express = require('express');
const connectDB = require('./database');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); // Para permitir o frontend se conectar

const corsOptions = {
    origin: 'http://localhost:3000', // Permite apenas o frontend do React
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeçalhos permitidos
  };

const app = express();
app.use(cors());
app.use(express.json()); // Para o servidor entender JSON

// Conecta ao banco
connectDB();

// Usa as rotas de autenticação
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
