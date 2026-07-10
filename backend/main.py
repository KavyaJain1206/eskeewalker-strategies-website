from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
import models

from routes.contact import router as contact_router

# Auto-create tables (acts as database initialization)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title='EskeeWalker API')

# Configure CORS for local development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'http://localhost'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Route registrations
app.include_router(contact_router, prefix='/api')

# Health Check
@app.get('/api/health')
def health():
    return {'status': 'ok'}
