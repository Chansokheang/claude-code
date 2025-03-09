from pydantic import BaseModel, EmailStr, validator, ConfigDict
from typing import Optional, List
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    
    @validator('password')
    def password_complexity(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_admin: Optional[bool] = None
    
    @validator('password')
    def password_complexity(cls, v):
        if v is not None and len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v

class User(UserBase):
    id: int
    is_active: bool
    is_admin: bool
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

# Bus Schemas
class BusBase(BaseModel):
    bus_number: str
    model: str
    capacity: int
    is_active: bool = True
    last_maintenance: Optional[datetime] = None

class BusCreate(BusBase):
    pass

class BusUpdate(BaseModel):
    bus_number: Optional[str] = None
    model: Optional[str] = None
    capacity: Optional[int] = None
    is_active: Optional[bool] = None
    last_maintenance: Optional[datetime] = None

class Bus(BusBase):
    id: int
    created_at: datetime
    updated_at: datetime
    owner_id: int
    
    model_config = ConfigDict(from_attributes=True)

class BusDetail(Bus):
    routes: List['Route'] = []
    
    model_config = ConfigDict(from_attributes=True)

# Route Schemas
class RouteBase(BaseModel):
    name: str
    start_location: str
    end_location: str
    departure_time: datetime
    arrival_time: datetime
    is_active: bool = True

class RouteCreate(RouteBase):
    bus_id: int
    
    @validator('arrival_time')
    def arrival_after_departure(cls, v, values):
        if 'departure_time' in values and v <= values['departure_time']:
            raise ValueError('Arrival time must be after departure time')
        return v

class RouteUpdate(BaseModel):
    name: Optional[str] = None
    start_location: Optional[str] = None
    end_location: Optional[str] = None
    departure_time: Optional[datetime] = None
    arrival_time: Optional[datetime] = None
    is_active: Optional[bool] = None
    bus_id: Optional[int] = None
    
    @validator('arrival_time')
    def arrival_after_departure(cls, v, values):
        if v is not None and 'departure_time' in values and values['departure_time'] is not None and v <= values['departure_time']:
            raise ValueError('Arrival time must be after departure time')
        return v

class Route(RouteBase):
    id: int
    created_at: datetime
    updated_at: datetime
    bus_id: int
    
    model_config = ConfigDict(from_attributes=True)

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    
# Update forward references
BusDetail.model_rebuild()