import React, { useEffect, useState } from 'react';
//import { Link, useNavigate } from 'react-router-dom'; 
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';


import "../css/Principal.css";
function Principal(){
    /*export const Component = () => {*/
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Pega o username armazenado no localStorage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername); // Define o username
        }
    }, []);
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
                                <Link to ="disciplinas"
                                    className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-[#8507e8] hover:text-white group transition-all duration-200 hover:scale-[1.02]"
                                >
                                    <span className="material-symbols-outlined mr-3">menu_book</span>
                                    <span className="font-medium">Disciplinas</span>
                                </Link>
                </li>
                
                            <li>
                                <Link to ="estatisticas"
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
                    {/* Next: "Add logout button with icon" */}
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
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwyfHxhdmF0YXJ8ZW58MHx8fHwxNzQ1ODYxMTAyfDA&ixlib=rb-4.0.3&q=80&w=1080"
                                            alt="Avatar"
                                            className="h-10 w-10 rounded-full cursor-pointer"
                                        />
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
            {/* Dashboard Content apagado por enquanto*/}
            
                </main>
            </div>
        </div>
    )
}
export default Principal;

