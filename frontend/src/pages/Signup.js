import React, { useState } from 'react';
import '../css/Signup.css'; 

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/signup', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Erro ao cadastrar.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro de conexão.');
    }
  };

  return (
    <div id="webcrumbs" className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[400px] min-h-[500px] bg-white rounded-lg shadow-lg p-6">
        <h1 className="font-title text-3xl text-center mb-2">Cadastro</h1>
        <p className="text-center text-lg mb-6">Crie sua conta para acessar conteúdos exclusivos.</p>
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-semibold">Nome de usuário</label>
            <input
              type="text"
              name="username"
              id="username"
              className="border border-neutral-300 rounded-md p-2"
              placeholder="Digite seu nome de usuário"
              value={formData.username}
              onChange={handleChange}
              required
            />
       