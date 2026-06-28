from pydantic import BaseModel, EmailStr
from typing import Optional

class ContactSubmission(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = ''
    service: Optional[str] = ''
    budget: Optional[str] = ''
    message: Optional[str] = ''
