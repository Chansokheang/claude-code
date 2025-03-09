from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from . import models
from .routers import users, buses, routes, auth

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Bus Management System API",
    description="API for managing buses and routes",
    version="1.0.0",
)

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(buses.router)
app.include_router(routes.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Bus Management System API"}