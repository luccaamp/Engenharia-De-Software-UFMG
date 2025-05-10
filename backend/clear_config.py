import asyncio
from database import connect_to_mongo, get_db, close_mongo_connection

async def clear_configs():
    await connect_to_mongo()
    db = get_db()
    if db is not None:
        await db['grades'].delete_many({})
        print("Todos os documentos da coleção 'configs' foram apagados!")
    else:
        print("Erro: Banco de dados não conectado.")
    await close_mongo_connection()

if __name__ == '__main__':
    asyncio.run(clear_configs())