import React, { useState } from 'react';
import '../css/ForgotPassword.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/esqueci-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (response.status === 404) {
        setError('Este email não está cadastrado !!! Por favor faça uma conta');
      } else {
        localStorage.setItem('resetEmail', email);
        navigate('/verify-code');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div id="webcrumbs-login" className="flex items-center justify-center h-screen">
      <div className="w-[400px] min-h-[600px] mx-auto bg-gradient-to-r from-neutral-50 to-gray-100 shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
        <h1 className="text-4xl font-title text-center text-black mb-6 tracking-wide">Recuperar Senha</h1>
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

            {error && (
              <div className="text-black text-center">
                <span className="text-sm fade-in">{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full px-4 py-3 bg-purple-700 text-neutral-50 rounded-full hover:bg-purple-600 focus:bg-purple-800 transition-transform transform hover:scale-105 duration-300"
            >
              Enviar Código
            </button>
          </form>
          <div className="mt-6 text-center">
            <p>
              <Link to="/login" className="text-sm text-purple-600 hover:underline">Voltar para o login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
