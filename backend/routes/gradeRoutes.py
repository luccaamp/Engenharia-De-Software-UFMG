from fastapi import APIRouter
from models.grade import Grade
from controllers.gradeController import adicionar_grade

router = APIRouter(
    prefix="/grades",
    tags=["grades"]
)

@router.post("/")
async def criar_grade(grade: Grade):
    return await adicionar_grade(grade)