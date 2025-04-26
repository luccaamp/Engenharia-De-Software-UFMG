// Importa o mongoose (biblioteca que conecta com o MongoDB)
const mongoose = require('mongoose');

// Cria o "desenho" de como será o usuário no banco de dados
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Nome de usuário
  email: { type: String, required: true, unique: true }, // Email, único
  password: { type: String, required: true }, // Senha (vamos criptografar depois!)
}, { timestamps: true }); // Cria campos automáticos de criado/em atualização

// Exporta o modelo para poder usar em outras partes
module.exports = mongoose.model('User', userSchema);
