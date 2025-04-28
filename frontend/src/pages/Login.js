import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../css/Login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.detail || 'Erro ao fazer login.');
      } else {
        navigate('/principal'); // Redireciona para a página principal
      }
    } catch (error) {
      setErrorMessage('Erro na conexão com o servidor.');
    }
  };

  return (
    <div id="webcrumbs-login" className="flex items-center justify-center h-screen">
      <div className="w-[400px] min-h-[600px] mx-auto bg-gradient-to-r from-neutral-50 to-gray-100 shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
        <h1 className="text-4xl font-title text-center text-black mb-6 tracking-wide">Login</h1>
        <div className="flex flex-col gap-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="email" className="block text-lg font-medium">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2 text-purple-300">mail</span>
                <input 
                  id="email" 
                  type="email" 
                  className="w-full px-10 py-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ease-in-out transform focus:scale-105" 
                  placeholder="Seu email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-lg font-medium">Senha</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2 text-purple-300">lock</span>
                <input 
                  id="password" 
                  type="password" 
                  className="w-full px-10 py-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ease-in-out transform focus:scale-105" 
                  placeholder="Sua senha" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {errorMessage && (
              <div className="text-black text-center">
                <span className="text-sm fade-in">{errorMessage}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full px-4 py-3 bg-purple-700 text-neutral-50 rounded-full hover:bg-purple-600 focus:bg-purple-800 transition-transform transform hover:scale-105 duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-sm mt-4 text-center">
            Ainda não tem uma conta?{' '}
            <Link to="/" className="text-purple-600 hover:underline">
              Crie uma
            </Link>
          </p>
          <div className="mt-6 text-center space-y-4">
            <a href="#" className="block text-sm text-purple-600 hover:underline">Esqueceu sua senha?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
