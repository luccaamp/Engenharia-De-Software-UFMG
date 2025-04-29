from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Disciplina(BaseModel):
    user_id: str  # Referência ao usuário dono da disciplina
    nome: str
    descricao: Optional[str] = None
    data_criacao: datetime = datetime.utcnow()