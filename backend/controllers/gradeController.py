from fastapi import HTTPException
from models.grade import Grade
from database import get_db

async def adicionar_grade(grade: Grade):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=500, detail="Erro de conexão com o banco de dados.")

    grades_collection = db['grades']

    # Inserir a nota no banco
    resultado = await grades_collection.insert_one(grade.dict())
    return {"id": str(resultado.inserted_id)}