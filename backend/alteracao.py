import asyncio
import bcrypt
import resend
import os
from dotenv import load_dotenv  # Importa a função para carregar variáveis de ambiente
from database import connect_to_mongo, get_db, close_mongo_connection

# Carrega variáveis do arquivo .env
load_dotenv()

# Inicializa a API do Resend com a chave da variável de ambiente
resend.api_key = os.getenv('RESEND_API_KEY')

async def enviar_email_notificacao(email: str):
    """Envia um e-mail notificando o usuário sobre a alteração de senha."""
    try:
        response = resend.Emails.send({
            "from": "onboarding@resend.dev",  # Remetente
            "to": [email],
            "subject": "Alteração de Senha",
            "html": f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                <h2 style="color: #4f46e5;">Alteração de Senha</h2>
                <p>Olá,</p>
                <p>Este é um aviso automático para informá-lo de que sua senha foi alterada recentemente. Se você não foi responsável por essa alteração, por favor, entre em contato conosco imediatamente.</p>
                <p>Se você realizou a alteração, não há mais nada que precise ser feito.</p>
                <p>Atenciosamente, <br> Equipe de Suporte</p>
            </div>
            """
        })
        print(f"E-mail enviado para {email}.")
    except Exception as e:
        print(f"Erro ao enviar e-mail: {str(e)}")

async def alterar_senha():
    # Conecta ao banco
    await connect_to_mongo()
    db = get_db()
    
    if db is None:
        print("Erro: Não foi possível conectar ao banco de dados.")
        return

    # Busca todos os usuários
    print("Lista de usuários:")
    cursor = db['DadosPessoais'].find({})
    async for user in cursor:
        print(f"- {user.get('username')} ({user.get('email')})")

    # Pergunta o nome
    nome = input("\nDigite o nome de usuário (username) que deseja alterar a senha: ")

    # Procura o usuário pelo nome
    usuario = await db['DadosPessoais'].find_one({"username": nome})
    if not usuario:
        print("Usuário não encontrado.")
        await close_mongo_connection()
        return

    # Pergunta nova senha
    nova_senha = input("Digite a nova senha: ")

    # Gera hash da nova senha
    hashed_password = bcrypt.hashpw(nova_senha.encode('utf-8'), bcrypt.gensalt())

    # Atualiza no banco
    result = await db['DadosPessoais'].update_one(
        {"username": nome},
        {"$set": {"password": hashed_password.decode('utf-8')}}
    )

    if result.modified_count > 0:
        print("Senha atualizada com sucesso!")
        
        # Envia e-mail de notificação para o usuário
        email_usuario = usuario.get("email")
        await enviar_email_notificacao(email_usuario)
    else:
        print("Falha ao atualizar a senha.")

    # Fecha a conexão
    await close_mongo_connection()

# Executa a função assíncrona
if __name__ == "__main__":
    asyncio.run(alterar_senha())
