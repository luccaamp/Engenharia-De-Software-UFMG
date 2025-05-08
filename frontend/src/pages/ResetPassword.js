import React, { useState } from 'react';
import '../css/ForgotPassword.css';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const email = localStorage.getItem('resetEmail');

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:8000/redefinir-senha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, new_password: newPassword }),
    });

    if (response.ok) {
      setMessage('Senha alterada com sucesso!');
      localStorage.removeItem('resetEmail');

      // Espera 2 segundos e redireciona para login
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setMessage('Erro ao alterar senha. Tente novamente.');
    }
  };

  return (
    <div id="webcrumbs-login" className="flex items-center justify-center h-screen">
      <div className="w-[400px] min-h-[600px] mx-auto bg-gradient-to-r from-neutral-50 to-gray-100 shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
        <h1 className="text-4xl font-title text-center text-black mb-6 tracking-wide">Redefinir Senha</h1>
        <div className="flex flex-col gap-4">
          <form className="space-y-6" onSubmit={handleReset}>
            <div className="space-y-1">
              <label htmlFor="newPassword" className="block text-lg font-medium">Nova Senha</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2 text-purple-300">lock</span>
                <input
                  id="newPassword"
                  type="password"
                  className="w-full px-10 py-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ease-in-out transform focus:scale-105"
                  placeholder="Digite a nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {message && (
              <div className="text-black text-center">
                <span className="text-sm fade-in">{message}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-3 bg-purple-700 text-neutral-50 rounded-full hover:bg-purple-600 focus:bg-purple-800 transition-transform transform hover:scale-105 duration-300"
            >
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;