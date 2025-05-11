from fastapi import APIRouter
from models.disciplina import Disciplina
from fastapi import Body
from controllers.disciplinaController import adicionar_disciplina, remover_disciplina, atualizar_disciplina

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

@router.put("/{disciplina_id}")
async def editar_disciplina(disciplina_id: str, dados_atualizados: dict = Body(...)):
    return await atualizar_disciplina(disciplina_id, dados_atualizados)