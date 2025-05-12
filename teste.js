import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Configuracoes() {
    const [activeTab, setActiveTab] = useState('email');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Estados para o formulário de email
    const [emailData, setEmailData] = useState({
        current_password: '',
        new_email: ''
    });

    // Estados para o formulário de senha
    const [passwordData, setPasswordData] = useState({
        current_password: '',
        new_password: '',
        confirm_password: ''
    });

    // Estado para o formulário de exclusão
    const [deleteData, setDeleteData] = useState({
        password: ''
    });

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmailData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDeleteChange = (e) => {
        const { name, value } = e.target;
        setDeleteData(prev => ({
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
            navigate('/login');
            return;
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
                    navigate('/login');
                    return;
                }
                throw new Error(data.detail || 'Erro ao alterar email');
            }

            setMessage({ text: data.message || 'Email alterado com sucesso!', type: 'success' });
            localStorage.setItem('access_token', data.access_token);
            setEmailData({
                current_password: '',
                new_email: ''
            });
            
            // Atualiza o estado do usuário se estiver usando contexto
            // Exemplo: updateUser({ email: data.new_email });
            
        } catch (error) {
            console.error('Erro na requisição:', error);
            let errorMessage = error.message;
            
            // Tratamento específico para erros de rede
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                errorMessage = 'Erro de conexão com o servidor';
            }
            
            setMessage({ text: errorMessage, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        if (passwordData.new_password !== passwordData.confirm_password) {
            setMessage({ text: 'Campos "Nova senha" e "Confirmar Nova Senha" são diferentes !!!', type: 'error' });
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://localhost:8000/profile/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    current_password: passwordData.current_password,
                    new_password: passwordData.new_password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // Verifica se o erro é de credenciais inválidas (senha incorreta)
                if (data.detail === "Could not validate credentials" || data.detail === "Senha atual incorreta" || data.detail === "Senha atual errada !!!") {
                    throw new Error("Senha atual errada !!!");
                }
                throw new Error(data.detail || 'Erro ao alterar senha');
            }

            setMessage({ text: 'Senha alterada com sucesso!', type: 'success' });
            setPasswordData({
                current_password: '',
                new_password: '',
                confirm_password: ''
            });
        } catch (error) {
            setMessage({ text: error.message, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        if (!window.confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://localhost:8000/profile/delete-account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(deleteData)
            });

            const data = await response.json();

            if (!response.ok) {
                // Verifica se o erro é de credenciais inválidas (senha incorreta)
                if (data.detail === "Could not validate credentials" || data.detail === "Senha incorreta. A conta não foi deletada." || data.detail === "Senha atual errada !!!") {
                    throw new Error("Senha atual errada !!!");
                }
                throw new Error(data.detail || 'Erro ao excluir conta');
            }

            localStorage.clear();
            navigate('/');
        } catch (error) {
            setMessage({ text: error.message, type: 'error' });
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
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'password' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('password')}
                >
                    Alterar Senha
                </button>
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'delete' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('delete')}
                >
                    Excluir Conta
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

            {/* Formulário de Alteração de Senha */}
            {activeTab === 'password' && (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-1">
                            Senha Atual
                        </label>
                        <input
                            type="password"
                            id="current_password"
                            name="current_password"
                            value={passwordData.current_password}
                            onChange={handlePasswordChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
                            Nova Senha
                        </label>
                        <input
                            type="password"
                            id="new_password"
                            name="new_password"
                            value={passwordData.new_password}
                            onChange={handlePasswordChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmar Nova Senha
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            value={passwordData.confirm_password}
                            onChange={handlePasswordChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                    >
                        {loading ? 'Alterando...' : 'Alterar Senha'}
                    </button>
                </form>
            )}

            {/* Formulário de Exclusão de Conta */}
            {activeTab === 'delete' && (
                <form onSubmit={handleDeleteSubmit} className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-md border border-red-200">
                        <h3 className="text-lg font-medium text-red-800 mb-2">Atenção!</h3>
                        <p className="text-red-700">
                            Ao excluir sua conta, todos os seus dados serão permanentemente removidos e não poderão ser recuperados.
                        </p>
                    </div>
                    <div>
                        <label htmlFor="delete_password" className="block text-sm font-medium text-gray-700 mb-1">
                            Digite sua senha para confirmar
                        </label>
                        <input
                            type="password"
                            id="delete_password"
                            name="password"
                            value={deleteData.password}
                            onChange={handleDeleteChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                    >
                        {loading ? 'Excluindo...' : 'Excluir Minha Conta Permanentemente'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default Configuracoes;