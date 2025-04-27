from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb+srv://leticiaribeirom:BoloDeAbacaxi@cadastro.whoxyv2.mongodb.net/Usuario?retryWrites=true&w=majority"
DB_NAME = "Usuario"

client = None

async def connect_to_mongo():
    global client
    print("Tentando conectar ao MongoDB...")
    client = AsyncIOMotorClient(MONGO_URL)
    print("Conectado ao MongoDB!")

async def close_mongo_connection():
    global client
    if client:
        client.close()

def get_db():
    if client:
        return client[DB_NAME]
    return None
