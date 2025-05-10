from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class Grade(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(ObjectId()))
    user_id: str  # Referência ao usuário que adicionou a nota
    disciplina_id: str  # Referência à disciplina
    valor: float  # Valor da nota
    tipo: str  # Tipo de nota (por exemplo, "Trabalho", "Teste")
    data_adicao: datetime = datetime.utcnow()  # Data de adição da nota