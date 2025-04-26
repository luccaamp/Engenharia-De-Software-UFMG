const User = require('../models/User');
const bcrypt = require('bcrypt'); // Biblioteca para criptografar senhas

// Função para cadastro (signup)
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verifica se já existe um usuário com esse email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está cadastrado.' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria novo usuário
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Salva no banco de dados
    await newUser.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
};

// Função para login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Procura usuário pelo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    // Compara a senha digitada com a senha salva (criptografada)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    // Se tudo certo, envia sucesso
    res.status(200).json({ message: 'Login realizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
};
