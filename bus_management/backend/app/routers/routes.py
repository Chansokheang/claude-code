from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(
    prefix="/routes",
    tags=["routes"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.Route, status_code=status.HTTP_201_CREATED)
def create_route(
    route: schemas.RouteCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    # Check if bus exists
    db_bus = db.query(models.Bus).filter(models.Bus.id == route.bus_id).first()
    if db_bus is None:
        raise HTTPException(status_code=404, detail="Bus not found")
    
    # Check if user owns the bus or is admin
    if not current_user.is_admin and db_bus.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    db_route = models.Route(**route.model_dump())
    db.add(db_route)
    db.commit()
    db.refresh(db_route)
    return db_route

@router.get("/", response_model=List[schemas.Route])
def read_routes(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    routes = db.query(models.Route).offset(skip).limit(limit).all()
    return routes

@router.get("/{route_id}", response_model=schemas.Route)
def read_route(
    route_id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    db_route = db.query(models.Route).filter(models.Route.id == route_id).first()
    if db_route is None:
        raise HTTPException(status_code=404, detail="Route not found")
    return db_route

@router.put("/{route_id}", response_model=schemas.Route)
def update_route(
    route_id: int, 
    route: schemas.RouteUpdate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    db_route = db.query(models.Route).filter(models.Route.id == route_id).first()
    if db_route is None:
        raise HTTPException(status_code=404, detail="Route not found")
    
    # Check if bus exists if it's being updated
    if route.bus_id is not None:
        db_bus = db.query(models.Bus).filter(models.Bus.id == route.bus_id).first()
        if db_bus is None:
            raise HTTPException(status_code=404, detail="Bus not found")
    
    # Get the current bus to check permissions
    current_bus = db.query(models.Bus).filter(models.Bus.id == db_route.bus_id).first()
    
    # Check if user is admin or the owner of the bus
    if not current_user.is_admin and current_bus.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    # Update route data
    update_data = route.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_route, key, value)
    
    db.commit()
    db.refresh(db_route)
    return db_route

@router.delete("/{route_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_route(
    route_id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
):
    db_route = db.query(models.Route).filter(models.Route.id == route_id).first()
    if db_route is None:
        raise HTTPException(status_code=404, detail="Route not found")
    
    # Get the bus to check permissions
    current_bus = db.query(models.Bus).filter(models.Bus.id == db_route.bus_id).first()
    
    # Check if user is admin or the owner of the bus
    if not current_user.is_admin and current_bus.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    db.delete(db_route)
    db.commit()
    return None