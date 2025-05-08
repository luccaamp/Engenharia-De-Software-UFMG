from fastapi import APIRouter
from controllers import authController  

router = APIRouter()

router.include_router(authController.router)