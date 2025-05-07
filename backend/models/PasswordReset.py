from pydantic import BaseModel, EmailStr

class EmailRequest(BaseModel):
    email: EmailStr

class CodeVerification(BaseModel):
    email: EmailStr
    code: str

class NewPasswordRequest(BaseModel):
    email: EmailStr
    new_password: str
