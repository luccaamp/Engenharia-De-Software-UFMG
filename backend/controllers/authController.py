import random
import string
from fastapi import APIRouter, HTTPException
from models.User import UserCreate, UserLogin
from models.PasswordReset import EmailRequest, CodeVerification, NewPasswordRequest
from database import get_db
import bcrypt
import os
import resend
from dotenv import load_dotenv

router = APIRouter()

load_dotenv()
resend.api_key = os.getenv('RESEND_API_KEY')

# Armazenamento temporário dos códigos enviados
codigo_verificacao = {}

@router.post("/signup")
async def signup(user: UserCreate):
    db = get_db()  
    if db is None:
        raise HTTPException(status_code=500, detail="Banco de dados não conectado.")

    existing_user = await db['DadosPessoais'].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email já está cadastrado.")
    
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

    user_dict = user.dict()
    user_dict["password"] = hashed_password.decode('utf-8')

    await db['DadosPessoais'].insert_one(user_dict)

    return {"message": "Usuário cadastrado com sucesso!"}

@router.post("/login")
async def login(user: UserLogin):
    db = get_db()  
    if db is None:
        raise HTTPException(status_code=500, detail="Banco de dados não conectado.")

    existing_user = await db['DadosPessoais'].find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=400, detail="Usuário não encontrado.")

    if not bcrypt.checkpw(user.password.encode('utf-8'), existing_user["password"].encode('utf-8')):
        raise HTTPException(status_code=400, detail="Senha incorreta.")

    return {"message": "Login realizado com sucesso!"}


def gerar_codigo():
    return ''.join(random.choices(string.digits, k=6))

async def enviar_codigo_email(email: str, codigo: str):
    try:
        await resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": [email],
            "subject": "Redefinição de Senha",
            "html": f"<h2>Código de verificação: {codigo}</h2><p>Utilize este código para redefinir sua senha.</p>"
        })
    except Exception as e:
        print(f"Erro ao enviar e-mail: {str(e)}")


@router.post("/esqueci-senha")
async def esqueceu_senha(request: EmailRequest):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=500, detail="Erro de conexão com o banco de dados.")
    
    usuario = await db['DadosPessoais'].find_one({"email": request.email})
    if not usuario:
        raise HTTPException(status_code=404, detail="Este email não está cadastrado !!! Por favor faça uma conta.")

    codigo = gerar_codigo()
    codigo_verificacao[request.email] = codigo
    await enviar_codigo_email(request.email, codigo)

    return {"message": "Verifique seu email"}

@router.post("/verificar-codigo")
async def verificar_codigo(request: CodeVerification):
    codigo_correto = codigo_verificacao.get(request.email)
    if not codigo_correto:
        raise HTTPException(status_code=400, detail="Nenhum código foi enviado para este email.")
    if request.code != codigo_correto:
        raise HTTPException(status_code=400, detail="Código errado")

    return {"message": "Código verificado com sucesso"}

@router.post("/redefinir-senha")
async def redefinir_senha(request: NewPasswordRequest):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=500, detail="Erro de conexão com o banco de dados.")
    
    # Validação do código de verificação
    codigo_correto = codigo_verificacao.get(request.email)
    if not codigo_correto:
        raise HTTPException(status_code=400, detail="Nenhum código foi enviado para este email.")
    if request.code != codigo_correto:
        raise HTTPException(status_code=400, detail="Código inválido ou expirado.")

    # Hashing seguro da senha
    hashed_password = bcrypt.hashpw(request.new_password.encode('utf-8'), bcrypt.gensalt())

    try:
        # Atualizar senha no banco de dados
        result = await db['DadosPessoais'].update_one(
            {"email": request.email},
            {"$set": {"password": hashed_password.decode('utf-8')}}
        )

        if result.modified_count == 0:
            raise HTTPException(status_code=400, detail="Falha ao atualizar a senha. Usuário não encontrado.")

        # Remover código de verificação após sucesso
        codigo_verificacao.pop(request.email, None)

        # Enviar notificação de sucesso
        try:
            resend.Emails.send({
                "from": "onboarding@resend.dev",
                "to": [request.email],
                "subject": "Senha Alterada",
                "html": "<p>Sua senha foi alterada com sucesso. Se não foi você, entre em contato.</p>"
            })
        except Exception as e:
            print(f"Erro ao enviar e-mail: {str(e)}")

        return {"message": "Senha alterada com sucesso"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno ao redefinir a senha: {str(e)}")
