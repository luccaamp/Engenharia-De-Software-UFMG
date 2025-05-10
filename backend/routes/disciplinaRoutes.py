from fastapi import APIRouter
from models.disciplina import Disciplina
from controllers.disciplinaController import adicionar_disciplina, remover_disciplina

router = APIRouter(
    prefix="/disciplinas",
    tags=["disciplinas"]
)

@router.post("/")
async def criar_disciplina(disciplina: Disciplina):
    return await adicionar_disciplina(disciplina)

@router.delete("/{disciplina_id}")
async def deletar_disciplina(disciplina_id: str):
    return await remover_disciplina(disciplina_id)