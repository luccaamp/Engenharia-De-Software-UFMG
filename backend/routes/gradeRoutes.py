from fastapi import APIRouter
from models.grade import Grade, GradeUpdate
from controllers.gradeController import adicionar_grade, remover_grade, modificar_grade, buscar_notas_por_disciplina

router = APIRouter(
    prefix="/grades",
    tags=["grades"]
)

# Rota para criar uma nota
@router.post("/")
async def criar_grade(grade: Grade):
    return await adicionar_grade(grade)

# Rota para remover uma nota
@router.delete("/{disciplina_id}/{nota_id}")
async def excluir_grade(disciplina_id: str, nota_id: str):
    return await remover_grade(disciplina_id, nota_id)

# Rota para modificar uma nota
@router.put("/{disciplina_id}/{nota_id}")
async def atualizar_grade(disciplina_id: str, nota_id: str, grade_update: GradeUpdate):
    return await modificar_grade(disciplina_id, nota_id, grade_update)

# Rota para listar todas as notas de uma disciplina
@router.get("/{disciplina_id}/notas")
async def listar_notas_disciplina(disciplina_id: str):
    return await buscar_notas_por_disciplina(disciplina_id)