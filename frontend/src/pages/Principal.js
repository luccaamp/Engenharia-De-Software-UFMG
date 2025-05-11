import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../css/Principal.css";

function Principal(){
    /*export const Component = () => {*/
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Pega username e email armazenados no localStorage
        const storedUsername = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('email');

        if (storedUsername) {
            setUsername(storedUsername); // Define username
        }

        if (storedEmail) {
            setEmail(storedEmail); // Define email
        }
    }, []);

    const handleLogout = async () => {
        try {
            // Obter o token do localStorage (assumindo que você armazena ele após o login)
            const token = localStorage.getItem('access_token');
            
            const response = await fetch('http://localhost:8000/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Limpar dados do usuário do localStorage
                localStorage.removeItem('username');
                localStorage.removeItem('access_token');
                
                // Redirecionar para a página de login
                navigate('/login');
            } else {
                console.error('Erro ao fazer logout');
            }
        } catch (error) {
            console.error('Erro na conexão com o servidor:', error);
        }
    };

    return (
        <div id="webcrumbs">
            <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 font-sans">
                {/* Sidebar */}
                <aside className="w-full md:w-64 bg-white shadow-md md:min-h-screen transition-all duration-300">
                    <div className="p-4 flex items-center border-b border-gray-200">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-xl mr-2">
                            S
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-[#8507e8] to-blue-500 bg-clip-text text-transparent">
                            StudyLimoeiro
                        </h1>
                    </div>

                    <nav className="mt-6">
                        <ul className="space-y-2 px-4">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center p-3 text-gray-700 rounded-lg bg-gray-100 hover:bg-[#8507e8] hover:text-white group transition-all duration-200 hover:scale-[1.02]"
                                >
                                    <span className="material-symbols-outlined mr-3">dashboard</span>
                                    <span className="font-medium">Página Inicial</span>
                                </a>
                            </li>
                            <li>
                                <Link to="disciplinas"
                                    className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-[#8507e8] hover:text-white group transition-all duration-200 hover:scale-[1.02]"
                                >
                                    <span className="material-symbols-outlined mr-3">menu_book</span>
                                    <span className="font-medium">Disciplinas</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="estatisticas"
                                    className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-[#8507e8] hover:text-white group transition-all duration-200 hover:scale-[1.02]"
                                >
                                    <span className="material-symbols-outlined mr-3">analytics</span>
                                    <span className="font-medium">Estatísticas</span>
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-[#8507e8] hover:text-white group transition-all duration-200 hover:scale-[1.02]"
                                >
                                    <span className="material-symbols-outlined mr-3">settings</span>
                                    <span className="font-medium">Configurações</span>
                                </a>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center p-3 text-gray-700 rounded-lg hover:bg-[#8507e8] hover:text-white group transition-all duration-200 hover:scale-[1.02]"
                                >
                                    <span className="material-symbols-outlined mr-3">logout</span>
                                    <span className="font-medium">Sair</span>
                                </button>
                            </li>
                        </ul>
                    </nav>

                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 mt-auto md:mt-10 hidden md:block">
                        <div className="flex items-center">
                            <img
                                src="https://avatars.dicebear.com/api/pixel-art/example.svg"
                                alt="Avatar"
                                className="h-10 w-10 rounded-full mr-3"
                            />
                            <div>
                                <p className="font-medium">{username}</p>
                                <p className="text-sm text-gray-500">Estudante</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    {/* Header */}
                    <header className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">Bem-vindo de volta, {username}!</h1>
                            <p className="text-gray-500">Confira seu progresso acadêmico</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <details className="md:hidden">
                                    <summary className="list-none">
                                    </summary>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                            Perfil
                                        </a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                            Configurações
                                        </a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                            Sair
                                        </a>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </header>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Principal;
