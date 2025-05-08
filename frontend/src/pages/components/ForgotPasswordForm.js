import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/esqueci-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.status === 404) {
        setErrorMessage('Este email não está cadastrado! Por favor, faça uma conta.');
      } else {
        localStorage.setItem('resetEmail', email);
        navigate('/verify-code');
      }
    } catch (err) {
      setErrorMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Esqueceu sua senha?</h2>
      <form className="space-y-5" onSubmit={handleForgotPasswordSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Cadastrado</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            placeholder="your@email.com"
            required
          />
        </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
