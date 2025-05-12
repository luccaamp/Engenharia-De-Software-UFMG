import React, { useState } from 'react';

function Configuracoes() {
    const [activeTab, setActiveTab] = useState('email');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);

    // Estados para o formulário de email
    const [emailData, setEmailData] = useState({
        current_password: '',
        new_email: ''
    });

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmailData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        const token = localStorage.getItem('access_token');
        if (!token) {
            setMessage({ text: 'Você precisa estar logado para realizar esta ação', type: 'error' });
            setLoading(false);
            return; // Apenas exibe o erro, sem redirecionar
        }

        try {
            const response = await fetch('http://localhost:8000/profile/change-email', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    current_password: emailData.current_password,
                    new_email: emailData.new_email
                })
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('access_token');
                    setMessage({ text: 'Sua sessão expirou. Faça login novamente.', type: 'error' });
                    return; // Apenas exibe o erro, sem redirecionar
                }
                throw new Error(data.detail || 'Erro ao alterar email');
            }

            setMessage({ text: data.message || 'Email alterado com sucesso!', type: 'success' });
            
            // Atualiza o token no localStorage (se necessário)
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
            }
            
            // Limpa os campos do formulário
            setEmailData({
                current_password: '',
                new_email: ''
            });

        } catch (error) {
            console.error('Erro na requisição:', error);
            let errorMessage = error.message;
            
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                errorMessage = 'Erro de conexão com o servidor';
            }
            
            setMessage({ text: errorMessage, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Configurações da Conta</h2>
            
            {/* Mensagens de feedback */}
            {message.text && (
                <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                </div>
            )}

            {/* Abas de navegação */}
            <div className="mb-6 flex border-b border-gray-200">
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'email' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('email')}
                >
                    Alterar Email
                </button>
            </div>

            {/* Formulário de Alteração de Email */}
            {activeTab === 'email' && (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="current_password_email" className="block text-sm font-medium text-gray-700 mb-1">
                            Senha Atual
                        </label>
                        <input
                            type="password"
                            id="current_password_email"
                            name="current_password"
                            value={emailData.current_password}
                            onChange={handleEmailChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="new_email" className="block text-sm font-medium text-gray-700 mb-1">
                            Novo Email
                        </label>
                        <input
                            type="email"
                            id="new_email"
                            name="new_email"
                            value={emailData.new_email}
                            onChange={handleEmailChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                    >
                        {loading ? 'Alterando...' : 'Alterar Email'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default Configuracoes;