import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Usado para redirecionar após sucesso
import "./../css/Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);  // Verifica se o código foi enviado
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    // Lógica para enviar o código para o email do usuário
    setIsCodeSent(true);
    alert("Código enviado para o seu email.");
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    // Lógica para validar o código e redefinir a senha
    alert("Senha alterada com sucesso!");
    navigate("/");  // Redireciona de volta para a tela de login
  };

  return (
    <div className="forgot-password-container">
      <h1>Recuperar Senha</h1>
      {!isCodeSent ? (
        <form onSubmit={handleEmailSubmit}>
          <div className="input-group">
            <label htmlFor="email">Digite seu Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Enviar Código</button>
        </form>
      ) : (
        <form onSubmit={handlePasswordReset}>
          <div className="input-group">
            <label htmlFor="code">Digite o Código</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="newPassword">Nova Senha</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Redefinir Senha</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
