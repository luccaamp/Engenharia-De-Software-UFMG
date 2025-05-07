import asyncio
import bcrypt
from database import connect_to_mongo, get_db, close_mongo_connection

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
    else:
        print("Falha ao atualizar a senha.")

    # Fecha a conexão
    await close_mongo_connection()

# Executa a função assíncrona
if __name__ == "__main__":
    asyncio.run(alterar_senha())
