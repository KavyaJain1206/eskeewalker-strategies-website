from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_admin
import models
from pydantic import BaseModel
from typing import Dict, Any, List

router = APIRouter(prefix="/pages", tags=["cms"])

class ContentUpdate(BaseModel):
    section_key: str
    content: Dict[str, Any]

class ReorderRequest(BaseModel):
    section_keys: List[str]

@router.get("/{page_name}")
def get_page_content(page_name: str, db: Session = Depends(get_db)):
    page = db.query(models.Page).filter(models.Page.name == page_name).first()
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    # Return sections sorted by order_index
    sorted_items = sorted(page.contents, key=lambda x: x.order_index if x.order_index is not None else 0)
    
    result = {}
    sections_list = []
    for item in sorted_items:
        result[item.section_key] = item.content
        sections_list.append({
            "id": item.id,
            "section_key": item.section_key,
            "content": item.content,
            "order_index": item.order_index or 0
        })
    result["_sections"] = sections_list
    return result

@router.put("/{page_name}")
def update_page_content(
    page_name: str, 
    data: ContentUpdate, 
    current_admin: models.Admin = Depends(get_current_admin), 
    db: Session = Depends(get_db)
):
    page = db.query(models.Page).filter(models.Page.name == page_name).first()
    if not page:
        page = models.Page(name=page_name)
        db.add(page)
        db.commit()
        db.refresh(page)
        
    section = db.query(models.PageContent).filter(
        models.PageContent.page_id == page.id, 
        models.PageContent.section_key == data.section_key
    ).first()
    
    if not section:
        max_order = db.query(models.PageContent).filter(models.PageContent.page_id == page.id).count()
        section = models.PageContent(
            page_id=page.id, 
            section_key=data.section_key, 
            content=data.content,
            order_index=max_order
        )
        db.add(section)
    else:
        section.content = data.content
        
    db.commit()
    return {"status": "success", "message": "Content updated"}

@router.delete("/{page_name}/{section_key}")
def delete_page_section(
    page_name: str,
    section_key: str,
    current_admin: models.Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    page = db.query(models.Page).filter(models.Page.name == page_name).first()
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
        
    section = db.query(models.PageContent).filter(
        models.PageContent.page_id == page.id,
        models.PageContent.section_key == section_key
    ).first()
    
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")
        
    db.delete(section)
    db.commit()
    return {"status": "success", "message": "Section deleted"}

@router.put("/{page_name}/reorder")
def reorder_page_sections(
    page_name: str,
    data: ReorderRequest,
    current_admin: models.Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    page = db.query(models.Page).filter(models.Page.name == page_name).first()
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
        
    for index, s_key in enumerate(data.section_keys):
        db.query(models.PageContent).filter(
            models.PageContent.page_id == page.id,
            models.PageContent.section_key == s_key
        ).update({"order_index": index})
        
    db.commit()
    return {"status": "success", "message": "Sections reordered"}
