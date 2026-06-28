from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Admin(Base):
    __tablename__ = "admins"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Page(Base):
    __tablename__ = "pages"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    
    contents = relationship("PageContent", back_populates="page", cascade="all, delete-orphan")

class PageContent(Base):
    __tablename__ = "page_contents"
    
    id = Column(Integer, primary_key=True, index=True)
    page_id = Column(Integer, ForeignKey("pages.id", ondelete="CASCADE"), nullable=False)
    section_key = Column(String, index=True, nullable=False)
    content = Column(JSON, nullable=False)
    order_index = Column(Integer, default=0)
    
    page = relationship("Page", back_populates="contents")

class WorkItem(Base):
    __tablename__ = "work_items"
    
    id = Column(Integer, primary_key=True, index=True)
    cat = Column(String, nullable=False)
    size = Column(String, nullable=False)  # 'large', 'medium', 'half', 'third'
    img = Column(String, nullable=False)
    alt = Column(String, nullable=False)
    label = Column(String, nullable=False)
    featured = Column(Boolean, default=False)
    work_cat = Column(String, nullable=False)
    title = Column(String, nullable=False)
    badges = Column(JSON, nullable=False)  # List of strings
    order_index = Column(Integer, default=0)

class Course(Base):
    __tablename__ = "courses"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    level = Column(String, nullable=False)  # 'beginner', 'intermediate', 'advanced'
    modules = Column(JSON, nullable=False)  # List of strings
    duration = Column(String, nullable=False)
    price = Column(String, nullable=False)
    cta_link = Column(String, nullable=False)
    order_index = Column(Integer, default=0)

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
