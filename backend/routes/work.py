from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_admin
import models
from pydantic import BaseModel
from typing import List

router = APIRouter(tags=["work"])

class WorkItemSchema(BaseModel):
    cat: str
    size: str
    img: str
    alt: str
    label: str
    featured: bool
    work_cat: str
    title: str
    badges: List[str]
    order_index: int = 0

class WorkItemOut(WorkItemSchema):
    id: int

    class Config:
        from_attributes = True

class ReorderRequest(BaseModel):
    ids: List[int]

@router.get("/work", response_model=List[WorkItemOut])
def get_work(db: Session = Depends(get_db)):
    return db.query(models.WorkItem).order_by(models.WorkItem.order_index.asc(), models.WorkItem.id.asc()).all()

@router.post("/admin/work", response_model=WorkItemOut)
def create_work_item(
    data: WorkItemSchema, 
    current_admin: models.Admin = Depends(get_current_admin), 
    db: Session = Depends(get_db)
):
    item = models.WorkItem(**data.dict())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/admin/work/{item_id}", response_model=WorkItemOut)
def update_work_item(
    item_id: int, 
    data: WorkItemSchema, 
    current_admin: models.Admin = Depends(get_current_admin), 
    db: Session = Depends(get_db)
):
    item = db.query(models.WorkItem).filter(models.WorkItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Work item not found")
    
    for key, value in data.dict().items():
        setattr(item, key, value)
        
    db.commit()
    db.refresh(item)
    return item

@router.delete("/admin/work/{item_id}")
def delete_work_item(
    item_id: int, 
    current_admin: models.Admin = Depends(get_current_admin), 
    db: Session = Depends(get_db)
):
    item = db.query(models.WorkItem).filter(models.WorkItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Work item not found")
    db.delete(item)
    db.commit()
    return {"status": "success", "message": "Work item deleted"}

@router.put("/admin/work/reorder")
def reorder_work_items(
    data: ReorderRequest,
    current_admin: models.Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    for index, item_id in enumerate(data.ids):
        db.query(models.WorkItem).filter(models.WorkItem.id == item_id).update({"order_index": index})
    db.commit()
    return {"status": "success", "message": "Work items reordered"}
