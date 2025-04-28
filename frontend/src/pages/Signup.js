import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../css/Signup.css'; 

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Instanciar o navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        // Redirecionar para login após sucesso
        setTimeout(() => {
          navigate('/login'); // Redireciona para a página de login
        }, 1000); // Atrasar para mostrar a mensagem
      } else {
        setMessage(data.message || 'Erro ao cadastrar.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro de conexão.');
    }
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div id="webcrumbs-signup">
      <div className="w-full flex justify-center">
        <div className="w-[1200px] p-8 bg-gradient-to-br from-primary-50 to-primary-100 font-sans">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-primary-600 p-8 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-500 rounded-full opacity-30"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary-700 rounded-full opacity-30"></div>
              <h1 className="text-4xl font-bold text-white mb-4 relative z-10">Tenha o controle do seu semestre</h1>
              <p className="text-primary-100 mb-6 relative z-10">
                Crie uma conta para desbloquear todos os recursos e começar sua jornada em nossa plataforma.
              </p>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-primary-200 mr-3">check_circle</span>
                  <p className="text-white">Acesso a ferramentas exclusivas</p>
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-primary-200 mr-3">check_circle</span>
                  <p className="text-white">Se programe para o semestre</p>
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-primary-200 mr-3">check_circle</span>
                  <p className="text-white">Organize suas metas</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-6">Crie sua conta!</h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label htmlFor="username" className="text-sm font-medium">Primeiro Nome</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    placeholder="Digite seu primeiro nome"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    placeholder="Digite seu email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="password" className="text-sm font-medium">Senha</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    placeholder="Crie uma senha"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.01] hover:shadow-md"
                >
                  Criar uma Conta
                </button>
              </form>
              {message && <p className="text-center text-sm mt-4 text-gray-700">{message}</p>}
              <div className="text-center mt-6">
                <p className="text-sm">
                  Já tem uma conta?{' '}
                  <a
                    href="#"
                    onClick={handleSignInClick} // Aqui usa o método correto
                    className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-all"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;