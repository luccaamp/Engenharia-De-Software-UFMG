from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Grade(BaseModel):
    user_id: str  # Referência ao usuário que adicionou a nota
    disciplina_id: str  # Referência à disciplina
    valor: float  # Valor da nota
    tipo: str  # Tipo de nota (por exemplo, "Trabalho", "Teste")
    data_adicao: datetime = datetime.utcnow()  # Data de adição da nota