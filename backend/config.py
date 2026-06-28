from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./cms.db"
    JWT_SECRET: str = "eskeewalkersupersecretkeyforjwt"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 1440  # 24 hours
    
    # SMTP details for Contact notifications
    SMTP_HOST: Optional[str] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASS: Optional[str] = None

    class Config:
        env_file = ".env"

settings = Settings()
