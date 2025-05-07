import os
import secrets
import string
import resend
from dotenv import load_dotenv

load_dotenv()

# Gere um código aleatório (ex: 8 caracteres)
def gerar_codigo(tamanho=8):
    caracteres = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(caracteres) for _ in range(tamanho))

# Inicialize a API
resend.api_key = os.environ['RESEND_API_KEY']

# Gere o código
codigo_unico = gerar_codigo()

# Enviar e-mail com o código
response = resend.Emails.send({
    "from": "onboarding@resend.dev",
    "to": ["luccaamp@gmail.com"],
    "subject": "Seu código de verificação",
    "html": f"<p>Seu código de verificação é: <strong>{codigo_unico}</strong></p>"
})

print("E-mail enviado com ID:", response["id"])
print("Código enviado:", codigo_unico)
