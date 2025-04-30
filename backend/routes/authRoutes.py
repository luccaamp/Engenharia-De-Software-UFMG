from fastapi import APIRouter
from controllers import authController
from controllers import passwordResetController  

router = APIRouter()

router.include_router(authController.router)
router.include_router(passwordResetController.router)
