from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_admin
import models
from pydantic import BaseModel
from typing import List

router = APIRouter(tags=["courses"])

class CourseSchema(BaseModel):
    title: str
    description: str
    level: str
    modules: List[str]
    duration: str
    price: str
    cta_link: str
    order_index: int = 0

class CourseOut(CourseSchema):
    id: int

    class Config:
        from_attributes = True

class ReorderRequest(BaseModel):
    ids: List[int]

@router.get("/courses", response_model=List[CourseOut])
def get_courses(db: Session = Depends(get_db)):
    return db.query(models.Course).order_by(models.Course.order_index.asc(), models.Course.id.asc()).all()

@router.post("/admin/courses", response_model=CourseOut)
def create_course(
    data: CourseSchema, 
    current_admin: models.Admin = Depends(get_current_admin), 
    db: Session = Depends(get_db)
):
    item = models.Course(**data.dict())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/admin/courses/{course_id}", response_model=CourseOut)
def update_course(
    course_id: int, 
    data: CourseSchema, 
    current_admin: models.Admin = Depends(get_current_admin), 
    db: Session = Depends(get_db)
):
    item = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Course not found")
    
    for key, value in data.dict().items():
        setattr(item, key, value)
        
    db.commit()
    db.refresh(item)
    return item

@router.delete("/admin/courses/{course_id}")
def delete_course(
    course_id: int, 
    current_admin: models.Admin = Depends(get_current_admin), 
    db: Session = Depends(get_db)
):
    item = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(item)
    db.commit()
    return {"status": "success", "message": "Course deleted"}

@router.put("/admin/courses/reorder")
def reorder_courses(
    data: ReorderRequest,
    current_admin: models.Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    for index, item_id in enumerate(data.ids):
        db.query(models.Course).filter(models.Course.id == item_id).update({"order_index": index})
    db.commit()
    return {"status": "success", "message": "Courses reordered"}
