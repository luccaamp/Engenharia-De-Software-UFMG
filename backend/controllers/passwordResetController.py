from fastapi import APIRouter, HTTPException
from models.User import ForgotPasswordRequest, VerifyResetCode, ResetPassword
from database import get_db
import random
import string
import bcrypt
from utils.email_service import send_reset_email  # Importe a função de envio de e-mail

router = APIRouter()

# Armazenamento temporário em memória dos códigos enviados (pode ser substituído por cache ou Mongo)
reset_codes = {}

def generate_reset_code(length=6):
    return ''.join(random.choices(string.digits, k=length))

@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=500, detail="Banco de dados não conectado.")

    user = await db['DadosPessoais'].find_one({"email": request.email})
    if not user:
        raise HTTPException(status_code=404, detail="Email não encontrado.")

    code = generate_reset_code()
    reset_codes[request.email] = code

    # Enviar o código por e-mail
    send_reset_email(request.email, user['username'], code)  # Envia o e-mail para o usuário com o código de redefinição

    return {"message": "Código de redefinição enviado para o email."}
