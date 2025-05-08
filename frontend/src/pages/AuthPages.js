import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import '../css/Login.css';

function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div id="webcrumbs">
      <div className="w-full max-w-full mx-auto p-6 bg-gradient-to-br from-primary-50 to-blue-50 min-h-screen flex items-center justify-center font-sans">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row transition-all duration-300 hover:shadow-2xl">
          <div className="bg-primary-600 text-white p-8 md:w-2/5 lg:w-1/3 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-4">Acompanhe suas Notas!</h1>
              <p className="text-primary-100 mb-8">Acompanhe e monitore seu progresso em todas as disciplinas.</p>
              <p className="text-primary-100 mb-8">Tenha o controle do seu semestre.</p>
              <p className="text-primary-100 mb-8">Auxliamos você a bater suas metas com o controle total de todas as notas que você obteve em suas atividades acadêmicas.</p>
            </div>
          </div>

          <div className="p-8 md:w-3/5 lg:w-2/3">
            <div className="mb-8 flex border-b border-gray-200">
              <button
                className={`px-4 py-2 font-medium transition-colors duration-200 focus:outline-none ${
                  activeTab === 'login'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 border-b-2 border-transparent hover:text-primary-600'
                }`}
                onClick={() => handleTabChange('login')}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 font-medium transition-colors duration-200 focus:outline-none ${
                  activeTab === 'register'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 border-b-2 border-transparent hover:text-primary-600'
                }`}
                onClick={() => handleTabChange('register')}
              >
                Registrar
              </button>
            </div>
            
            {activeTab === 'login' && <LoginForm setActiveTab={setActiveTab} />}
            {activeTab === 'register' && <RegisterForm setActiveTab={setActiveTab} />}
            {activeTab === 'forgotPassword' && <ForgotPasswordForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
