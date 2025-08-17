from fastapi import FastAPI
from app.db_connection import create_table
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_table()
    yield

app = FastAPI()

app.add_middleware(CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
async def read_root():
    return {"message": "I am a Todo API!"}