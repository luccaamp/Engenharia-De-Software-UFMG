from fastapi import APIRouter, HTTPException
from models.User import UserCreate, UserLogin
from database import get_db  
import bcrypt

router = APIRouter()

@router.post("/signup")
async def signup(user: UserCreate):
    db = get_db()  
    if db is None:
        raise HTTPException(status_code=500, detail="Banco de dados não conectado.")

    existing_user = await db['DadosPessoais'].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email já está cadastrado.")
    
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

    user_dict = user.dict()
    user_dict["password"] = hashed_password.decode('utf-8')

    await db['DadosPessoais'].insert_one(user_dict)

    return {"message": "Usuário cadastrado com sucesso!"}

@router.post("/login")
async def login(user: UserLogin):
    db = get_db()  
    if db is None:
        raise HTTPException(status_code=500, detail="Banco de dados não conectado.")

    existing_user = await db['DadosPessoais'].find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=400, detail="Usuário não encontrado.")

    if not bcrypt.checkpw(user.password.encode('utf-8'), existing_user["password"].encode('utf-8')):
        raise HTTPException(status_code=400, detail="Senha incorreta.")

    return {"message": "Login realizado com sucesso!"}