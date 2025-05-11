from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.authRoutes import router as authRoutes
from database import connect_to_mongo, close_mongo_connection
from routes.gradeRoutes import router as gradeRoutes
from routes.disciplinaRoutes import router as disciplinaRoutes

app = FastAPI()

# Adicione o CORS aqui
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend rodando na porta 3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# incluir suas rotas
app.include_router(authRoutes)
app.include_router(gradeRoutes)
app.include_router(disciplinaRoutes)

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

@app.get("/")
async def root():
    return {"message": "Conectado ao MongoDB Atlas!"}