from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from .env file before importing controllers
load_dotenv()

from controllers.authenticationController import router as authRouter
from controllers.ticketController import router as ticketRouter
from controllers.commentController import router as commentRouter

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(authRouter)
app.include_router(ticketRouter)
app.include_router(commentRouter)


@app.get("/")
def home():
    return {"message": "FastAPI Gateway Running"}
