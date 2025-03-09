from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(
    prefix="/buses",
    tags=["buses"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.Bus, status_code=status.HTTP_201_CREATED)
def create_bus(
    bus: schemas.BusCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    # Check if a bus with the same bus_number already exists
    db_bus = db.query(models.Bus).filter(models.Bus.bus_number == bus.bus_number).first()
    if db_bus:
        raise HTTPException(status_code=400, detail="Bus number already registered")
    
    db_bus = models.Bus(**bus.model_dump(), owner_id=current_user.id)
    db.add(db_bus)
    db.commit()
    db.refresh(db_bus)
    return db_bus

@router.get("/", response_model=List[schemas.Bus])
def read_buses(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    buses = db.query(models.Bus).offset(skip).limit(limit).all()
    return buses

@router.get("/{bus_id}", response_model=schemas.BusDetail)
def read_bus(
    bus_id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    db_bus = db.query(models.Bus).filter(models.Bus.id == bus_id).first()
    if db_bus is None:
        raise HTTPException(status_code=404, detail="Bus not found")
    return db_bus

@router.put("/{bus_id}", response_model=schemas.Bus)
def update_bus(
    bus_id: int, 
    bus: schemas.BusUpdate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    db_bus = db.query(models.Bus).filter(models.Bus.id == bus_id).first()
    if db_bus is None:
        raise HTTPException(status_code=404, detail="Bus not found")
    
    # Check if user is admin or the owner of the bus
    if not current_user.is_admin and db_bus.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    # Update bus data
    update_data = bus.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_bus, key, value)
    
    db.commit()
    db.refresh(db_bus)
    return db_bus

@router.delete("/{bus_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_bus(
    bus_id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    db_bus = db.query(models.Bus).filter(models.Bus.id == bus_id).first()
    if db_bus is None:
        raise HTTPException(status_code=404, detail="Bus not found")
    
    # Check if user is admin or the owner of the bus
    if not current_user.is_admin and db_bus.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    db.delete(db_bus)
    db.commit()
    return None