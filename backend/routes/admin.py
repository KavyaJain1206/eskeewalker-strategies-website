from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
from auth import verify_password, create_access_token, get_current_admin
import models
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter(prefix="/admin", tags=["admin"])

class Token(BaseModel):
    access_token: str
    token_type: str

class SubmissionOut(BaseModel):
    id: int
    name: str
    email: str
    company: str
    service: str
    budget: str
    message: str
    submitted_at: datetime

    class Config:
        from_attributes = True

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    admin = db.query(models.Admin).filter(models.Admin.username == form_data.username).first()
    if not admin or not verify_password(form_data.password, admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": admin.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/check", response_model=str)
def check_session(current_admin: models.Admin = Depends(get_current_admin)):
    return "authorized"

@router.get("/submissions", response_model=List[SubmissionOut])
def get_submissions(current_admin: models.Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    return db.query(models.Submission).order_by(models.Submission.submitted_at.desc()).all()

import os
import uuid
import shutil
from fastapi import UploadFile, File

@router.post("/upload")
def upload_file(
    file: UploadFile = File(...),
    current_admin: models.Admin = Depends(get_current_admin)
):
    # Ensure static directory exists
    os.makedirs("static/uploads", exist_ok=True)
    
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join("static/uploads", unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    url = f"/api/static/uploads/{unique_filename}"
    return {"url": url}
