from pydantic import BaseModel, EmailStr
from typing import List

# Define a disciplina com referências ao usuário
class Disciplina(BaseModel):
    user_id: str  # Referência ao usuário dono da disciplina
    nome: str
    notas: List[dict] = []  # Lista de notas para a disciplina

class User(BaseModel):
    id: str  # Id do usuário (pode ser gerado automaticamente ou fornecido)
    username: str
    email: EmailStr
    disciplinas: List[str] = []  # Lista de ids de disciplinas associadas ao usuário

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    disciplinas: List[str] = []  # Lista de ids de disciplinas associadas ao usuário

class UserLogin(BaseModel):
    email: EmailStr
    password: str