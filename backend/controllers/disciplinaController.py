from fastapi import HTTPException
from models.disciplina import Disciplina
from database import get_db

async def adicionar_disciplina(disciplina: Disciplina):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=500, detail="Erro ao conectar com o banco de dados.")

    disciplinas_collection = db['disciplinas']

    resultado = await disciplinas_collection.insert_one(disciplina.dict())
    return {"id": str(resultado.inserted_id)}