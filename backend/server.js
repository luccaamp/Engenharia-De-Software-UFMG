const express = require('express');
const connectDB = require('./database');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); // Para permitir o frontend se conectar

const app = express();
app.use(cors());
app.use(express.json()); // Para o servidor entender JSON

// Conecta ao banco
connectDB();

// Usa as rotas de autenticação
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
