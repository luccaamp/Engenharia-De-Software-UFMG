import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_reset_email(email, name, reset_code):
    sender_email = "seu-email@gmail.com"  # Substitua pelo seu e-mail
    sender_password = "sua-senha"  # Substitua pela sua senha

    subject = "Redefinição de senha"
    body = f"""
    Olá, {name}.
    
    Recebemos uma solicitação para redefinir sua senha.
    
    Seu código é: {reset_code}
    
    Se você ignorar esta mensagem, sua senha não será alterada.
    """

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()  # Ativa a criptografia
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, email, msg.as_string())
            print(f"Email enviado para {email}")
    except Exception as e:
        print(f"Erro ao enviar o email: {e}")
