from sqlalchemy import Column, Integer, String, DateTime, Text
from database import Base
import datetime

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    company = Column(String, default="")
    service = Column(String, default="")
    budget = Column(String, default="")
    message = Column(Text, default="")
    submitted_at = Column(DateTime, default=datetime.datetime.utcnow)
