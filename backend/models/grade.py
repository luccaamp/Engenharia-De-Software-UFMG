from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Grade(BaseModel):
    user_id: str
    disciplina_id: str
    valor: float
    tipo: str  # Agora obrigatório, definido pelo usuário
    data: datetime = datetime.utcnow()