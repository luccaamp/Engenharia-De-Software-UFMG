from fastapi.testclient import TestClient
from server import app

# Cria o cliente de teste para a aplicação FastAPI
client = TestClient(app)

def test_esqueci_senha():
    """Testa a rota /esqueci-senha"""
    response = client.post("/esqueci-senha", json={"email": "usuario@example.com"})
    print(f"Status Code: {response.status_code}")  # Imprime o status code
    assert response.status_code == 200  # Espera o código de status 200 para sucesso
    assert "Código enviado para redefinição de senha" in response.json().get("message")

def test_verificar_codigo():
    """Testa a rota /verificar-codigo"""
    response = client.post("/verificar-codigo", json={"email": "usuario@example.com", "codigo": "123456"})
    assert response.status_code == 200  # Espera o código de status 200 para sucesso
    assert "Código correto. Você pode redefinir sua senha." in response.json().get("message")

def test_redefinir_senha():
    """Testa a rota /redefinir-senha"""
    response = client.post("/redefinir-senha", json={"email": "usuario@example.com", "nova_senha": "novaSenha123"})
    assert response.status_code == 200  # Espera o código de status 200 para sucesso
    assert "Senha alterada com sucesso!" in response.json().get("message")

if __name__ == "__main__":
    test_esqueci_senha()
    test_verificar_codigo()
    test_redefinir_senha()
    print("Todos os testes passaram com sucesso!")
